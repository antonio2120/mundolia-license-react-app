import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
// import jwtService from "../../../../services/jwtService";
// import { showMessage } from 'app/store/fuse/messageSlice';

export const getMembershipInfo = createAsyncThunk('adminLicenciasApp/membeshipInfo/getMembeshipInfo', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/lista/membresia',{
	});
	const data = await response.data;
	// console.log(data);
	return data;
});

const MembershipInfoAdapter = createEntityAdapter({});

const membershipInfoSlice = createSlice({
	name: 'adminLicenciasApp/membeshipInfo',
	initialState: MembershipInfoAdapter.getInitialState({
        RenewLicenseDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
    }),
	reducers: {
        openRenewLicenseDialog: (state, action) => {
			state.RenewLicenseDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeRenewLicenseDialog: (state) => {
			state.RenewLicenseDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
    },
	extraReducers: {
		[getMembershipInfo.fulfilled]: (state, action) => ({
			...state,
			...action.payload
		})
	}
});
export const {
    openRenewLicenseDialog,
    closeRenewLicenseDialog
} = membershipInfoSlice.actions

export default membershipInfoSlice.reducer;