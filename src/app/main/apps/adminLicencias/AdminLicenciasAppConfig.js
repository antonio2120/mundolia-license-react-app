import React from 'react';
import { Redirect } from 'react-router-dom';

const AdminLicenciasAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: '/apps/adminlicencias/:orderId',
			component: React.lazy(() => import('./AdminLicenciasApp'))
		},
		{
			path: '/apps/adminlicencias/',
			component: () => <Redirect to="/apps/adminlicencias/:orderId" />
		}
	]
};

export default AdminLicenciasAppConfig;
