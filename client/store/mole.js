import axios from 'axios';
import { IP_ADDRESS } from '../../secrets';
import { firebaseAuth } from '../firebase-auth/config';

/**
 * FETCH CONSTANTS
 */
export const FETCH_FAILED = 'FETCH_FAILED';
export const FETCH_PENDING = 'FETCH_PENDING';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';

/**
 * ACTION TYPES
 */
const SET_ALL_MOLES = 'SET_ALL_MOLES';
const ADD_MOLE = 'ADD_MOLE';
const SET_MOLES_FETCH_STATUS = 'SET_MOLES_FETCH_STATUS';
const DELETE_MOLE = 'DELETE_MOLE';

/**
 * ACTION CREATORS
 */
const setAllMoles = (allMoles) => ({ type: SET_ALL_MOLES, allMoles });

const addMole = (mole) => ({ type: ADD_MOLE, mole });

const deleteMole = (moleId) => {
	return { type: DELETE_MOLE, moleId };
};

const setMolesFetchStatus = (status) => {
	return { type: SET_MOLES_FETCH_STATUS, status };
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
				const { data } = await axios.get(
					`http://${IP_ADDRESS}:8080/api/mole/`,
					{
						headers: { authtoken: idToken },
					}
				);
				console.log('DATE FOR MURPHY', data);
				dispatch(setAllMoles(data));
			}
			dispatch(setMolesFetchStatus(FETCH_SUCCESS));
		} catch (error) {
			dispatch(setMolesFetchStatus(FETCH_FAILED));
			console.log('THUNK ERROR: ', error);
		}
	};
};

export const addMoleThunk = ({ nickname, bodyPart, side }) => {
	return async (dispatch) => {
		try {
			const idToken = await firebaseAuth.currentUser.getIdToken(true);
			if (idToken) {
				const { data } = await axios.post(
					`http://${IP_ADDRESS}:8080/api/mole/`,
					{
						nickname,
						bodyPart,
						side,
					},
					{ headers: { authtoken: idToken } }
				);
				dispatch(addMole(data));
			}
		} catch (error) {}
	};
};

export const deleteMoleThunk = (moleId) => async (dispatch) => {
	try {
		const idToken = await firebaseAuth.currentUser.getIdToken(true);
		if (idToken) {
			const response = await axios.delete(
				`http://${IP_ADDRESS}:8080/api/mole/${moleId}`,
				{ headers: { authtoken: idToken } }
			);
			if (response.status === 200) {
				dispatch(deleteMole(moleId));
			}
		}
	} catch (err) {
		console.log('error in delete mole thunk', err);
	}
};

const initialState = {
	fetchStatus: FETCH_PENDING,
	moles: [],
};

/**
 * REDUCER
 */
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_ALL_MOLES:
			return { ...state, moles: action.allMoles };
		case ADD_MOLE:
			return { ...state, moles: [...state.moles, action.mole] };
		case DELETE_MOLE:
			return {
				...state,
				moles: state.moles.filter((mole) => mole.id !== action.moleId),
			};
		case SET_MOLES_FETCH_STATUS:
			return { ...state, fetchStatus: action.status };
		default:
			return state;
	}
}
