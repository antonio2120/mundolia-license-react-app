import FuseUtils from '@fuse/utils';
import appsConfigs from 'app/main/apps/appsConfigs';
import authRoleExamplesConfigs from 'app/main/auth/authRoleExamplesConfigs';
import CallbackConfig from 'app/main/callback/CallbackConfig';
import DocumentationConfig from 'app/main/documentation/DocumentationConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';
import pagesConfigs from 'app/main/pages/pagesConfigs';
import UserInterfaceConfig from 'app/main/user-interface/UserInterfaceConfig';
import LicenciasConfig from "../main/Licencias/LicenciasConfig";
import SchoolsConfig from "../main/apps/schools/ItemsAppConfig";
import React from 'react';
import { Redirect } from 'react-router-dom';
import SchoolApp from "../main/apps/schools/ItemsApp";
import MaintenancePageConfig from "../main/pages/maintenance/MaintenancePageConfig";

const routeConfigs = [
	...appsConfigs,
	...pagesConfigs,
	...authRoleExamplesConfigs,
	UserInterfaceConfig,
	DocumentationConfig,
	LogoutConfig,
	LoginConfig,
	LogoutConfig,
	CallbackConfig,
	LicenciasConfig,
	SchoolsConfig,
	MaintenancePageConfig
];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin', 'admin_escuela', 'user', 'alumno','maestro']),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/pages/bienvenido" />
	},
	{
		component: () => <Redirect to="/pages/errors/error-404" />
	}
];

export default routes;
