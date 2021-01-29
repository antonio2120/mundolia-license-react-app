import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import { createUserSettingsFirebase, setUserData } from './userSlice';

export const submitRegister = ({ displayName, password, email, username }) => async dispatch => {
	return jwtService
		.createUser({
			name: displayName,
			password: password,
			username: username,
			email: email,
			c_password: password,
		})
		.then(user => {
			dispatch(setUserData(user));
			return dispatch(registerSuccess());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};

export const membershipPayment = ({ parentName, parentSurname, parentEmail, parentPhone, title, description, unit_price}) => async dispatch => {
	return jwtService
		.handlePayment({
			payer:{
				name: parentName,
				surname: parentSurname,
				email: parentEmail,
				phone: parentPhone
			},
			item:{
				title: title,
				description: description,
				unit_price: unit_price
			}
		}).then(response => {
			console.log("dispatch resp::",response);
			window.location.href = response.init_point;
			// dispatch()
			return 1;
		})
		.catch(error => {
			console.log("dispatch err::",error);
			// dispatch()
			return null;
		})
};

export const registerWithFirebase = model => async dispatch => {
	if (!firebaseService.auth) {
		console.warn("Firebase Service didn't initialize, check your configuration");

		return () => false;
	}
	const { email, password, displayName } = model;

	return firebaseService.auth
		.createUserWithEmailAndPassword(email, password)
		.then(response => {
			dispatch(
				createUserSettingsFirebase({
					...response.user,
					displayName,
					email
				})
			);

			return dispatch(registerSuccess());
		})
		.catch(error => {
			const usernameErrorCodes = ['auth/operation-not-allowed', 'auth/user-not-found', 'auth/user-disabled'];

			const emailErrorCodes = ['auth/email-already-in-use', 'auth/invalid-email'];

			const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

			const response = {
				email: emailErrorCodes.includes(error.code) ? error.message : null,
				displayName: usernameErrorCodes.includes(error.code) ? error.message : null,
				password: passwordErrorCodes.includes(error.code) ? error.message : null
			};

			if (error.code === 'auth/invalid-api-key') {
				dispatch(showMessage({ message: error.message }));
			}

			return dispatch(registerError(response));
		});
};

const initialState = {
	success: false,
	error: {
		username: null,
		password: null
	}
};

const registerSlice = createSlice({
	name: 'auth/register',
	initialState,
	reducers: {
		registerSuccess: (state, action) => {
			state.success = true;
		},
		registerError: (state, action) => {
			state.success = false;
			state.error = action.payload;
		}
	},
	extraReducers: {}
});

export const { registerSuccess, registerError } = registerSlice.actions;

export default registerSlice.reducer;
