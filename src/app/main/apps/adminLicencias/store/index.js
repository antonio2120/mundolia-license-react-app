import { combineReducers } from '@reduxjs/toolkit';
import order from './orderSlice';
import user from './userInfoSlice';
import membership from './membershipInfoSlice';


const reducer = combineReducers({
	order, 
	user,
	membership
});

export default reducer;
