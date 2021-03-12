import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getActivities = createAsyncThunk('activitiesApp/activities/getActivities', async ( role, { getState }) => {
	
	let filterContacts = getState().ActivitiesApp.filter.activity;
	let params = filterContacts.group_id == 0 ? null : filterContacts;

	if (role == 'alumno' || role == 'alumno_secundaria' ||  role == 'preescolar' || role == 'alumnoe0' ) {
		const response = await axios.get(process.env.REACT_APP_API + '/tareas', {
			params: params
		});
		const data = await response.data;
		return data;
	}
	else {
		const response = await axios.get(process.env.REACT_APP_API + '/actividades', {
			params: params
		});
		const data = await response.data;
		return data;
	}
	
});

export const submitCreateActivity = ( activityData, file, fileType ) => async dispatch => {
	console.log(activityData);
	return jwtService
		.addActivity({
	        name: activityData.name,
            groupId: activityData.group_id,
	        finishDate: activityData.finish_date.replace("T", " "),
			theme: activityData.theme,
			instructions: activityData.instructions,
			urlPath: fileType == 'url' ? activityData.url_path : '',
			file: fileType == 'file' ? file : null,
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

export const submitUpdateActivity = ( activityData, activityDataOrigin, file, fileType ) => async dispatch => {
	return jwtService
		.updateActivity({
            activityId:activityDataOrigin.id,
			name: activityData.name,
            groupId: activityData.group_id,
	        finishDate: activityData.finish_date.replace("T", " "),
			theme: activityData.theme,
			instructions: activityData.instructions,
			filePath: fileType == 'file' ? activityDataOrigin.file_path : '',
			urlPath: fileType == 'url' ? activityData.url_path : '',
			file: fileType == 'file' ? file : null,
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

export const downloadActivity = ( filename ) => async dispatch => {
	
	axios({
		url: process.env.REACT_APP_API+'/download-file',
		method: 'POST',
		responseType: 'blob', // important
		data: {
			filename:filename
		}
	})
	.then( response => {
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', filename.slice(filename.indexOf('_')+1 )); //or any other extension
		document.body.appendChild(link);
		link.click();
	}).catch(error => {
		dispatch(showMessage({message: "Error al descargar el archivo", variant: 'error'}));
	})
};

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
		},
		routeParams: {},
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
            const { data, routeParams } = action.payload;
			activitiesAdapter.setAll(state, data);
			state.routeParams = routeParams;
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
