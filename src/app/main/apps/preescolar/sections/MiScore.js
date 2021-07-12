import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Preescolar.css';
import { Link, useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import reducer from '../store';
import withReducer from 'app/store/withReducer';
import { getPanelInfo } from '../store/panelSlice';
import { getTareasPendientes } from '../store/tareasPendientesSlice';
import { getTareasEntregadas } from '../store/tareasEntregadasSlice';
import { useDeepCompareEffect } from '@fuse/hooks';
// import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import { logoutUser } from 'app/auth/store/userSlice';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import { openAvatarLayout } from 'app/store/fuse/avatarSlice';
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
	yellowIcons: {
		// fontWeight: "bold",
		fontSize: "28px",
		color: 'yellow',
		// textShadow: '2px 2px 2px black',
	},
	button: {

		"&:hover": {
			transform: "scale(1.2)"
			// width:"120%"
		},
		text: "center",
	},
	img: {
		maxHeight: "20%",
		maxWidth: "20%",
	},
	container: {
		// marginTop: "-40px",
		// paddingTop: "20px",
		// height: "90px",
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center", //*important
	},
	paperTitle: {
		marginTop: "-40px",
		paddingTop: "20px",
		height: "70px",
		width: "280px",
		textAlign: "center", //*important
	},
	scroll: {
		width: '100%',
		position: 'relative',
		overflow: 'auto',
		maxHeight: 500,
		height: 500,
		border: 1
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
	userIcon:{
		// maxHeight: "50%",
		// maxWidth: "50%",
		// display: 'flex',
		// objectFit: 'cover',
		// flexContainer: 'justify-end',
		// justifyContent: "flex-end",
		// alignItems: "flex-end",
		// alignContent: "flex-end",
		// textAlign:"right",
		// alignSelf: 'flex-end',
		// alignContent: 'flex-end',
		paddingLeft: '100px'

	},
	infoCardsColumn: {
		paddingTop: 12, paddingBottom: 12, paddingLeft: 5, paddingRight: 5, backgroundColor: '#ECA800', color: '#FFFFFF',												
		borderRadius: 15, fontWeight: "bold", width: 'full', height: 'full', textAlign: "center", flex: 1, borderColor: '#FFD90A', borderWidth: 6,
	},
	// ChannelsList: {
	// 	marginTop: 10,
	// 	// borderColor: '#FFFFFF',
	// 	borderColor: '#FFFFFF',
    // 	borderTopWidth: 3,
    // 	borderRadius: 1,
	// },
	channelIcon: {
		maxHeight: 80,
		maxWidth: 80,
	}, 
	TextChannel: {
		fontSize: "18px",
		color: 'white',
		// textShadow: '2px 2px 2px black',
		text: "left",
		alignSelf: "left",
		textAlign: "left",
	},
	avatar: {
		width: 100,
		height: 100,
		// position: 'absolute',
		// top: 92,
		// padding: 8,
		background: theme.palette.background.default,
		boxSizing: 'content-box',
		// left: '50%',
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

function MiScore(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const routeParams = useParams();
	const user = useSelector(({ auth }) => auth.user);
	const role = useSelector(({ auth }) => auth.user.role);
	const pendientes = useSelector(({ PreescolarApp }) => PreescolarApp.tareasPendientes.data);
	const entregadas = useSelector(({ PreescolarApp }) => PreescolarApp.tareasEntregadas.data);
	const panelInfo = useSelector(({ PreescolarApp }) => PreescolarApp.panel.data);

	const info = useSelector(({ auth }) => auth.user);
	const escuelabaja = role== 'alumno' && info.grade <= 3 ? true : false ; 

	const [userMenu, setUserMenu] = useState(null);

	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	useDeepCompareEffect(() => {
		dispatch(getPanelInfo());
		dispatch(getTareasPendientes());
		dispatch(getTareasEntregadas());	
	}, [dispatch, routeParams]);

	function handleSubmit(event) {
		const token = localStorage.getItem('jwt_access_token');
		if (token) {
			console.log("token_exists::");
		} else {
			console.log("token_exists::no");
		}
	}


	return (
		<div
			className="flex-1 "
			style={{
				backgroundImage: `url("assets/images/preescolar/pantalla12.png")`,
				backgroundPosition: 'center',
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat'
			}}>

			<FuseAnimateGroup
				className="flex flex-wrap"
				enter={{
					animation: 'transition.slideUpBigIn'
				}}
			>

				<div className="float flex w-full flex-wrap">
					<div className="flex w-full md:w-1/2">
						<Button
							className={clsx(classes.button)}
							style={{
								backgroundColor: 'transparent',
							}}
							to={`/apps/landing`}
							component={Link}
							type="button"
						>
							<img className={clsx(classes.img)} src="assets/images/preescolar/explorer.png" />
							<Typography className={clsx(classes.TextTitle)}>
								Mi Score
							</Typography>
						</Button>
					</div>


					{/* ------------------------- Avatar and User Info --------------------- */}
					<div className="flex w-full md:w-1/2 items-center justify-center flex-wrap flex-row">
						
						<Button className={clsx(classes.avatarContainer),"w-1/3 justify-end text-end items-end justify-end"} 
							onClick={userMenuClick}>
							<img className={clsx(classes.userIcon)}
								style={{
									background: "assets/images/preescolar/infoestudiante.png",
								}}
								width="200"
								position="right"
								src="assets/images/preescolar/infoestudiante.png"/>
						</Button>
						<div className={clsx(classes.containersInfo),"w-2/3 flex-col"}>
							{/* <div> */}
								<p className={clsx(classes.TextInfo)} 
								style={{paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, backgroundColor: '#FCDB00', color: '#FFFFFF', 
									borderRadius: 12, fontWeight: "bold", maxWidth: '70%', margin: 5, textAlign: "center",}}>
									{info.data.displayName}
								</p>
								<p className={clsx(classes.TextInfo)} 
								style={{paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, backgroundColor: '#FCDB00', color: '#FFFFFF', 
									borderRadius: 12, fontWeight: "bold", maxWidth: '70%', margin: 5, textAlign: "center",}}>
									{info.grade}°
								</p>
								<p className={clsx(classes.TextInfo)} 
								style={{paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, backgroundColor: '#FCDB00', color: '#FFFFFF', 
									borderRadius: 12, fontWeight: "bold", maxWidth: '70%', margin: 5, textAlign: "center",}}>
									{info.school_name}
								</p>
						</div>

					</div>
				</div>

				< div className="w-full h-full pt-28 mt-20 items-center justify-center flex-wrap flex-row flex">

					{/* -------------------------- Mis Tareas Section ------------------------- */}

					<div
						className={clsx(classes.container), "w-full  items-center justify-center flex md:w-1/3 sm:w-1/2 flex-col p-12"}
						style={{
							backgroundColor: '#783BC6',
							// opacity: 0.5
						}}>
						<img className={clsx(classes.img)} src="assets/images/preescolar/explorer.png" />

						<Typography className={clsx(classes.TextTitle)}>
							Mis Tareas
						</Typography>
						<div className="flex  flex-wrap p-12 relative overflow-hidden flex-row w-full">
							<div className="w-1/3 flex-col items-center justify-center flex" >
								<Badge badgeContent={pendientes ? pendientes.length : '0'} color="secondary" showZero>
									<Icon className={clsx(classes.yellowIcons)} >error_outline</Icon>
								</Badge>
								<Typography className={clsx(classes.Text)}>
									Pendientes
								</Typography>
							</div>

							<div className="w-1/3 flex-col items-center justify-center flex" >
								<Badge badgeContent={entregadas ? entregadas.length : '0'} color="secondary" showZero>
									<Icon className={clsx(classes.yellowIcons)} >check</Icon>
								</Badge>
								<Typography className={clsx(classes.Text)}>
									Realizadas
								</Typography>
							</div>

							<div className="w-1/3 flex-col items-center justify-center flex" >
								<Badge badgeContent={panelInfo ? panelInfo.score.length : '0'} color="secondary" showZero>
									<Icon className={clsx(classes.yellowIcons)} >star</Icon>
								</Badge>
								<Typography className={clsx(classes.Text)}>
									Calificadas
								</Typography>
							</div>
						</div>


						<div className="flex flex-wrap relative overflow-hidden flex-row w-full border-t-1"
							style={{ borderTopColor: "white" }}>

							<div className="w-1/6 flex-col items-center justify-center flex" >
								<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/explorer.png" />
							</div>
							<div className="w-5/6 flex-col flex-start justify-center flex" >
								<Typography className={clsx(classes.TextChannel)}>
									Canal Online Lia
								</Typography>
							</div>
						</div>

						<div className="flex flex-wrap relative overflow-hidden flex-row w-full border-t-1"
							style={{ borderTopColor: "white" }}>

							<div className="w-1/6 flex-col items-center justify-center flex" >
								<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/explorer.png" />
							</div>
							<div className="w-5/6 flex-col flex-start justify-center flex" >
								<Typography className={clsx(classes.TextChannel)}>
									LIA U
								</Typography>
							</div>
						</div>

						<div className="flex flex-wrap relative overflow-hidden flex-row w-full border-t-1"
							style={{ borderTopColor: "white" }}>

							<div className="w-1/6 flex-col items-center justify-center flex" >
								<img className={clsx(classes.channelIcon)} src="assets/images/preescolar/explorer.png" />
							</div>
							<div className="w-5/6 flex-col flex-start justify-center flex" >
								<Typography className={clsx(classes.TextChannel)}>
									Clases en vivo
								</Typography>
							</div>
						</div>





					</div>

					{/* -------------------------- Mis Clases Section ------------------------- */}


					<div
						className={clsx(classes.container), "w-full  items-center justify-center flex md:w-1/3 sm:w-1/2 flex-col p-12"}
						style={{
							backgroundColor: '#5406B4',
							// opacity: 0.5
						}}>
						<img className={clsx(classes.img)} src="assets/images/preescolar/artes.png" />

						<Typography className={clsx(classes.TextTitle)}>
							Mis Clases
						</Typography>
						




					</div>
					<div
						className={clsx(classes.container), "w-full  items-center justify-center flex md:w-1/3 sm:w-1/2 flex-col p-12 h-full"}
						style={{
							backgroundColor: '#783BC6',
							// opacity: 0.5
						}}>
						<img className={clsx(classes.img)} src="assets/images/preescolar/comunicacion.png" />

						<Typography className={clsx(classes.TextTitle)}>
							Mi Mundo Lia
						</Typography>

						<Avatar className={clsx(classes.avatar, 'avatar')}
							onClick={ev => dispatch(openAvatarLayout())}
							
								width="200"
								position="right"
								src={ user.data.photoURL && user.data.photoURL !== ''
								? user.data.photoURL
								: " assets/images/preescolar/infoestudiante.png"} >
						</Avatar>
						




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

					{/* <AvatarLayout /> */}

				</div>
			</FuseAnimateGroup>
		</div>
	);
}

export default withReducer('PreescolarApp', reducer)(MiScore);
