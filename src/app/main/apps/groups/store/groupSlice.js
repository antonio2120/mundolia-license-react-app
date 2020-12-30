import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";

export const getGroups = createAsyncThunk('groupsApp/groups/getGroups', async (routeParams, { getState }) => {
	// const response = await axios.get(process.env.REACT_APP_API+'/groups');
	// const data = await response.data;

	routeParams = routeParams || getState().groupsApp.groups.routeParams;
	// let filterContacts = getState().contactsApp.filter.contacts;
	const response = await axios.get(process.env.REACT_APP_API+'/usuarios',{
		// params:filterContacts
	});
	const data = await response.data;
	return data;
});

export const submitCreateGroup = ( groupdata ) => async dispatch => {
	return jwtService
		.addGroup({
			groupName: groupdata.groupName,
			teacherId: groupdata.teacher.id,
			schoolId: groupdata.teacher.school_id,
			grade: groupdata.grade,
		})
		.then(group => {
			dispatch(registerSuccess());
			// dispatch(getGroups());
			dispatch(registerReset());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};

const groupsAdapter = createEntityAdapter({});

// export const { selectAll: selectGroups, selectById: selectGroupsById } = groupsAdapter.getSelectors(
// 	state => state.groupsApp.groups
// );
const groupSlice = createSlice({
	name: 'groupsApp/groups',
	initialState: groupsAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		groupDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		},
		group: {
			success: false,
			response: false,
			error: null
		}
	}),
	reducers: {
		setContactsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		openNewGroupDialog: (state, action) => {
			state.groupDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewGroupDialog: (state, action) => {
			state.groupDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		// openEditContactDialog: (state, action) => {
		// 	state.contactDialog = {
		// 		type: 'edit',
		// 		props: {
		// 			open: true
		// 		},
		// 		data: action.payload
		// 	};
		// },
		// closeEditContactDialog: (state, action) => {
		// 	state.contactDialog = {
		// 		type: 'edit',
		// 		props: {
		// 			open: false
		// 		},
		// 		data: null
		// 	};
		// },
		// openEditContactGroupDialog: (state, action) => {
		// 	state.contactDialog = {
		// 		type: 'editGroup',
		// 		props: {
		// 			open: true
		// 		},
		// 		data: action.payload
		// 	};
		// },
		// closeEditContactGroupDialog: (state, action) => {
		// 	state.contactDialog = {
		// 		type: 'editGroup',
		// 		props: {
		// 			open: false
		// 		},
		// 		data: null
		// 	};
		// },
		registerSuccess: (state, action) => {
			state.group = {
				success: true,
				response: action.payload,
			};	
		},
		registerError: (state, action) => {
			state.group = {
				success: false,
				error: action.payload,
				// error: true
			};	
		},
		registerReset: (state, action) => {
			state.group = {
				success: false,
				error: null,
			};	
		},
	},
	extraReducers: {
		// [updateContact.fulfilled]: groupsAdapter.upsertOne,
		// [addContact.fulfilled]: groupsAdapter.addOne,
		[getGroups.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			groupsAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	openNewGroupDialog,
	closeNewGroupDialog,
	registerSuccess,
	registerError,
	registerReset 
} = groupSlice.actions;


export default groupSlice.reducer;