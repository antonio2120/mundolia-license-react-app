import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
// import jwtService from "../../../../services/jwtService";
import { showMessage } from 'app/store/fuse/messageSlice';

export const getUserInfo = createAsyncThunk('adminLicenciasApp/userInfo/getUserInfo', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/cuenta/',{
	});
	const data = await response.data;
	return data;
});

export const submitUpdateUserInfo = createAsyncThunk(
	'adminLicenciasApp/userInfo/updateUserInfo',
	async ( userdata, uuid ) => {
		console.log(userdata);
		console.log(uuid);

		// const response = await axios.put(process.env.REACT_APP_API+'/usuarios/'+userdata.uuid, {
		// 	username: userdata.username,
		// 	name: userdata.name,
		// 	last_name: userdata.last_name,
		// 	school_id: userdata.school_id,
		// 	role_id: userdata.role_id,
		// 	email: userdata.email,
		// 	grade: userdata.grade,
		// 	password: userdata.password
		// });
		// const data = await response.data.data;
		// dispatch(showMessage({message: 'Usuario actualizado correctamente.',variant: 'success'	}));
		// dispatch(getUserInfo());

		// return data;
	}
);


const UserInfoAdapter = createEntityAdapter({});

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
    },
	extraReducers: {
		// [getUserInfo.fulfilled]: (state, action) => action.payload


		[getUserInfo.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			UserInfoAdapter.setAll(state, data);
			state.routeParams = routeParams;
		}
	}

	
});

export const {
    openUserInfoDialog,
    closeUserInfoDialog
} = userInfoSlice.actions

export default userInfoSlice.reducer;

