import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
// import jwtService from "../../../../services/jwtService";
// import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getMembershipType = createAsyncThunk('adminLicenciasApp/typeMembership/getMembershipType', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/tipoMembresia',{
		// params:filterContacts
	});
	const data = await response.data;
	return data;
});



const typeMembershipAdapter = createEntityAdapter({});

export const { selectAll: selectTypeMembership, selectById: selectTypeMembershipById } = typeMembershipAdapter.getSelectors(
	state => state.adminLicenciasApp.typeMembership
);

const typeMembershipSlice = createSlice({
	name: 'adminLicenciasApp/typeMembership',
	initialState: typeMembershipAdapter.getInitialState(),
	reducers: {},
    extraReducers: {
        [getMembershipType.fulfilled]: (state, action) => action.payload
    }
});


export default typeMembershipSlice.reducer;

