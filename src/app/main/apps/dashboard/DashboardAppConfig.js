import React from 'react';

const DashboardAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/dashboard/',
			component: React.lazy(() => import('./DashboardApp'))
		}
	]
};

export default DashboardAppConfig;
