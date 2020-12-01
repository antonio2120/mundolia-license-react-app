import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';
import { registerError, registerSuccess } from '../../../../auth/store/registerSlice';
import jwtService from 'app/services/jwtService';
const appPrefix = 'periodos';

export const getRecords = createAsyncThunk('periodosApp/records/getRecords', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().periodosApp.records.routeParams;
	let filter= getState().periodosApp.filter.records;
	const response = await axios.get(process.env.REACT_APP_API+'/periodos',{
		params:filter
	});
	const data = await response.data;
	return { data, routeParams };
});

//
//
// export const addRecord = createAsyncThunk(
// 	'periodosApp/records/addRecord',
// 	async (userdata, { dispatch, getState }) => {
// 		const response = await axios.post(process.env.REACT_APP_API+'/periodos', {
// 			username: userdata.username,
// 			name: userdata.name,
// 			last_name: userdata.last_name,
// 			school_id: userdata.school_id,
// 			role_id: userdata.role_id,
// 			email: userdata.email,
// 			grade: userdata.grade,
// 			password: userdata.password
// 		});
// 		const data = await response.data;
//
// 		dispatch(getRecords());
// 		dispatch(showMessage({message: 'Usuario creado correctamente.',variant: 'success'	}));
// 		return data;
// 	}
// );
//
// export const updateRecord = createAsyncThunk(
// 	'periodosApp/records/updateRecord',
// 	async (userdata, { dispatch, getState }) => {
// 		const response = await axios.put(process.env.REACT_APP_API+'/'+appPrefix+'/'+userdata.uuid, {
// 			username: userdata.username,
// 			name: userdata.name,
// 			last_name: userdata.last_name,
// 			school_id: userdata.school_id,
// 			role_id: userdata.role_id,
// 			email: userdata.email,
// 			grade: userdata.grade,
// 			password: userdata.password
// 		});
// 		const data = await response.data;
// 		dispatch(showMessage({message: 'Usuario actualizado correctamente.',variant: 'success'	}));
// 		dispatch(getRecords());
//
// 		return data;
// 	}
// );
//
// export const removeRecord = createAsyncThunk(
// 	'periodosApp/records/removeRecord',
// 	async (uuid, { dispatch, getState }) => {
// 		try {
// 			await axios.delete(process.env.REACT_APP_API+'/'+appPrefix+'/'+uuid).then(response => {
// 				const data = response.data;
// 				dispatch(showMessage({message: response.data.message, variant: 'success'}));
// 				dispatch(getRecords());
// 				return data;
// 			}).catch(error => {
// 				dispatch(showMessage({message: error.response.data.error.message, variant: 'error'}));
// 			});
// 		}catch (e){
// 			console.log(e);
// 		}
// 	}
// );
//
// export const removeRecords = createAsyncThunk(
// 	'periodosApp/records/removeRecords',
// 	async (contactIds, { dispatch, getState }) => {
// 		const response = await axios.post('/api/contacts-app/remove-contacts', { contactIds });
// 		const data = await response.data;
//
// 		dispatch(getRecords());
//
// 		return data;
// 	}
// );


const periodosAdapter = createEntityAdapter({});

export const { selectAll: selectRecords, selectById: selectRecordsById } = periodosAdapter.getSelectors(
	state => state.periodosApp.records
);

const slice = createSlice({
	name: 'periodosApp/records',
	initialState: periodosAdapter.getInitialState({
		// searchText: '',
		// routeParams: {},
		// Dialog: {
		// 	type: 'new',
		// 	props: {
		// 		open: false
		// 	},
		// 	data: null
		// },
		// record:{
		// 	success: false,
		// 	response: false,
		// 	error: {
		// 		errors: {
		// 			periodo: null,
		// 			name: null,
		// 			description: null,
		// 			is_active: null,
		// 			is_current: null
		// 		}
		// 	}
		// }
	}),
	reducers: {
		// setSearchText: {
		// 	reducer: (state, action) => {
		// 		state.searchText = action.payload;
		// 	},
		// 	prepare: event => ({ payload: event.target.value || '' })
		// },
		// openNewDialog: (state, action) => {
		// 	state.Dialog = {
		// 		type: 'new',
		// 		props: {
		// 			open: true
		// 		},
		// 		data: null
		// 	};
		// },
		// closeNewDialog: (state, action) => {
		// 	state.Dialog = {
		// 		type: 'new',
		// 		props: {
		// 			open: false
		// 		},
		// 		data: null
		// 	};
		// },
		// openEditDialog: (state, action) => {
		// 	state.Dialog = {
		// 		type: 'edit',
		// 		props: {
		// 			open: true
		// 		},
		// 		data: action.payload
		// 	};
		// },
		// closeEditDialog: (state, action) => {
		// 	state.Dialog = {
		// 		type: 'edit',
		// 		props: {
		// 			open: false
		// 		},
		// 		data: null
		// 	};
		// },
		// openEditGroupDialog: (state, action) => {
		// 	state.Dialog = {
		// 		type: 'editGroup',
		// 		props: {
		// 			open: true
		// 		},
		// 		data: action.payload
		// 	};
		// },
		// closeEditGroupDialog: (state, action) => {
		// 	state.Dialog = {
		// 		type: 'editGroup',
		// 		props: {
		// 			open: false
		// 		},
		// 		data: null
		// 	};
		// },
		// setFilter: (state, action) => {
		// 	state.Dialog = {
		// 		filterSchool: action.payload,
		// 	};
		// }
	},
	extraReducers: {
		// [updateRecord.fulfilled]: periodosAdapter.upsertOne,
		// [addRecord.fulfilled]: periodosAdapter.addOne,
		// [getRecords.fulfilled]: (state, action) => {
		// 	const { data, routeParams } = action.payload;
		// 	periodosAdapter.setAll(state, data);
		// 	state.routeParams = routeParams;
		// 	state.searchText = '';
		// }
	}
});

export const {
	// setSearchText,
	// setFilter,
	// openNewDialog,
	// closeNewDialog,
	// openEditDialog,
	// closeEditDialog,
	// openEditGroupDialog,
	// closeEditGroupDialog
} = slice.actions;

export default slice.reducer;
