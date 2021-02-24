import { combineReducers } from '@reduxjs/toolkit';
import course from './courseSlice';
import courses from './coursesSlice';
import categories from './categoriesSlice';
// import activities from './activitiesSlice'; 

const reducer = combineReducers({
	categories,
	courses,
	course,
	// activities
});

export default reducer;
