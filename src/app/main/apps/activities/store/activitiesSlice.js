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
	console.log(activityData);
	return jwtService
		.addActivity({
	        name: activityData.name,
            groupId: activityData.group_id,
	        finishDate: activityData.finish_date.replace("T", " "),
			theme: activityData.theme,
			instructions: activityData.instructions,
			file_path: activityData.file_path,
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

export const submitUpdateActivity = ( activityData, activityDataOrigin ) => async dispatch => {
	return jwtService
		.updateActivity({
            activityId:activityDataOrigin.id,
			name: activityData.name,
            groupId: activityData.group_id,
	        finishDate: activityData.finish_date.replace("T", " "),
			theme: activityData.theme,
			instructions: activityData.instructions,
			file_path: activityData.file_path,
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

export const removeActivity = createAsyncThunk(
	'activitiesApp/activities/removeActivity',
	async (id, { dispatch, getState }) => {
		try {
			await axios.delete(process.env.REACT_APP_API+'/actividades/'+id).then(response => {
                console.log(response);
				const data = response.data;
				dispatch(showMessage({message: response.data.message, variant: 'success'}));
				dispatch(getActivities());
				return data;
			}).catch(error => {
				dispatch(showMessage({message: error.response.data.message, variant: 'error'}));
			});
		}catch (e){
			console.log(e);
		}
	}
);

const activitiesAdapter = createEntityAdapter({});

export const { selectAll: selectActivities, selectById: selectActivityById } = activitiesAdapter.getSelectors(
	state => state.ActivitiesApp.activities
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
		openEditActivityDialog: (state, action) => {
            state.activityDialog = {
                type: 'edit',
                props: {
                    open: true
                },
                data: action.payload
            };
        },
        closeEditActivityDialog: (state, action) => {
            state.activityDialog = {
                type: 'edit',
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
	openEditActivityDialog,
	closeEditActivityDialog,
    registerError,
    registerSuccess,
    registerReset,
} = activitiesSlice.actions;

export default activitiesSlice.reducer;
