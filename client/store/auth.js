import axios from "axios";
// import history from '../history'
import {firebaseAuth} from "../firebase-auth/config";
import {IP_ADDRESS} from "../../secrets";
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
  console.log("AT ME!!!");
  const token = await firebaseAuth.currentUser.getIdToken(/* forceRefresh */ true);
  const otherToken = await firebaseAuth.currentUser.getIdTokenResult(true);
  console.log("USER TOKEN!!!", token);
  console.log("OTHERTOKEN", otherToken);
  if (token) {
    const res = await axios.get(`http://${IP_ADDRESS}:8080/auth/me`, {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (username, email, password, method) => async (dispatch) => {
  try {
    const {user} = await firebaseAuth.createUserWithEmailAndPassword(email, password);
    // user has email, uid  // has potential to add photoURL, phoneNumber, displayName
    console.log("USER UID", user.uid);
    const res = await axios.post(`http://${IP_ADDRESS}:8080/auth/${method}`, {username, email});
    console.log("BEFORE ME");
    dispatch(me());
  } catch (authError) {
    console.log("AUTH ERROR!");
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
