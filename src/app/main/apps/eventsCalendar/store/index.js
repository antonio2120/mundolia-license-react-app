import { combineReducers } from '@reduxjs/toolkit';
import calendar from './calendarSlice';
import token from './tokenSlice';

const reducer = combineReducers({
    calendar,
    token
});

export default reducer;