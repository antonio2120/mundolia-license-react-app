import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import authRoles from '../auth/authRoles';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'applications',
		title: 'Menú',
		translate: 'MENU',
		type: 'group',
		icon: 'apps',
		children: [

			{
				id: 'usuarios',
				title: 'Usuarios',
				translate: 'Usuarios',
				type: 'item',
				'auth' : authRoles.admin_escuela,
				icon: 'account_box',
				url: '/apps/usuarios/all'
			},
			{
				id: 'generar-licencias',
				title: 'Importar Usuarios',
				translate: 'Importar Usuarios',
				type: 'item',
				'auth' : authRoles.admin_escuela,
				icon: 'unarchive',
				url: '/licencias/'
			},
			{
				id: 'actividades',
				title: 'Actividades',
				translate: 'Actividades',
				type: 'item',
				'auth' : authRoles.teacher,
				icon: 'assignment',
				url: '/apps/actividades/all'
			},
			{
				id: 'tareas',
				title: 'Tareas',
				translate: 'Tareas',
				type: 'item',
				'auth' : authRoles.teacher,
				icon: 'assignment',
				url: '/apps/tareas/all'
			},
			{
				id: 'grupos',
				title: 'Grupos',
				translate: 'Grupos',
				type: 'item',
				'auth' : authRoles.admin_escuela,
				icon: 'groups',
				url: '/apps/grupos/all'
			},
			{
				id: 'schools-component',
				title: 'Escuelas',
				translate: 'Escuelas',
				type: 'item',
				'auth' : authRoles.admin,
				icon: 'account_balance',
				url: '/apps/schools/all'
			},
			{
				id: 'periodos-component',
				title: 'Periodos',
				translate: 'Periodos',
				type: 'item',
				'auth' : authRoles.admin,
				icon: 'calendar_today',
				url: '/apps/periodos/all'
			},
			{
				id: 'comunidad-component',
				title: 'Comunidad',
				translate: 'Comunidad',
				type: 'item',
				'auth' : authRoles.teacher,
				icon: 'forum',
				url: '/loginp'
			},
		]
	}
];

export default navigationConfig;
