import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
// import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import jwtService from 'app/services/jwtService';


const aulaAdapter = createEntityAdapter({});

export const { selectAll: selectMemberships, selectById: selectMembershipsById } = aulaAdapter.getSelectors(
	state => state.aulaApp.membership
);

const aulaSlice = createSlice({
	name: 'aulaApp/aula',
	initialState: aulaAdapter.getInitialState({
		RegisterScreen: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		memberships: {
			success: false,
			response: false,
			error: null
		}
	}),
	reducers: {
        RegisterPapas: (state, action) => {
            state.RegisterScreen = {
				type: 'papas',
				props: {
					open: true
				},
				data: null
			};
        },
        RegisterMaestros: (state, action) => {
            state.RegisterScreen = {
				type: 'maestros',
				props: {
					open: true
				},
				data: null
			};
        },
        RegisterEscuelas: (state, action) => {
            state.RegisterScreen = {
				type: 'escuelas',
				props: {
					open: true
				},
				data: null
			};
        },
		aulaSuccess: (state,action) => {
			state.memberships = {
				success: true,
				response: action.payload
			}

		},
		aulaError: (state, action) => {
			state.memberships = {
				success: false,
				error: action.payload
			}
		},
		
	}
});

export const {
	aulaSuccess,
	aulaError,
} = aulaSlice.actions;


export default aulaSlice.reducer;