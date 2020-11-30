import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getInfo = createAsyncThunk('schoolsApp/items/getInfo', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().schoolsApp.items.routeParams;
	let filterContacts = getState().schoolsApp.filter.school_active;
	const response = await axios.get(process.env.REACT_APP_API+'/schools',{
		params:{active : filterContacts}
	});
	const data = await response.data;
	return { data, routeParams };
});
export const syncInfo = createAsyncThunk('schoolsApp/items/syncInfo', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().ItemsApp.items.routeParams;
	const response = await axios.get(process.env.REACT_APP_API+'/lia-schools-sync');
	console.log(response)
	return { response, routeParams };
});

export const addItem = createAsyncThunk(
	'schoolsApp/items/addItem',
	async (item, { dispatch, getState }) => {
		const response = await axios.post(process.env.REACT_APP_API+'/escuelas', { item });
		const data = await response.data;

		dispatch(getInfo());

		return data;
	}
);

export const updateItem = createAsyncThunk(
	'schoolsApp/items/updateItem',
	async (item, { dispatch, getState }) => {
		const response = await axios.put(process.env.REACT_APP_API+'/escuelas/'+item.id, {
			description: item.Description,
			is_active: item.IsActive,
			name: item.School
		});
		const data = await response.data;

		dispatch(getInfo());

		return data;
	}
);

export const removeItem = createAsyncThunk(
	'schoolsApp/items/removeItem',
	async (itemId, { dispatch, getState }) => {
		const response = await axios.delete(process.env.REACT_APP_API+'/escuelas/'+itemId, { itemId });
		const data = await response.data;
		dispatch(getInfo());

		return data;
	}
);

export const removeItems = createAsyncThunk(
	'schoolsApp/items/removeItems',
	async (itemIds, { dispatch, getState }) => {
		const response = await axios.post(process.env.REACT_APP_API+'/items-app/remove-items', { itemIds });
		const data = await response.data;

		dispatch(getInfo());

		return data;
	}
);

export const toggleStarredItem = createAsyncThunk(
	'schoolsApp/items/toggleStarredItem',
	async (itemId, { dispatch, getState }) => {
		const response = await axios.post('/items-app/toggle-starred-item', { itemId });
		const data = await response.data;


		dispatch(getInfo());

		return data;
	}
);

export const toggleStarredItems = createAsyncThunk(
	'schoolsApp/items/toggleStarredItems',
	async (itemIds, { dispatch, getState }) => {
		const response = await axios.post('/api/items-app/toggle-starred-items', { itemIds });
		const data = await response.data;


		dispatch(getInfo());

		return data;
	}
);

export const setItemsStarred = createAsyncThunk(
	'schoolsApp/items/setItemsStarred',
	async (itemIds, { dispatch, getState }) => {
		const response = await axios.post('/api/items-app/set-items-starred', { itemIds });
		const data = await response.data;


		dispatch(getInfo());

		return data;
	}
);

export const setItemsUnstarred = createAsyncThunk(
	'schoolsApp/items/setItemsUnstarred',
	async (itemIds, { dispatch, getState }) => {
		const response = await axios.post('/api/items-app/set-items-unstarred', { itemIds });
		const data = await response.data;


		dispatch(getInfo());

		return data;
	}
);

const itemsAdapter = createEntityAdapter({});

export const { selectAll: selectItems, selectById: selectItemsById } = itemsAdapter.getSelectors(
	state => state.schoolsApp.items
);

const itemSlice = createSlice({
	name: 'schoolsApp/items',
	initialState: itemsAdapter.getInitialState({
		SearchText: '',
		routeParams: {},
		itemDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setItemsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		openNewItemDialog: (state, action) => {
			state.itemDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewItemDialog: (state, action) => {
			state.itemDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditItemDialog: (state, action) => {
			state.itemDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditItemDialog: (state, action) => {
			state.itemDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {
		[updateItem.fulfilled]: itemsAdapter.upsertOne,
		[addItem.fulfilled]: itemsAdapter.addOne,
		[getInfo.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			itemsAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setItemsSearchText,
	openNewItemDialog,
	closeNewItemDialog,
	openEditItemDialog,
	closeEditItemDialog
} = itemSlice.actions;

export default itemSlice.reducer;
