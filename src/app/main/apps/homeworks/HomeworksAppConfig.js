import React from 'react';
import { Redirect } from 'react-router-dom';

const HomeworksAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/tareas/:id',
			component: React.lazy(() => import('./HomeworksApp'))
		},
		{
			path: '/apps/tareas/',
			component: () => <Redirect to="/apps/tareas/all" />
		}
	]
};

export default HomeworksAppConfig;
