import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { logoutUser } from 'app/auth/store/userSlice';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
	TextTitle: {
		fontWeight: "bold",
		fontSize: "32px",
		color: 'white',
		textShadow: '2px 2px 2px black',
	},
	Text: {
		fontSize: "18px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},
	TextInfo: {
		fontSize: "16px",
		color: 'white',
		textShadow: '2px 2px 2px black',
		text: "center",
		alignSelf: "center",
	},
	container: {
		// marginTop: "-40px",
		// paddingTop: "20px",
		// height: "90px",
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center", //*important
		// display: 'block',
		backgroundColor: 'rgba(255, 255, 255, .9)',

	},
	containersInfo: {
		borderRadius: 5,
		width: '50px'
	},
	avatarContainer: {
		// objectPosition: 'right',
		// display: 'flex',
		// flexDirection: "row-reverse"
		// maxHeight: '40px',
		// justifyContent: "flex-end",
		// alignItems: "flex-end",
		// alignContent: "flex-end",
		// textAlign:"right",
		// alignSelf: 'flex-end',
		// alignContent: 'flex-end',
		// flexContainer: 'justify-end',
		paddingLeft: '70px',
		paddingRight: '70px',
	},
	avatar: {
		width: 80,
		height: 80,
		// position: 'absolute',
		// top: 92,
		padding: 8,
		background: theme.palette.background.default,
		boxSizing: 'content-box',
		left: '3%',
		transform: 'translateX(-50%)',
		transition: theme.transitions.create('all', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		}),
		'& > img': {
			borderRadius: '50%'
		}
	},

}));

export default function UserInfoHeader() {
    const dispatch = useDispatch();
	const classes = useStyles();
    const user = useSelector(({ auth }) => auth.user);
	const role = useSelector(({ auth }) => auth.user.role);
    const info = useSelector(({ auth }) => auth.user);

    const [userMenu, setUserMenu] = useState(null);

    const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

    const userMenuClose = () => {
		setUserMenu(null);
	};

    return (
        <>
            <div className="flex w-full items-center justify-center flex-wrap flex-row">

                <Avatar
                    className={clsx(classes.avatar, 'avatar')}
                    onClick={userMenuClick}
                    src={user.data.photoURL && user.data.photoURL !== ''
                        ? user.data.photoURL
                        : " assets/images/preescolar/infoestudiante.png"} >
                </Avatar>
                <div className={clsx(classes.containersInfo), "w-2/3 flex-col"}>
                    {/* <div> */}
                    <p className={clsx(classes.TextInfo)}
                        style={{
                            paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, backgroundColor: '#FCDB00', color: '#FFFFFF',
                            borderRadius: 12, fontWeight: "bold", maxWidth: '70%', margin: 5, textAlign: "center",
                        }}>
                        {info.data.displayName}
                    </p>
                    <p className={clsx(classes.TextInfo)}
                        style={{
                            paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, backgroundColor: '#FCDB00', color: '#FFFFFF',
                            borderRadius: 12, fontWeight: "bold", maxWidth: '70%', margin: 5, textAlign: "center",
                        }}>
                        {info.grade}°
                    </p>
                    <p className={clsx(classes.TextInfo)}
                        style={{
                            paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, backgroundColor: '#FCDB00', color: '#FFFFFF',
                            borderRadius: 12, fontWeight: "bold", maxWidth: '70%', margin: 5, textAlign: "center",
                        }}>
                        {info.school_name}
                    </p>
                </div>
            </div>

            <Popover
                open={Boolean(userMenu)}
                anchorEl={userMenu}
                onClose={userMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                classes={{
                    paper: 'py-8'
                }}
            >
                <MenuItem
                    onClick={() => {
                        dispatch(logoutUser());

                        userMenuClose();
                    }}
                >
                    <ListItemIcon className="min-w-40">
                        <Icon>exit_to_app</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </MenuItem>
            </Popover>
        </>

    )
}
