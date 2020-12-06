import { combineReducers } from '@reduxjs/toolkit';
import records from './Slice';
import filter from './filterSlice';

const reducer = combineReducers({
	records,
	filter
});

export default reducer;
