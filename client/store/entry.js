import axios from "axios";
import { firebaseAuth } from "../firebase-auth/config";
import {
  IP_ADDRESS,
  CLOUDINARY_URL,
  upload_preset,
  HEROKU,
} from "../../secrets";

/**
 * ADD CONSTANTS
 */
export const ADD_FAILED = "ADD_FAILED";
export const ADD_PENDING = "ADD_PENDING";
export const ADD_SUCCESS = "ADD_SUCCESS";
const ADD_STATUS = "ADD_STATUS";

/**
 * ACTION TYPES
 */
const ADD_ENTRY = "ADD_ENTRY";
const DELETE_ENTRY = "DELETE_ENTRY";
const UPDATE_ENTRY = "UPDATE_ENTRY";
const CURRENT_MOLE_ANALYSIS = "CURRENT_MOLE_ANALYSIS";

/**
 * ACTION CREATORS
 */
export const _addEntry = (newEntry) => ({
  type: ADD_ENTRY,
  newEntry,
});

export const _deleteEntry = (entryId) => {
  return { type: DELETE_ENTRY, entryId };
};

const _updateEntry = (entry) => ({ type: UPDATE_ENTRY, entry });

export const addStatus = (status) => ({ type: ADD_STATUS, status });

export const setMoleAnalysis = (moleAnalysis) => ({
  type: CURRENT_MOLE_ANALYSIS,
  moleAnalysis,
});

/**
 * THUNK CREATORS
 */

export const addEntry = (
  notes,
  date,
  base64Img,
  moleId,
  asymmetryTag,
  borderTag,
  colorTag,
  elevationTag,
  diameterTag,
  moleAnalysis
) => {
  return async (dispatch) => {
    try {
      dispatch(addStatus(ADD_PENDING));
      const idToken = await firebaseAuth.currentUser.getIdToken(true);
      if (idToken) {
        let imgData = {
          file: base64Img,
          upload_preset: upload_preset,
        };
        const response = await fetch(CLOUDINARY_URL, {
          body: JSON.stringify(imgData),
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
        });
        let { secure_url } = await response.json();
        if (secure_url) {
          const { data } = await axios.post(
            `${HEROKU}/api/entries/`,
            {
              notes: notes,
              date: date,
              imgUrl: secure_url,
              moleId: moleId,
              asymmetryTag: asymmetryTag,
              borderTag: borderTag,
              colorTag: colorTag,
              elevationTag: elevationTag,
              diameterTag: diameterTag,
              moleAnalysis: moleAnalysis,
            },
            {
              headers: {
                authtoken: idToken,
              },
            }
          );
          dispatch(_addEntry(data));
        }
      }
      dispatch(addStatus(ADD_SUCCESS));
    } catch (error) {
      dispatch(addStatus(ADD_FAILED));
      console.log(error);
    }
  };
};

export const deleteEntry = (entry) => async (dispatch) => {
  try {
    const idToken = await firebaseAuth.currentUser.getIdToken(true);
    if (idToken) {
      const response = await axios.delete(`${HEROKU}/api/entries/${entry.id}`, {
        headers: { authtoken: idToken },
      });
      if (response.status === 200) {
        dispatch(_deleteEntry(entry.id));
      }
    }
  } catch (err) {
    console.log("error in delete entry thunk", err);
  }
};

export const updateEntry = (
  entryId,
  { notes, asymmetryTag, borderTag, colorTag, elevationTag, diameterTag }
) => {
  return async (dispatch) => {
    try {
      const idToken = await firebaseAuth.currentUser.getIdToken(true);
      if (idToken) {
        const { data } = await axios.put(
          `${HEROKU}/api/entries/${entryId}`,
          {
            notes: notes,
            asymmetryTag: asymmetryTag,
            borderTag: borderTag,
            colorTag: colorTag,
            elevationTag: elevationTag,
            diameterTag: diameterTag,
          },
          { headers: { authtoken: idToken } }
        );
        dispatch(_updateEntry(data));
      }
    } catch (error) {
      console.log("THUNK ERROR: ", error);
    }
  };
};

const initialState = { addStatus: null, entry: {}, moleAnalysis: "" };

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ENTRY:
      return { ...state, entry: action.newEntry };
    case ADD_STATUS:
      return { ...state, addStatus: action.status };
    case UPDATE_ENTRY:
      return { ...state, entry: action.entry };
    case CURRENT_MOLE_ANALYSIS:
      console.log("IN REDUCER", action.moleAnalysis);
      return { ...state, moleAnalysis: action.moleAnalysis };
    default:
      return state;
  }
}
