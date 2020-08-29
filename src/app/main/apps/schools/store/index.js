import { combineReducers } from '@reduxjs/toolkit';
import items from './itemSlice';

const reducer = combineReducers({
	items
});

export default reducer;
