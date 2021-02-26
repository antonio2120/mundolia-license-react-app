import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getActivities = createAsyncThunk('activitiesApp/activities/getActivities', async () => {
    const response = await axios.get(process.env.REACT_APP_API+'/actividades',{
	});
	const data = await response.data;
	return data;
});

export const submitCreateActivity = ( activityData ) => async dispatch => {
	return jwtService
		.addActivity({
	        name: activityData.name,
            groupId: activityData.group_id,
	        finishDate: activityData.finishDate.replace("T", " "),
		})
		.then(activity => {
			dispatch(registerSuccess());
			dispatch(getActivities());
			dispatch(registerReset());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};

const activitiesAdapter = createEntityAdapter({});

export const { selectAll: selectCourses, selectById: selectCourseById } = activitiesAdapter.getSelectors(
	state => state.ActivitiesApp.courses
);

const activitiesSlice = createSlice({
	name: 'activitiesApp/activities',
    initialState: activitiesAdapter.getInitialState({
        activityDialog : {
            type: 'new',
            props: {
                open: false
            },
            data: null
        },
        activity: {
			success: false,
			response: false,
			error: null
		}
    }),
    reducers: {
        openNewActivityDialog: (state, action) => {
            state.activityDialog = {
                type: 'new',
                props: {
                    open: true
                },
                data: null
            };
        },
        closeNewActivityDialog: (state, action) => {
            state.activityDialog = {
                type: 'new',
                props: {
                    open: false
                },
                data: null
            };
        },
        registerSuccess: (state, action) => {
			state.activity = {
				success: true,
				response: action.payload,
			};	
		},
		registerError: (state, action) => {
			state.activity = {
				success: false,
				error: action.payload,
				// error: true
			};	
		},
		registerReset: (state, action) => {
			state.activity = {
				success: false,
				error: null,
			};	
		},
    },
	extraReducers: {
        [getActivities.fulfilled]: (state, action) => {


            const { data } = action.payload;
			activitiesAdapter.setAll(state, data);
        }
    }
});

export const {
	openNewActivityDialog,
    closeNewActivityDialog,
    registerError,
    registerSuccess,
    registerReset,
} = activitiesSlice.actions;

export default activitiesSlice.reducer;
