import axios from "axios";
import { IP_ADDRESS } from "../../secrets";
import { firebaseAuth } from "../firebase-auth/config";
import { CLOUDINARY_URL, upload_preset } from "../../secrets";


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
  diameterTag
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
            `http://${IP_ADDRESS}:8080/api/entries/`,
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
      const response = await axios.delete(
        `http://${IP_ADDRESS}:8080/api/entries/${entry.id}`,
        {
          headers: { authtoken: idToken },
        }
      );
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
  { notes, date, asymmetryTag, borderTag, colorTag, elevationTag, diameterTag }
) => {
  return async (dispatch) => {
    try {
      const idToken = await firebaseAuth.currentUser.getIdToken(true);
      if (idToken) {
        const { data } = await axios.put(
          `http://${IP_ADDRESS}:8080/api/entries/${entryId}`,
          {
            notes: notes,
            date: date,
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

const initialState = { addStatus: null, entry: {} };

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ENTRY:
      return { ...state, entry: action.newEntry };
    case ADD_STATUS:
      return { ...state, addStatus: action.status };
    case UPDATE_ENTRY:
      return { ...state, entry: action.entry };
    default:
      return state;
  }
}
