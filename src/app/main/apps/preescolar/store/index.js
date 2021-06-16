import { combineReducers } from '@reduxjs/toolkit';
import tareasPendientes from './tareasPendientesSlice';
import tareasEntregadas from './tareasEntregadasSlice';
import panel from './panelSlice';


const reducer = combineReducers({
	tareasPendientes,
	tareasEntregadas,
	panel
});

export default reducer;
