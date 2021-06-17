import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";

export const submitEvent = ( data, date, start, end, week, days ) => async dispatch => {
	
	// const today = new Date();
	// const date = today.getFullYear() + '-' + ('0'+( today.getMonth() + 1)).slice(-2) + '-' + ('0'+( today.getDate())).slice(-2) + ' ' + today.getHours() + ':' + ('0'+( today.getMinutes() + 1)).slice(-2);
    console.log([data, date, start, end, week, days]);
    // return jwtService
	// 	.addEvent({
            
	// 	})
	// 	.then(event => {
	// 		dispatch(registerSuccess());
	// 		dispatch(registerReset());
	// 	})
	// 	.catch(error => {
	// 		return dispatch(registerError(error));
	// 	});
};

const eventAdapter = createEntityAdapter({});


const eventSlice = createSlice({
	name: 'calendarApp/event',
	initialState: eventAdapter.getInitialState({
        eventDialog : {
            type: 'new',
            props: {
                open: false
            },
            data: null
        },
        event: {
			success: false,
			response: false,
			error: null
		}
    }),
	reducers: {
        openEventDialog: (state, action) => {
            state.eventDialog = {
                type: 'new',
                props: {
                    open: true
                },
                data: action.payload
            };
        },
        closeEventDialog: (state, action) => {
            state.eventDialog = {
                type: 'new',
                props: {
                    open: false
                },
                data: null
            };
        },
        registerSuccess: (state, action) => {
			state.event = {
				success: true,
				response: action.payload,
			};	
		},
		registerError: (state, action) => {
			state.event = {
				success: false,
				error: action.payload,
				// error: true
			};	
		},
		registerReset: (state, action) => {
			state.event = {
				success: false,
				error: null,
			};	
		},

    },
	extraReducers: {}
});

export const {
	openEventDialog,
    closeEventDialog,
    registerSuccess,
    registerError,
    registerReset,
} = eventSlice.actions;

export default eventSlice.reducer;