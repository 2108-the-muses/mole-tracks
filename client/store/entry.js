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

const ADD_ENTRY = "ADD_ENTRY";

export const _addEntry = (newEntry) => ({
  type: ADD_ENTRY,
  newEntry,
});

export const addStatus = (status) => ({ type: ADD_STATUS, status });

export const addEntry = (notes, base64Img, moleId) => {
  console.log("MOLEID IN ADD ENTRY THUNK", moleId);
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
              imgUrl: secure_url,
              moleId: moleId,
            },
            {
              headers: {
                authtoken: idToken,
              },
            }
          );
          // alert("Upload to Cloudinary successful")

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

const initialState = { addStatus: null, entry: {} };

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ENTRY:
      return { ...state, entry: action.newEntry };
    case ADD_STATUS:
      return { ...state, addStatus: action.status };
    default:
      return state;
  }
}
