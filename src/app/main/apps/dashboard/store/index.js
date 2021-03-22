import { combineReducers } from '@reduxjs/toolkit';
import projects from './projectsSlice';
import widgets from './widgetsSlice';
import schedule from './scheduleSlice';

const reducer = combineReducers({
	widgets,
	projects,
	schedule
});

export default reducer;
