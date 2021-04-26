import { combineReducers } from '@reduxjs/toolkit';
import order from './orderSlice';
import user from './userInfoSlice';
import membership from './membershipInfoSlice';
import typeMembership from './typeMembershipSlice';


const reducer = combineReducers({
	order, 
	user,
	membership,
	typeMembership
});

export default reducer;
