import { combineReducers } from '@reduxjs/toolkit';
import tareasPendientes from './tareasPendientesSlice';
import tareasEntregadas from './tareasEntregadasSlice';
<<<<<<< HEAD
import panel from './panelSlice';

=======
import miTarea from './miTarea';
>>>>>>> 88ecdbcc1bff8152c4ec70af9d464b4a027f1480

const reducer = combineReducers({
	tareasPendientes,
	tareasEntregadas,
<<<<<<< HEAD
	panel
=======
	miTarea,
>>>>>>> 88ecdbcc1bff8152c4ec70af9d464b4a027f1480
});

export default reducer;
