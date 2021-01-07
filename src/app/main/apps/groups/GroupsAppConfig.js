import React from 'react';
import { Redirect } from 'react-router-dom';

const GroupsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/grupos/:id',
			component: React.lazy(() => import('./GroupsApp'))
		},
		{
			path: '/apps/grupos/',
			component: () => <Redirect to="/apps/grupos/all" />
		}
	]
};

export default GroupsAppConfig;
