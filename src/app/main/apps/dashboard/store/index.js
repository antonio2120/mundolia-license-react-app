import { combineReducers } from '@reduxjs/toolkit';
import projects from './projectsSlice';
import widgets from './widgetsSlice';
import schedule from './scheduleSlice';
import groups from './groupSlice';
import dashboard from './dashboadSlice';
import phpfox from './phpfoxSlice';


const reducer = combineReducers({
	dashboard,
	widgets,
	projects,
	schedule,
	groups,
	phpfox,
});

export default reducer;
