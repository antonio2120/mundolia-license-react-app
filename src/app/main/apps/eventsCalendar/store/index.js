import { combineReducers } from '@reduxjs/toolkit';
import calendar from './calendarSlice';

const reducer = combineReducers({
    calendar
});

export default reducer;