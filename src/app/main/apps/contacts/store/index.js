import { combineReducers } from '@reduxjs/toolkit';
import contacts from './contactsSlice';
import user from './userSlice';
import schools from './schoolsSlice';
import roles from './rolesSlice';
import filter from './filterSlice';

const reducer = combineReducers({
	contacts,
	user,
	schools,
	roles,
	filter
});

export default reducer;
