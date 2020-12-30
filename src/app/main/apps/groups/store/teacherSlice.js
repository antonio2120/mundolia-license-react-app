import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTeacherInfo = createAsyncThunk('contactsApp/user/getUserData', async () => {
	const response = await axios.get(process.env.REACT_APP_API+'/usuarios');
	const data = await response.data;
	var dataTeacher = [];

	for (var i = 0; i < data.length; i++) {
		if (data.role_name = "Maestro") {
			dataTeacher.push(data[i]);
		}
	}
	console.log(dataTeacher);
	return data;
});



const teacherSlice = createSlice({
	name: 'teachersApp/teachers',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getTeacherInfo.fulfilled]: (state, action) => action.payload
	}
});

export default teacherSlice.reducer;
