import axios from "axios";
// import history from '../history'
import { firebaseAuth } from "../firebase-auth/config";

import { IP_ADDRESS, NGROK } from "../../secrets";

/**
 * ACTION TYPES
 */
const SET_USER = "SET_USER";

/**
 * ACTION CREATORS
 */
const setUser = (user) => ({ type: SET_USER, user });

export const logout = () => {
  return {
    type: SET_USER,
    user: {},
  };
};

/**
 * THUNK CREATORS
 */
export const setUserThunk = () => async (dispatch) => {
  const idToken = await firebaseAuth.currentUser.getIdToken(true);
  if (idToken) {
    const { data } = await axios.get(`${NGROK}/auth/me`, {
      headers: {
        authtoken: idToken,
      },
    });
    return dispatch(setUser(data));
  }
};

export const updateUserThunk =
  ({ firstName, lastName }) =>
  async (dispatch) => {
    try {
      const idToken = await firebaseAuth.currentUser.getIdToken(true);
      if (idToken) {
        const { data } = await axios.put(
          `${NGROK}/auth/update`,
          {
            firstName,
            lastName,
          },
          {
            headers: {
              authtoken: idToken,
            },
          }
        );
        dispatch(setUser(data));
        return true;
      }
    } catch (err) {
      console.log("THUNK ERROR: ", err);
    }
  };

export const updatePassword = async (password) => {
  try {
    const user = await firebaseAuth.currentUser;
    await user.updatePassword(password);
    return true;
  } catch (err) {
    console.log("UPDATE PASSWORD: err");
    return err.message;
  }
};

const verify = (data, dispatch) => {
  if (data.uid) {
    dispatch(setUserThunk());
    return true;
  } else {
    console.log("Failed to authenticate");
    return false;
  }
};

export const authenticateSignUp =
  ({ email, firstName, lastName, password, method }) =>
  async (dispatch) => {
    try {
      const { user } = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      const { data } = await axios.post(`${NGROK}/auth/signup`, {
        uid: user.uid,
        email,
        firstName,
        lastName,
      });
      if (verify(data, dispatch)) return true;
    } catch (err) {
      console.log(err);
      return err.message;
    }
  };

export const authenticateLogin =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const { user } = await firebaseAuth.signInWithEmailAndPassword(
        email,
        password
      );
      const { data } = await axios.post(`${NGROK}/auth/login`, {
        uid: user.uid,
      });
      if (verify(data, dispatch)) {
        return true;
      }
    } catch (err) {
      console.log(err);
      return err.message;
    }
  };

const initialState = {
  user: {},
};

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}
