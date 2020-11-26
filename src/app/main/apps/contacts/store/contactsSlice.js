import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserData } from './userSlice';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

import { registerError, registerSuccess } from '../../../../auth/store/registerSlice';
import jwtService from 'app/services/jwtService';

export const getContacts = createAsyncThunk('contactsApp/contacts/getContacts', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().contactsApp.contacts.routeParams;
	let filterContacts = getState().contactsApp.filter.contacts;
	const response = await axios.get(process.env.REACT_APP_API+'/usuarios',{
		params:filterContacts
	});
	const data = await response.data;
	return { data, routeParams };
});

export const submitRegister = ({ displayName, password, email, username }) => async dispatch => {
	return jwtService
		.createUser({
			name: displayName,
			password: password,
			username: username,
			email: email,
			c_password: password,
		})
		.then(user => {
			return dispatch(registerSuccess());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};

export const addContact = createAsyncThunk(
	'contactsApp/contacts/addContact',
	async (userdata, { dispatch, getState }) => {
		const response = await axios.post(process.env.REACT_APP_API+'/usuarios', {
			username: userdata.username,
			name: userdata.name,
			last_name: userdata.last_name,
			school_id: userdata.school_id,
			role_id: userdata.role_id,
			email: userdata.email,
			grade: userdata.grade,
			password: userdata.password
		});
		const data = await response.data;

		dispatch(getContacts());
		dispatch(showMessage({message: 'Usuario creado correctamente.',variant: 'success'	}));
		return data;
	}
);

export const updateContact = createAsyncThunk(
	'contactsApp/contacts/updateContact',
	async (userdata, { dispatch, getState }) => {
		const response = await axios.put(process.env.REACT_APP_API+'/usuarios/'+userdata.uuid, {
			username: userdata.username,
			name: userdata.name,
			last_name: userdata.last_name,
			school_id: userdata.school_id,
			role_id: userdata.role_id,
			email: userdata.email,
			grade: userdata.grade,
			password: userdata.password
		});
		const data = await response.data;
		dispatch(showMessage({message: 'Usuario actualizado correctamente.',variant: 'success'	}));
		dispatch(getContacts());

		return data;
	}
);

export const removeContact = createAsyncThunk(
	'contactsApp/contacts/removeContact',
	async (uuid, { dispatch, getState }) => {
		try {
			await axios.delete(process.env.REACT_APP_API+'/usuarios/'+uuid).then(response => {
				const data = response.data;
				dispatch(showMessage({message: response.data.message, variant: 'success'}));
				dispatch(getContacts());
				return data;
			}).catch(error => {
				dispatch(showMessage({message: error.response.data.error.message, variant: 'error'}));
			});
		}catch (e){
			console.log(e);
		}
	}
);

export const sendEmail = createAsyncThunk(
	'contactsApp/contacts/sendEmail',
	async (userData, { dispatch, getState }) => {
		try {
			await axios.post(process.env.REACT_APP_API+'/emails/',{message:userData.message,subject:userData.subject,uuids:userData.uuids}).then(response => {
				const data = response.data;
				dispatch(showMessage({message: response.data.message, variant: 'success'}));
				dispatch(getContacts());
				return data;
			}).catch(error => {
				dispatch(showMessage({message: error.response.data.error.message, variant: 'error'}));
			});
		}catch (e){
			console.log(e);
		}
	}
);

export const removeContacts = createAsyncThunk(
	'contactsApp/contacts/removeContacts',
	async (contactIds, { dispatch, getState }) => {
		const response = await axios.post('/api/contacts-app/remove-contacts', { contactIds });
		const data = await response.data;

		dispatch(getContacts());

		return data;
	}
);

export const toggleStarredContact = createAsyncThunk(
	'contactsApp/contacts/toggleStarredContact',
	async (contactId, { dispatch, getState }) => {
		const response = await axios.post('/api/contacts-app/toggle-starred-contact', { contactId });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getContacts());

		return data;
	}
);

export const toggleStarredContacts = createAsyncThunk(
	'contactsApp/contacts/toggleStarredContacts',
	async (contactIds, { dispatch, getState }) => {
		const response = await axios.post('/api/contacts-app/toggle-starred-contacts', { contactIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getContacts());

		return data;
	}
);

export const setContactsStarred = createAsyncThunk(
	'contactsApp/contacts/setContactsStarred',
	async (contactIds, { dispatch, getState }) => {
		const response = await axios.post('/api/contacts-app/set-contacts-starred', { contactIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getContacts());

		return data;
	}
);

export const setContactsUnstarred = createAsyncThunk(
	'contactsApp/contacts/setContactsUnstarred',
	async (contactIds, { dispatch, getState }) => {
		const response = await axios.post('/api/contacts-app/set-contacts-unstarred', { contactIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getContacts());

		return data;
	}
);

const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectContacts, selectById: selectContactsById } = contactsAdapter.getSelectors(
	state => state.contactsApp.contacts
);

const contactsSlice = createSlice({
	name: 'contactsApp/contacts',
	initialState: contactsAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		contactDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setContactsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		openNewContactDialog: (state, action) => {
			state.contactDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewContactDialog: (state, action) => {
			state.contactDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditContactDialog: (state, action) => {
			state.contactDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditContactDialog: (state, action) => {
			state.contactDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditContactGroupDialog: (state, action) => {
			state.contactDialog = {
				type: 'editGroup',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditContactGroupDialog: (state, action) => {
			state.contactDialog = {
				type: 'editGroup',
				props: {
					open: false
				},
				data: null
			};
		},
		openMassiveMessageGroupDialog: (state, action) => {
			state.contactDialog = {
				type: 'massiveMessage',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeMassiveMessageGroupDialog: (state, action) => {
			state.contactDialog = {
				type: 'massiveMessage',
				props: {
					open: false
				},
				data: action.payload
			};
		},
		setContactsFilter: (state, action) => {
			state.contactDialog = {
				filterSchool: action.payload,
			};
		}
	},
	extraReducers: {
		[updateContact.fulfilled]: contactsAdapter.upsertOne,
		[addContact.fulfilled]: contactsAdapter.addOne,
		[getContacts.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			contactsAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setContactsSearchText,
	setContactsFilter,
	openNewContactDialog,
	closeNewContactDialog,
	openEditContactDialog,
	closeEditContactDialog,
	openEditContactGroupDialog,
	closeEditContactGroupDialog,
	openMassiveMessageGroupDialog,
	closeMassiveMessageGroupDialog
} = contactsSlice.actions;

export default contactsSlice.reducer;
