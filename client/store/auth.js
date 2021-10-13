import axios from "axios";
// import history from '../history'
import {firebaseAuth} from "../firebase-auth/config";

import {IP_ADDRESS} from "../../secrets";

/**
 * ACTION TYPES
 */
const SET_USER = "SET_USER";

/**
 * ACTION CREATORS
 */
const setUser = (user) => ({type: SET_USER, user});

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
    const {data} = await axios.get(`http://${IP_ADDRESS}:8080/auth/me`, {
      headers: {
        authtoken: idToken,
      },
    });
    return dispatch(setUser(data));
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
  ({email, firstName, lastName, password, method}) =>
  async (dispatch) => {
    try {
      const {user} = await firebaseAuth.createUserWithEmailAndPassword(email, password);
      const {data} = await axios.post(`http://${IP_ADDRESS}:8080/auth/signup`, {
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
  ({email, password}) =>
  async (dispatch) => {
    try {
      const {user} = await firebaseAuth.signInWithEmailAndPassword(email, password);
      const {data} = await axios.post(`http://${IP_ADDRESS}:8080/auth/login`, {
        uid: user.uid,
      });
      if (verify(data, dispatch)) return true;
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
      return {...state, user: action.user};
    default:
      return state;
  }
}
