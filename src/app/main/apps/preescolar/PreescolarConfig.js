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
		}
	]
};

export default PreescolarConfig;