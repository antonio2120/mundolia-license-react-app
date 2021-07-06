import React from 'react';
import { Redirect } from 'react-router-dom';

const AulaVirtualAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/aula/:id',
			component: React.lazy(() => import('./AulaVirtualApp'))
		},
		{
			path: '/apps/aula',
			component: () => <Redirect to="/apps/aula/all" />
		}
	]
};

export default AulaVirtualAppConfig;
