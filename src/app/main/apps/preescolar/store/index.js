import { combineReducers } from '@reduxjs/toolkit';
import tareasPendientes from './tareasPendientesSlice';
import tareasEntregadas from './tareasEntregadasSlice';
import panel from './panelSlice';
import calendar from './calendarSlice';


const reducer = combineReducers({
	tareasPendientes,
	tareasEntregadas,
	panel,
	calendar
});

export default reducer;
