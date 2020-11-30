import React from 'react';
import { Redirect } from 'react-router-dom';
const nameApp = 'periodos';

const AppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/'+nameApp+'/:id',
			component: React.lazy(() => import('./App'))
		},
		{
			path: '/apps/' + nameApp,
			component: () => <Redirect to={'/apps/' + nameApp + '/all'} />
		}
	]
};

export default AppConfig;
