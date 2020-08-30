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
				id: 'schools-component',
				title: 'Escuelas',
				translate: 'Escuelas',
				type: 'item',
				'auth' : authRoles.admin,
				icon: 'account_balance',
				url: '/apps/schools/all'
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
		]
	}
];

export default navigationConfig;
