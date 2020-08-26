/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['admin'],
	admin_escuela: ['admin', 'admin_escuela'],
	user: ['admin', 'admin_escuela', 'user'],
	onlyGuest: []
};

export default authRoles;
