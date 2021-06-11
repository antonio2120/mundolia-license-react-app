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
			path: '/apps/aula',
			component: React.lazy(() => import('./AulaVirtualApp'))
		}
	]
};

export default AulaVirtualAppConfig;
