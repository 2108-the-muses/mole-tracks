import axios from "axios";
import { IP_ADDRESS, HEROKU } from "../../secrets";
import { firebaseAuth } from "../firebase-auth/config";
// http://${IP_ADDRESS}:8080 when not using HEROKU

/**
 * FETCH CONSTANTS
 */
export const FETCH_FAILED = "FETCH_FAILED";
export const FETCH_PENDING = "FETCH_PENDING";
export const FETCH_SUCCESS = "FETCH_SUCCESS";

/**
 * ACTION TYPES
 */
const SET_MOLES_FETCH_STATUS = "SET_MOLES_FETCH_STATUS";
const SET_SINGLE_MOLE_FETCH_STATUS = "SET_SINGLE_MOLE_FETCH_STATUS";
const SET_ALL_MOLES = "SET_ALL_MOLES";
const SET_SINGLE_MOLE = "SET_SINGLE_MOLE";
const ADD_MOLE = "ADD_MOLE";
const UPDATE_MOLE = "UPDATE_MOLE";
const DELETE_MOLE = "DELETE_MOLE";

/**
 * ACTION CREATORS
 */
const setMolesFetchStatus = (status) => {
  return { type: SET_MOLES_FETCH_STATUS, status };
};

const setSingleMoleFetchStatus = (status) => {
  return { type: SET_SINGLE_MOLE_FETCH_STATUS, status };
};

const setAllMoles = (allMoles) => ({ type: SET_ALL_MOLES, allMoles });

const setSingleMole = (singleMole) => ({ type: SET_SINGLE_MOLE, singleMole });

const addMole = (mole) => ({ type: ADD_MOLE, mole });

const updateMole = (mole) => ({ type: UPDATE_MOLE, mole });

const deleteMole = (moleId) => {
  return { type: DELETE_MOLE, moleId };
};

/**
 * THUNK CREATORS
 */
export const fetchAllMoles = () => {
  return async (dispatch) => {
    try {
      dispatch(setMolesFetchStatus(FETCH_PENDING));
      const idToken = await firebaseAuth.currentUser.getIdToken(true);
      if (idToken) {
        const { data } = await axios.get(`${HEROKU}/api/mole/`, {
          headers: { authtoken: idToken },
        });
        dispatch(setAllMoles(data));
      }
      dispatch(setMolesFetchStatus(FETCH_SUCCESS));
    } catch (error) {
      dispatch(setMolesFetchStatus(FETCH_FAILED));
      console.log("THUNK ERROR: ", error);
    }
  };
};

export const fetchSingleMole = (moleId) => {
  return async (dispatch) => {
    try {
      dispatch(setSingleMoleFetchStatus(FETCH_PENDING));
      const idToken = await firebaseAuth.currentUser.getIdToken(true);
      if (idToken) {
        const { data } = await axios.get(`${HEROKU}/api/mole/${moleId}`, {
          headers: { authtoken: idToken },
        });
        dispatch(setSingleMole(data));
      }
      dispatch(setSingleMoleFetchStatus(FETCH_SUCCESS));
    } catch (error) {
      dispatch(setSingleMoleFetchStatus(FETCH_FAILED));
      console.log("THUNK ERROR: ", error);
    }
  };
};

export const addMoleThunk = ({ nickname, bodyPart, side, coords }) => {
  return async (dispatch) => {
    try {
      console.log("thunk", bodyPart);
      const idToken = await firebaseAuth.currentUser.getIdToken(true);
      if (idToken) {
        const { data } = await axios.post(
          `${HEROKU}/api/mole/`,
          {
            nickname,
            bodyPart,
            side,
            x: coords.x,
            y: coords.y,
          },
          { headers: { authtoken: idToken } }
        );
        dispatch(addMole(data));
        dispatch(setSingleMole(data));
        return data;
      }
    } catch (error) {
      console.log("THUNK ERROR: ", error);
    }
  };
};

export const updateMoleThunk = (moleId, { nickname }) => {
  return async (dispatch) => {
    try {
      const idToken = await firebaseAuth.currentUser.getIdToken(true);
      if (idToken) {
        const { data } = await axios.put(
          `${HEROKU}/api/mole/${moleId}`,
          {
            nickname,
          },
          { headers: { authtoken: idToken } }
        );
        dispatch(updateMole(data));
      }
    } catch (error) {
      console.log("THUNK ERROR: ", error);
    }
  };
};

export const deleteMoleThunk = (moleId) => async (dispatch) => {
  try {
    const idToken = await firebaseAuth.currentUser.getIdToken(true);
    if (idToken) {
      const response = await axios.delete(`${HEROKU}/api/mole/${moleId}`, {
        headers: { authtoken: idToken },
      });
      if (response.status === 200) {
        dispatch(deleteMole(moleId));
      }
    }
  } catch (err) {
    console.log("error in delete mole thunk", err);
  }
};

const initialState = {
  fetchStatus: FETCH_PENDING,
  singleMoleFetchStatus: FETCH_PENDING,
  moles: [],
  singleMole: {},
};

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ALL_MOLES:
      return { ...state, moles: action.allMoles };
    case SET_SINGLE_MOLE:
      return { ...state, singleMole: action.singleMole };
    case ADD_MOLE:
      return { ...state, moles: [...state.moles, action.mole] };
    case UPDATE_MOLE:
      return {
        ...state,
        moles: [
          ...state.moles.filter((mole) => mole.id !== action.mole.id),
          action.mole,
        ],
      };
    case DELETE_MOLE:
      return {
        ...state,
        moles: state.moles.filter((mole) => mole.id !== action.moleId),
      };
    case SET_MOLES_FETCH_STATUS:
      return { ...state, fetchStatus: action.status };
    case SET_SINGLE_MOLE_FETCH_STATUS:
      return { ...state, singleMoleFetchStatus: action.status };
    default:
      return state;
  }
}
