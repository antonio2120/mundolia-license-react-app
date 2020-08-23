import i18next from 'i18next';
import Licencias from './Licencias';

import React from 'react';

// const AdminConfig = {
// 	settings: {
// 		layout: {
// 			config: {}
// 		}
// 	},
// 	routes: [
// 		{
// 			path: '/example',
// 			component: Example
// 		}
// 	]
// };
//
// export default AdminConfig;

/**
 * Lazy load Example
 */



const LicenciasConfig = {
    settings: {
        layout: {
            config: {}
        }
    },

    routes  : [
        {
            path     : '/licencias',
            component: React.lazy(() => import('./Licencias'))
        }
    ]
};

export default LicenciasConfig;


