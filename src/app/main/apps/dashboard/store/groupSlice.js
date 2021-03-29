import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
// import jwtService from "../../../../services/jwtService";
// import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getGroups = createAsyncThunk('dashboardApp/projects/getGroups', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/grupos',{
		// params:filterContacts
	});
	const data = await response.data;
	return data;
});



const groupsAdapter = createEntityAdapter({});

export const { selectAll: selectGroups, selectById: selectGroupsById } = groupsAdapter.getSelectors(
	state => state.GroupsApp.group
);

const groupSlice = createSlice({
	name: 'dashboardApp/getGroups',
	initialState: groupsAdapter.getInitialState(),
	reducers: {},
    extraReducers: {
        [getGroups.fulfilled]: (state, action) => {
            const { data, routeParams } = action.payload;
            groupsAdapter.setAll(state, data);
            state.routeParams = routeParams;
        }
    }
});


export default groupSlice.reducer;

