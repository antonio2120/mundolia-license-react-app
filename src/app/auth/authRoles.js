/**
 * Authorization Roles
 */
const authRoles = {
	admin: ['admin'],
	admin_escuela: ['admin', 'admin_escuela','director_escuela'],
	teacher: ['maestro_preescolar', 'maestro_secundaria', 'profesor_summit_2021', 'maestro', 'alumno', 'alumno_secundaria', 'preescolar', 'alumnoe0', 'padre'],
	user: ['admin', 'admin_escuela', 'user'],
	alumno:['admin', 'admin_escuela', 'alumno', 'alumno_secundaria', 'preescolar', 'maestro_preescolar', 'maestro_secundaria', 'maestro', 'padre', 'profesor_summit_2021', 'alumnoe0'],
	onlyGuest: []
};

export default authRoles;
