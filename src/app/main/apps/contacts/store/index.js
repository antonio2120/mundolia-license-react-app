import { combineReducers } from '@reduxjs/toolkit';
import contacts from './contactsSlice';
import user from './userSlice';
import schools from './schoolsSlice';
import roles from './rolesSlice';

const reducer = combineReducers({
	contacts,
	user,
	schools,
	roles,
});

export default reducer;
