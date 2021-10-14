import axios from "axios";
import { IP_ADDRESS } from "../../secrets";
import { firebaseAuth } from "../firebase-auth/config";
import { CLOUDINARY_URL, upload_preset } from "../../secrets";

const ADD_ENTRY = "ADD_ENTRY";

export const _addEntry = (newEntry) => ({
  type: ADD_ENTRY,
  newEntry,
});

export const addEntry = (notes, base64Img, moleId) => {
  return async (dispatch) => {
    try {
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
          alert("Upload to Cloudinary successful");
          const { data } = await axios.post(
            `http://${IP_ADDRESS}:8080/api/entries/`,
            {
              body: {
                notes: notes,
                imgUrl: secure_url,
                moleId: moleId,
              },
            },
            {
              headers: {
                authtoken: idToken,
              },
            }
          );
          console.log("NEW ENTRY DATA", data);
          dispatch(_addEntry(data));
        }
      }
    } catch (error) {
      alert("Cannot upload to Cloudinary"); //custom error message if image upload fails
      console.log(error);
    }
  };
};

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ENTRY:
      return action.newEntry;
    default:
      return state;
  }
}
