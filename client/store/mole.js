import axios from "axios";
import {IP_ADDRESS} from "../../secrets";
import {firebaseAuth} from "../firebase-auth/config";

/**
 * ACTION TYPES
 */
const SET_ALL_MOLES = "SET_ALL_MOLES";
const ADD_MOLE = "ADD_MOLE";

/**
 * ACTION CREATORS
 */
const setAllMoles = (allMoles) => ({type: SET_ALL_MOLES, allMoles});
const addMole = (mole) => ({type: ADD_MOLE, mole});

/**
 * THUNK CREATORS
 */
export const fetchAllMoles = () => {
  return async (dispatch) => {
    try {
      const idToken = await firebaseAuth.currentUser.getIdToken(true);
      if (idToken) {
        const {data} = await axios.get(`http://${IP_ADDRESS}:8080/api/mole/`, {
          headers: {authtoken: idToken},
        });
        dispatch(setAllMoles(data));
      }
    } catch (error) {
      console.log("THUNK ERROR: ", error);
    }
  };
};

export const addMoleThunk = ({nickname, bodyPart, side}) => {
  return async (dispatch) => {
    try {
      const idToken = await firebaseAuth.currentUser.getIdToken(true);
      if (idToken) {
        const {data} = await axios.post(
          `http://${IP_ADDRESS}:8080/api/mole/`,
          {
            nickname,
            bodyPart,
            side,
          },
          {headers: {authtoken: idToken}}
        );
        dispatch(addMole(data));
      }
    } catch (error) {}
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_ALL_MOLES:
      return action.allMoles;
    case ADD_MOLE:
      return [...state, action.mole];
    default:
      return state;
  }
}
