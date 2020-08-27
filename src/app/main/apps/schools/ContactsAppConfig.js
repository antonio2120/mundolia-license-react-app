import React from 'react';
import { Redirect } from 'react-router-dom';

const ContactsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/usuarios/:id',
			component: React.lazy(() => import('./SchoolApp'))
		},
		{
			path: '/apps/usuarios',
			component: () => <Redirect to="/apps/usuarios/all" />
		}
	]
};

export default ContactsAppConfig;
