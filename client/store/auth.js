import axios from "axios";
// import history from '../history'
import {firebaseAuth} from "../../firebase-auth/config";
const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({type: SET_AUTH, auth});

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  const token = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (username, email, password, method) => async (dispatch) => {
  try {
    await firebaseAuth.createUserWithEmailAndPassword(email, password);
    const res = await axios.post(`/auth/${method}`, {username, email});
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({error: authError.message}));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  // history.push('/login')
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
