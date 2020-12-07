import FuseUtils from '@fuse/utils';
import appsConfigs from 'app/main/apps/appsConfigs';
import authRoleExamplesConfigs from 'app/main/auth/authRoleExamplesConfigs';
import CallbackConfig from 'app/main/callback/CallbackConfig';
import DocumentationConfig from 'app/main/documentation/DocumentationConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import LoginPhpFoxConfig from 'app/main/loginPhpFox/LoginPhpFoxConfig';
import LoginLiaConfig from 'app/main/loginLia/LoginLiaConfig';
import LoginAcademiaConfig from 'app/main/loginAcademia/LoginAcademiaConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';
import pagesConfigs from 'app/main/pages/pagesConfigs';
import UserInterfaceConfig from 'app/main/user-interface/UserInterfaceConfig';
import LicenciasConfig from "../main/Licencias/LicenciasConfig";
import SchoolsConfig from "../main/apps/schools/ItemsAppConfig";
import PeriodosConfig from "../main/apps/periodos/AppConfig";
import React from 'react';
import { Redirect } from 'react-router-dom';
import SchoolApp from "../main/apps/schools/ItemsApp";
import MaintenancePageConfig from "../main/pages/maintenance/MaintenancePageConfig";
import RedirectPageConfig from "../main/pages/redirect/RedirectPageConfig";

const routeConfigs = [
	...appsConfigs,
	...pagesConfigs,
	...authRoleExamplesConfigs,
	UserInterfaceConfig,
	DocumentationConfig,
	LogoutConfig,
	LoginConfig,
	LoginPhpFoxConfig,
	LoginLiaConfig,
	LoginAcademiaConfig,
	CallbackConfig,
	LicenciasConfig,
	SchoolsConfig,
	PeriodosConfig,
	MaintenancePageConfig,
	RedirectPageConfig
];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin', 'admin_escuela', 'user', 'alumno','maestro', 'preescolar', 'padre']),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/pages/redirect" />
	},
	{
		component: () => <Redirect to="/pages/errors/error-404" />
	}
];

export default routes;
