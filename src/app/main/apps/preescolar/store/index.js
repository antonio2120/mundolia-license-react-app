import { combineReducers } from '@reduxjs/toolkit';
import tareasPendientes from './tareasPendientesSlice';
import tareasEntregadas from './tareasEntregadasSlice';
import miTarea from './miTarea';

const reducer = combineReducers({
	tareasPendientes,
	tareasEntregadas,
	miTarea,
});

export default reducer;
