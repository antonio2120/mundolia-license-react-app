import { authRoles } from 'app/auth';
import React from 'react';
import { Redirect } from 'react-router-dom';
// import PreescolarLayout from './PreescolarLayout';
// import MisTareas from './MisTareas';

const PreescolarConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/landing',
			component: React.lazy(() => import('./PreescolarLayout'))
		},
		{
			path: '/apps/sections/mistareas',
			component: React.lazy(() => import('./sections/MisTareas'))
		},
		{
<<<<<<< HEAD
			path: '/apps/sections/miscore',
			component: React.lazy(() => import('./sections/MiScore'))
		}
=======
			path: '/apps/sections/mitarea/:id',
			component: React.lazy(() => import('./sections/MiTarea'))
		},
>>>>>>> 88ecdbcc1bff8152c4ec70af9d464b4a027f1480
	]
};

export default PreescolarConfig;