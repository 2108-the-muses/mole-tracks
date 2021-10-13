import axios from "axios";
import { IP_ADDRESS } from "../../secrets";
import { firebaseAuth } from "../firebase-auth/config";

const ADD_ENTRY = "ADD_ENTRY";

export const addEntry = (newEntry) => ({
  type: ADD_ENTRY,
  newEntry,
});

export const _addEntry = (entry) => {
  return async (dispatch) => {
    try {
      const idToken = await firebaseAuth.currentUser.getIdToken(true);
      if (idToken) {
        const { data } = await axios.post(
          `http://${IP_ADDRESS}:8080/api/entries/`,
          entry
        );
        dispatch(_addEntry(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ENTRY:
      return { ...state, ...action.newEntry };
    default:
      return state;
  }
}
