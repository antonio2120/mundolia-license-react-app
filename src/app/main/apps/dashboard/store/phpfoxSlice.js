import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtService from "../../../../services/jwtService";
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

export const getPhpfox = createAsyncThunk('dashboardApp/dashboard/phpfox', async () => {
	
	const response = await axios.get(process.env.REACT_APP_API+'/dashboard/phpfox',{
	});
	const data = await response.data;
    console.log(data);
	return data;
});

const phpfoxSlice = createSlice({
	name: 'dashboardApp/phpfox',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getPhpfox.fulfilled]: (state, action) => action.payload
	}
});

export default phpfoxSlice.reducer;

