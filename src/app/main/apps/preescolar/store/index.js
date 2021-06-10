import { combineReducers } from '@reduxjs/toolkit';
import tareasPendientes from './tareasPendientesSlice';
import tareasEntregadas from './tareasEntregadasSlice';

const reducer = combineReducers({
	tareasPendientes,
	tareasEntregadas,
});

export default reducer;
