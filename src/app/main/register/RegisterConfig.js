import { authRoles } from 'app/auth';
import Register from './Register';
import Pricing from './PricingApp';
import Invoice from './Invoice';


const RegisterConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/register',
			component: Register
		},
		{
			path: '/pricing',
			component: Pricing
		},
		{
			path: '/invoice',
			component: Invoice
		}
	]
};

export default RegisterConfig;
