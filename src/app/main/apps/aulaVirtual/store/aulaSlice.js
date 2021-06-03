import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
// import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import jwtService from 'app/services/jwtService';


const aulaAdapter = createEntityAdapter({});

export const submitFileClassroom = ( file, meetingId ) => async dispatch => {
	return jwtService
		.addFileClassroom({
			file: file,
			meetingId: meetingId
		})
		.then(response => {
            console.log(response);
			dispatch(aulaSuccess());
		})
		.catch(error => {
			return dispatch(aulaError(error));
		});
};

export const getFileClassroom = ( idMeeting ) => async dispatch => {
	return jwtService
		.returnFileClassroom({
			idMeeting: idMeeting,
		})
		.then(response => {
			dispatch(aulaSuccess(response.data));
		})
		.catch(error => {
			return dispatch(aulaError(error));
		});
};

export const getMeetingId = () => async dispatch => {
	return jwtService
		.returnMeetingId()
		.then(response => {
			dispatch(meetingSuccess(response.data));
		})
		.catch(error => {
			return dispatch(meetingError(error));
		});
};

export const downloadFile = ( filename ) => async dispatch => {
	
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


export const { selectAll: selectAula, selectById: selectAulaById } = aulaAdapter.getSelectors(
	state => state.aulaApp.files
);

const aulaSlice = createSlice({
	name: 'aulaApp/aula',
	initialState: aulaAdapter.getInitialState({
		filesAula: {
			success:false,
            response:""
		},
		meetingAula: {
			success:false,
            response:""
		},
	}),
	reducers: {
		aulaSuccess: (state,action) => {
			state.filesAula = {
				success: true,
				response: action.payload
			}

		},
		meetingSuccess: (state,action) => {
			state.meetingAula = {
				success: true,
				response: action.payload
			}

		},
		aulaError: (state, action) => {
			state.filesAula = {
				success: false,
				error: action.payload
			}
		},
		meetingError: (state,action) => {
			state.meetingAula = {
				success: false,
				response: action.payload
			}

		},
		
	}
});

export const {
	aulaSuccess,
	aulaError,
	meetingSuccess,
	meetingError,
} = aulaSlice.actions;


export default aulaSlice.reducer;