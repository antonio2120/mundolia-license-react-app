import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
// import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

const pricingAdapter = createEntityAdapter({});

const initialState = {
    RegisterScreen: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    },
};

const pricingSlice = createSlice({
	name: 'pricingApp/pricing',
	initialState,
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
		
	},
	extraReducers: {
		
	}
});

export const {
	RegisterPapas,
	RegisterMaestros,
	RegisterEscuelas,
} = pricingSlice.actions;


export default pricingSlice.reducer;