import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getDashboardInfo = createAsyncThunk('dashboardApp/dashboard/dashboardInfo', async () => {
	const today = new Date();
	const date = today.getFullYear() + '-' + ('0'+( today.getMonth() + 1)).slice(-2) + '-' + ('0'+( today.getDate())).slice(-2) + ' ' + today.getHours() + ':' + today.getMinutes();
	let params = {
		today: date,
	};
	
	const response = await axios.get(process.env.REACT_APP_API+'/dashboard/panel',{
		params: params
	});
	const data = await response.data;
	return data;
});

const dashboardSlice = createSlice({
	name: 'dashboardApp/dashboard',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getDashboardInfo.fulfilled]: (state, action) => action.payload
	}
});

export default dashboardSlice.reducer;


