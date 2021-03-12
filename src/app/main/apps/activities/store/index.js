import { combineReducers } from '@reduxjs/toolkit';
import course from './courseSlice';
import courses from './coursesSlice';
import categories from './categoriesSlice';
import activities from './activitiesSlice'; 
import groups from './groupSlice'; 
import delivery from './deliverySlice';
import filter from './filterSlice';

const reducer = combineReducers({
	categories,
	// courses,
	course,
	activities,
	groups,
	delivery,
	filter
});

export default reducer;
