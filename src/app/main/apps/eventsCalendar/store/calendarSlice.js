import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getToken = createAsyncThunk('calendarApp/calendars/getToken', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/google/token');
	const data = await response.data;
	return data;
});

export const googleSigIn = () => async dispatch => {
	// return jwtService
	// 	.signInWithGoogle()
	// 	.then(message => {
    //         console.log(message);
	// 		dispatch(getToken());
	// 	})
	// 	.catch(error => {
	// 		dispatch(showMessage({message: error, variant: 'error'}));
	// 	});
};

const calendarAdapter = createEntityAdapter({});

export const { selectAll: selectCalendars, selectById: selectCalendarsById } = calendarAdapter.getSelectors(
	state => state.calendarApp.calendars
);

const calendarSlice = createSlice({
	name: 'calendarApp/calendars',
	initialState: calendarAdapter.getInitialState({
        calendarDialog: {
			type: 'google',
			props: {
				open: false
			},
			data: null
		},
        token: ''
    }),
    reducers: {
        openCalendarDialog: (state, action) => {
            state.calendarDialog = {
                type: 'google',
                props: {
                    open: true
                },
                data: null
            };
        },
        closeCalendarDialog: (state, action) => {
            state.calendarDialog = {
                type: 'google',
                props: {
                    open: false
                },
                data: null
            };
        },
    },
	extraReducers: {
		[getToken.fulfilled]: (state, action) => {
            const { data } = action.payload;
			state.token = data;
        }
	}
});

export const {
	openCalendarDialog,
    closeCalendarDialog
} = calendarSlice.actions;

export default calendarSlice.reducer;