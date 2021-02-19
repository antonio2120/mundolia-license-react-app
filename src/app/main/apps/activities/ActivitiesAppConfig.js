import React from 'react';
import { Redirect } from 'react-router-dom';

const ActivitiesAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/actividades/:id',
			component: React.lazy(() => import('./ActivitiesApp'))
		},
		{
			path: '/apps/actividades',
			component: () => <Redirect to="/apps/actividades/all" />
		}
	]
};

export default ActivitiesAppConfig;