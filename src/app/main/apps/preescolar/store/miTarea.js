import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getMiTarea = createAsyncThunk('miTareaApp/miTarea/getMiTarea', async (params) => {
	const response = await axios.get(process.env.REACT_APP_API+'/tareas/actividad/'+params.id,{
		// params:filterContacts
	});
	const data = await response.data;
	return data;
});

export const submitCreateHomework = ( homeworkdata ) => async dispatch => {
	return jwtService
		.addHomework({
			// homeworkId: homeworkdata.homeworkList,
			// uuids: users,
			homeworkName: homeworkdata.name,
			teacherId: homeworkdata.teacher.id,
			schoolId: homeworkdata.teacher.school_id,
			grade: homeworkdata.grade,
		})
		.then(homework => {
			dispatch(registerSuccess());
			dispatch(getMiTarea());
			dispatch(registerReset());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};

export const submitUpdateHomework = ( homeworkdata, homeworkOrigin ) => async dispatch => {

	const today = new Date();
	const date = today.getFullYear() + '-' + ('0'+( today.getMonth() + 1)).slice(-2) + '-' + ('0'+( today.getDate())).slice(-2) + ' ' + today.getHours() + ':' + ('0'+( today.getMinutes() + 1)).slice(-2);

	return jwtService
		.updateHomework({
			id: homeworkOrigin.id,
			status: 'Calificado',
			score: homeworkdata.score,
			scoredDate: date,
		})
		.then(response => {
			dispatch(registerSuccess());
			dispatch(getMiTarea({ 'id': response.data.activity_id}));
			dispatch(registerReset());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};

export const downloadHomework = ( filename ) => async dispatch => {
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
		link.setAttribute('download', filename.slice(filename.indexOf('_')+1)); //or any other extension
		document.body.appendChild(link);
		link.click();
	}).catch(error => {
		dispatch(showMessage({message: "Error al descargar el archivo", variant: 'error'}));
	})
};

const miTareaAdapter = createEntityAdapter({});

export const { selectAll: selectHomeworks, selectById: selectHomeworksById } = miTareaAdapter.getSelectors(
	state => state.HomeworksApp.homework
);
const homeworkSlice = createSlice({
	name: 'miTareaApp/miTarea',
	initialState: miTareaAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		homeworkDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		homework: {
			success: false,
			response: false,
			error: null
		}
	}),
	reducers: {
		setHomeworksSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		openNewHomeworkDialog: (state, action) => {
			state.homeworkDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewHomeworkDialog: (state, action) => {
			state.homeworkDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditHomeworkDialog: (state, action) => {
			console.log('opeeeeeeeeeeeeen');
			state.homeworkDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditHomeworkDialog: (state, action) => {
			state.homeworkDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		registerSuccess: (state, action) => {
			state.homework = {
				success: true,
				response: action.payload,
			};	
		},
		registerError: (state, action) => {
			state.homework = {
				success: false,
				error: action.payload,
				// error: true
			};	
		},
		registerReset: (state, action) => {
			state.homework = {
				success: false,
				error: null,
			};	
		},
	},
	extraReducers: {
		// [updateContact.fulfilled]: miTareaAdapter.upsertOne,
		// [addContact.fulfilled]: miTareaAdapter.addOne,
		[getHomeworks.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			miTareaAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setHomeworksSearchText,
	openNewHomeworkDialog,
	closeNewHomeworkDialog,
	registerSuccess,
	registerError,
	registerReset,
	openEditHomeworkDialog,
	closeEditHomeworkDialog,
} = homeworkSlice.actions;


export default homeworkSlice.reducer;