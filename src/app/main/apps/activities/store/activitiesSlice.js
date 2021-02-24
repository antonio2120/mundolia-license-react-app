import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getActivities = createAsyncThunk('activitiesApp/activities/getActivities', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/activities',{
	});
	const data = await response.data;
	return data;
});

const activitiesSlice = createSlice({
	name: 'activitiesApp/activities',
	// initialState: {},
	// reducers: {},
	extraReducers: {
		[getActivities.fulfilled]: (state, action) => action.payload
	}
});

export default activitiesSlice.reducer;
