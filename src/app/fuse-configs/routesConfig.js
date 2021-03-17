import FuseUtils from '@fuse/utils';
import appsConfigs from 'app/main/apps/appsConfigs';
import authRoleExamplesConfigs from 'app/main/auth/authRoleExamplesConfigs';
import CallbackConfig from 'app/main/callback/CallbackConfig';
import DocumentationConfig from 'app/main/documentation/DocumentationConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import LoginPhpFoxConfig from 'app/main/loginPhpFox/LoginPhpFoxConfig';
import LoginLiaConfig from 'app/main/loginLia/LoginLiaConfig';
import LoginMundoLiaConfig from 'app/main/loginMundoLia/LoginMundoLiaConfig';
import LoginAcademiaConfig from 'app/main/loginAcademia/LoginAcademiaConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';
import pagesConfigs from 'app/main/pages/pagesConfigs';
import UserInterfaceConfig from 'app/main/user-interface/UserInterfaceConfig';
import LicenciasConfig from "../main/Licencias/LicenciasConfig";
import SchoolsConfig from "../main/apps/schools/ItemsAppConfig";
import PeriodosConfig from "../main/apps/periodos/AppConfig";
import GroupsConfig from "../main/apps/groups/GroupsAppConfig";
import RegisterConfig from 'app/main/register/RegisterConfig';
import ActivitiesConfig from "../main/apps/activities/ActivitiesAppConfig";
import HomeworksConfig from "../main/apps/homeworks/HomeworksAppConfig";
import React from 'react';
import { Redirect } from 'react-router-dom';
import SchoolApp from "../main/apps/schools/ItemsApp";
import MaintenancePageConfig from "../main/pages/maintenance/MaintenancePageConfig";
import RedirectPageConfig from "../main/pages/redirect/RedirectPageConfig";
import DashboardAppConfig from '../main/apps/dashboard/DashboardAppConfig';

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
	LoginMundoLiaConfig,
	LoginAcademiaConfig,
	CallbackConfig,
	LicenciasConfig,
	SchoolsConfig,
	PeriodosConfig,
	GroupsConfig,
	MaintenancePageConfig,
	RedirectPageConfig,
<<<<<<< HEAD
	DashboardAppConfig
=======
	RegisterConfig, 
	ActivitiesConfig,
	HomeworksConfig
>>>>>>> 4ac33f93a58f6163fc041c0fff9ad5502eb99330
];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin', 'admin_escuela','alumno_secundaria','maestro_preescolar','maestro_secundaria','director_escuela', 'user', 'alumno','maestro', 'preescolar', 'padre', 'profesor_summit_2021', 'alumnoe0']),
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
