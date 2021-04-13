import { combineReducers } from '@reduxjs/toolkit';
import order from './orderSlice';
import user from './userInfoSlice';

const reducer = combineReducers({
	order, 
	user
});

export default reducer;
