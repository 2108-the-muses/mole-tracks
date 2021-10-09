import axios from "axios";
// import history from '../history'
import {firebaseAuth} from "../firebase-auth/config";

import {IP_ADDRESS} from "../../secrets";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_USER = "SET_USER";
const SET_ERROR = "SET_ERROR";

/**
 * ACTION CREATORS
 */
const setUser = (user) => ({type: SET_USER, user});
const setError = (error) => ({type: SET_ERROR, error});

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
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

export const authenticate =
  ({email, firstName, lastName, password, method}) =>
  async (dispatch) => {
    try {
      const verify = (data) => {
        if (data.uid) {
          dispatch(me());
          return true;
        } else {
          console.log("Failed to authenticate");
          return false;
        }
      };
      if (method === "signup") {
        const {user} = await firebaseAuth.createUserWithEmailAndPassword(email, password);
        const {data} = await axios.post(`http://${IP_ADDRESS}:8080/auth/${method}`, {
          uid: user.uid,
          email,
          firstName,
          lastName,
        });
        if (verify(data)) return true;
      } else if (method === "login") {
        const {user} = await firebaseAuth.signInWithEmailAndPassword(email, password);
        const {data} = await axios.post(`http://${IP_ADDRESS}:8080/auth/${method}`, {
          uid: user.uid,
        });
        if (verify(data)) return true;
      }
    } catch (err) {
      dispatch(setError(err.message));
      console.log(err);
    }
  };

export const logout = () => {
  return {
    type: SET_USER,
    user: {},
  };
};

const initialState = {
  user: {},
  error: "",
};

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.user};
    case SET_ERROR:
      return {...state, error: action.error};
    default:
      return state;
  }
}
