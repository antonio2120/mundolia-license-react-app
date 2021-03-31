import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
// import jwtService from "../../../../services/jwtService";
// import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getSchedule = createAsyncThunk('dashboardApp/projects/schedule', async (role) => {

	// console.log('siuuuuuuuuuuuuuu');

	if (role == 'alumno' || role == 'alumno_secundaria' ||  role == 'preescolar' || role == 'alumnoe0' ) {
		const response = await axios.get(process.env.REACT_APP_API + '/tareas', {
			// params: params
		});
		const data = await response.data;
		console.log(data);
		return data;
	}
	else {
		const response = await axios.get(process.env.REACT_APP_API + '/actividades', {
			// params: params
		});
		const data = await response.data;
		console.log(data);

		return data;
	}
});

const scheduleAdapter = createEntityAdapter({});

// export const { selectEntities: selectSchedule, selectById: selectScheduleById } = scheduleAdapter.getSelectors(
// 	state => state.dashboardApp.schedule
// );

export const { selectAll: selectSchedule, selectById: selectScheduleById } = scheduleAdapter.getSelectors(
	state => state.dashboardApp.schedule
);

const scheduleSlice = createSlice({
	name: 'dashboardApp/schedule',
	initialState: scheduleAdapter.getInitialState(),
	reducers: {},
    extraReducers: {
        [getSchedule.fulfilled]: (state, action) => {
            const { data, routeParams } = action.payload;
            scheduleAdapter.setAll(state, data);
            state.routeParams = routeParams;
        }
    }
});


export default scheduleSlice.reducer;


