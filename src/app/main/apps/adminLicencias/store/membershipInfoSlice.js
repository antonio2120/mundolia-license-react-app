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


const membershipInfoSlice = createSlice({
	name: 'adminLicenciasApp/membeshipInfo',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getMembershipInfo.fulfilled]: (state, action) => action.payload
	}
});

export default membershipInfoSlice.reducer;