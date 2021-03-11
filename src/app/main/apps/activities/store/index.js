import { combineReducers } from '@reduxjs/toolkit';
import course from './courseSlice';
import courses from './coursesSlice';
import categories from './categoriesSlice';
import activities from './activitiesSlice'; 
import groups from './groupSlice'; 
import delivery from './deliverySlice';

const reducer = combineReducers({
	categories,
	// courses,
	course,
	activities,
	groups,
	delivery
});

export default reducer;
