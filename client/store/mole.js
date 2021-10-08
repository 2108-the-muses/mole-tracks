import axios from "axios";
import { IPAddress } from "../../secrets";

/**
 * ACTION TYPES
 */
const SET_ALL_MOLES = "SET_ALL_MOLES";

/**
 * ACTION CREATORS
 */
const setAllMoles = (allMoles) => ({ type: SET_ALL_MOLES, allMoles });

/**
 * THUNK CREATORS
 */
export const fetchAllMoles = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://${IPAddress}:8080/api/mole/${userId}` //'http://192.168.1.209:8080/api/cats'
      );
      dispatch(setAllMoles(data));
    } catch (error) {
      console.log("THUNK ERROR: ", error);
    }
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_ALL_MOLES:
      return action.allMoles;
    default:
      return state;
  }
}
