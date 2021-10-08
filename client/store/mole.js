import axios from "axios";
import { IP_ADDRESS } from "../../secrets";

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
        `http://${IP_ADDRESS}:8080/api/mole/${userId}`
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
