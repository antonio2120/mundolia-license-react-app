import { combineReducers } from '@reduxjs/toolkit';
import group from './groupSlice';
import teachers from './teacherSlice';

const reducer = combineReducers({
    group,
	teachers,
});

export default reducer;
