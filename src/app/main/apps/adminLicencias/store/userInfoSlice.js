import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
// import jwtService from "../../../../services/jwtService";
import { showMessage } from 'app/store/fuse/messageSlice';

export const getUserInfo = createAsyncThunk('adminLicenciasApp/userInfo/getUserInfo', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/cuenta/',{
	});
	const data = await response.data;
	console.log(data);
	return data;
});

// export const submitUpdateUserInfo = createAsyncThunk(
// 	'adminLicenciasApp/userInfo/updateUserInfo',
// 	async ( userdata, {dispatch} ) => {
// 		console.log(userdata);

// 		const response = await axios.put(process.env.REACT_APP_API+'/usuarios/'+userdata.uuid, {
// 			name: userdata.name,
// 			last_name: userdata.last_name,
// 			email: userdata.email,
// 			password: userdata.password
// 		});
// 		const data = await response.data.data;
// 		console.log(data);
// 		dispatch(showMessage({message: 'Usuario actualizado correctamente.',variant: 'success'	}));
// 		dispatch(getUserInfo());

// 		return data;
// 	}
// );

export const submitUpdateUserInfo = createAsyncThunk(
	'adminLicenciasApp/userInfo/updateUserInfo',
	async (userdata, { dispatch }) => {
		console.log(userdata);
		try {
			await axios.put(process.env.REACT_APP_API+'/cuenta/'+userdata.uuid,{
				name: userdata.name,
				last_name: userdata.last_name,
				email: userdata.email,
				password: userdata.password
			}
			).then(response => {
				const data = response.data;
				// dispatch(showMessage({message: 'Usuario actualizado correctamente.',variant: 'success'	}));
				dispatch(getUserInfo());
				dispatch(registerSuccess());
				dispatch(registerReset());
				console.log(data);
				return data;
			}).catch(error => {
				return dispatch(registerError(error));

				// dispatch(showMessage({message: error.response.data.error.message, variant: 'error'}));
			});
		}catch (e){
			console.log(e);
		}
	}
);

const UserInfoAdapter = createEntityAdapter({});

export const { selectAll: selectInfo, selectById: selectInfoById } = UserInfoAdapter.getSelectors(
	state => state.adminLicenciasApp.userInfo
);

const userInfoSlice = createSlice({
	name: 'adminLicenciasApp/userInfo',
	initialState: UserInfoAdapter.getInitialState({
        UserInfoDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		userInfo: {
			success: false,
			response: false,
			error: null
		}
    }),
	reducers: {
        openUserInfoDialog: (state, action) => {
			state.UserInfoDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeUserInfoDialog: (state) => {
			state.UserInfoDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		registerSuccess: (state, action) => {
			state.userInfo = {
				success: true,
				response: action.payload,
			};	
		},
		registerError: (state, action) => {
			state.userInfo = {
				success: false,
				error: action.payload,
				// error: true
			};	
		},
		registerReset: (state, action) => {
			state.userInfo = {
				success: false,
				error: null,
			};	
		},
		
    },
	extraReducers: {
		// [getUserInfo.fulfilled]: (state, action) => action.payload


		// [getUserInfo.fulfilled]: (state, action) => {
		// 	const { data, routeParams } = action.payload;
		// 	UserInfoAdapter.setAll(state, data);
		// 	state.routeParams = routeParams;
		// }
		[getUserInfo.fulfilled]: (state, action) => ({
			...state,
			...action.payload
		})



	}

	
});

export const {
    openUserInfoDialog,
    closeUserInfoDialog,
	registerError,
	registerSuccess,
	registerReset
} = userInfoSlice.actions

export default userInfoSlice.reducer;

