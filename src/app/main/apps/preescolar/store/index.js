import { combineReducers } from '@reduxjs/toolkit';
import tareasPendientes from './tareasPendientesSlice';
import tareasEntregadas from './tareasEntregadasSlice';
import miTarea from './miTarea';
import subjectCalendarSlice from "./subjectCalendarSlice";

const reducer = combineReducers({
	tareasPendientes,
	tareasEntregadas,
	miTarea,
	subjectCalendarSlice,
});

export default reducer;
