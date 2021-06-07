import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { openAvatarLayout } from 'app/store/fuse/avatarSlice';
import {openNewGroupDialog} from "../../main/apps/groups/store/groupSlice";

const useStyles = makeStyles(theme => ({
	root: {
		'&.user': {
			'& .username, & .email': {
				transition: theme.transitions.create('opacity', {
					duration: theme.transitions.duration.shortest,
					easing: theme.transitions.easing.easeInOut
				})
			}
		}
	},
	avatar: {
		width: 72,
		height: 72,
		position: 'absolute',
		top: 92,
		padding: 8,
		background: theme.palette.background.default,
		boxSizing: 'content-box',
		left: '50%',
		transform: 'translateX(-50%)',
		transition: theme.transitions.create('all', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		}),
		'& > img': {
			borderRadius: '50%'
		}
	}
}));

function UserNavbarHeader(props) {
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user);
	const role = useSelector(({ auth }) => auth.user.role);


	console.log(user);

	const classes = useStyles();

	return (
		<AppBar
			position="static"
			color="primary"
			elevation={0}
			classes={{ root: classes.root }}
			className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0"
		>
			<Typography className="username text-16 whitespace-no-wrap" color="inherit">
				{user.data.displayName}
			</Typography>
			<Typography className="email text-13 mt-8 opacity-50 whitespace-no-wrap" color="inherit">
				{user.data.email}
			</Typography>
			{role === 'alumno' || role === 'alumno_secundaria' || role === 'preescolar' || role === 'alumnoe0' || role === 'alumnoe1' || role === 'alumnoe2' || role === 'alumnoe3' || role === 'Alumno-I' || role === 'Alumno-M' || role === 'Alumno-A' ?
				<Avatar
					className={clsx(classes.avatar, 'avatar')}
					alt="user photo"
					src={
						user.data.photoURL && user.data.photoURL !== ''
							? user.data.photoURL
							: 'assets/images/avatars/profile.jpg'
					}
					onClick={ev => dispatch(openAvatarLayout())}
				/>
				:
				<Avatar
					className={clsx(classes.avatar, 'avatar')}
					alt="user photo"
					src={
						user.data.photoURL && user.data.photoURL !== ''
							? user.data.photoURL
							: 'assets/images/avatars/profile.jpg'
					}
				/>
			}
		</AppBar>
	);
}

export default UserNavbarHeader;
