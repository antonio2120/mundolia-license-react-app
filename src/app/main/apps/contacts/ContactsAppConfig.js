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
			path: '/apps/estudiantes/:id',
			component: React.lazy(() => import('./ContactsApp'))
		},
		{
			path: '/apps/estudiantes',
			component: () => <Redirect to="/apps/estudiantes/all" />
		}
	]
};

export default ContactsAppConfig;
