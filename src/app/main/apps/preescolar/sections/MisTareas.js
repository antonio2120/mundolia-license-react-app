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
		marginTop: "-40px",
		paddingTop: "20px",
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
		maxHeight: 390,
		height: 390,
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

}));

function MisTareas(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const routeParams = useParams();
	const role = useSelector(({ auth }) => auth.user.role);
	const pendientes = useSelector(({ PreescolarApp }) => PreescolarApp.tareasPendientes.data);
	const entregadas = useSelector(({ PreescolarApp }) => PreescolarApp.tareasEntregadas.data);
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
			className="flex-1"
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

				<div className="float flex w-full flex-wrap ">
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
								{escuelabaja ? 'Mis Tareas' : 'Mis Actividades'}
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

				< div className="w-full pt-28 pb-28 m-20 pr-40 pl-40 items-center justify-center flex-wrap flex-row flex">

					{/* -------------------------- tasks undelivered ------------------------- */}

					<Paper
						className={clsx(classes.container), "w-full max-w-400 rounded-8 items-center justify-center flex w-full md:w-1/3 sm:w-1/2 flex-col m-20"}
						elevation={3}
						
						style={{
							backgroundImage: `url("assets/images/preescolar/Back-tareas.png")`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							
						}}>

						<div className={clsx(classes.paperTitle)}
							style={{
								backgroundImage: `url("assets/images/preescolar/tituloback.png")`,
								backgroundPosition: 'center',
								backgroundSize: 'contain',
								backgroundRepeat: 'no-repeat',
							}}
						>
							<Typography className={clsx(classes.Text)}>
								{ escuelabaja ? 'Tareas Pendientes' : 'Actividades Pendientes' }
							</Typography>
						</div>
						{/* ----------------------------Info inside card-------------------------- */}
						<List className={classes.scroll} >
							<div className="flex flex-row flex-wrap p-8 relative overflow-hidden">
								{console.log(pendientes)}
								{pendientes &&
									pendientes.map(row => (
										<>
											<div className="flex w-1/5 p-12 text-center items-center justify-center">
												<Link to={'/apps/sections/mitarea/'+row.id} ><img src="assets/images/preescolar/pendientes.png"/></Link>
											</div>

											{ escuelabaja ? 
												<>
													<div className=" flex w-2/5 p-12 text-center items-center justify-center"
														style={{
															backgroundImage: `url("assets/images/preescolar/fecha.png")`,
															backgroundPosition: 'center',
															backgroundSize: 'contain',
															backgroundRepeat: 'no-repeat',
														}}
													>
														<Typography className={clsx(classes.TextInfo)}>
															{row.name}
														</Typography>
													</div>
													<div className=" flex w-2/5 p-12 text-center items-center justify-center"
														style={{
															backgroundImage: `url("assets/images/preescolar/fecha.png")`,
															backgroundPosition: 'center',
															backgroundSize: 'contain',
															backgroundRepeat: 'no-repeat',
														}}
													>
														<Typography className={clsx(classes.TextInfo)}>
															{row.finish_date.slice(0, 10)}
														</Typography>
													</div>
												</>
													:
												
												<div className=" flex w-4/5 p-4 text-center items-center justify-center">
													<p className={clsx(classes.infoCardsColumn)} >
														<Typography className={clsx(classes.TextInfo)}>
														{row.name}
													</Typography>
													</p>
												</div>
											}


										</>
									))
								}
							</div>
							{ pendientes && pendientes.length > 0  ?
								null 
								:
								<div className="flex flex-1 items-center justify-center h-full">
									<Typography className={clsx(classes.TextInfo)}>
										{ escuelabaja ? 'No hay tareas que mostrar!' : 'No hay actividades que mostrar!' }
									</Typography>
								</div>								
							}
						</List>
					</Paper>

					{/* -------------------------- tasks delivered ------------------------- */}

					<Paper
						className={clsx(classes.container), "w-full max-w-400 rounded-8 items-center justify-center flex w-full md:w-1/3 sm:w-1/2 flex-col m-20"}
						elevation={3}
						
						style={{
							backgroundImage: `url("assets/images/preescolar/Back-tareas.png")`,
							backgroundPosition: 'center',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							
						}}>

						<div className={clsx(classes.paperTitle)}
							style={{
								backgroundImage: `url("assets/images/preescolar/tituloback.png")`,
								backgroundPosition: 'center',
								backgroundSize: 'contain',
								backgroundRepeat: 'no-repeat',
							}}
						>
							<Typography className={clsx(classes.Text)}>
								{ escuelabaja ? 'Tareas Entregadas' : 'Actividades Entregadas' }
							</Typography>
						</div>
						{/* ----------------------------Info inside card-------------------------- */}
						<List className={classes.scroll} >
							<div className="flex flex-row flex-wrap p-8 relative overflow-hidden">
								{entregadas &&
									entregadas.map(row => (
										<>
											<div className="flex w-1/5 p-12 text-center items-center justify-center">
											<Link to={'/apps/sections/mitarea/'+row.id} ><img src="assets/images/preescolar/entregado.png"/></Link>
											</div>
											{ escuelabaja ?
											<>
												<div className=" flex w-2/5 p-12 text-center items-center justify-center"
													style={{
														backgroundImage: `url("assets/images/preescolar/fecha.png")`,
														backgroundPosition: 'center',
														backgroundSize: 'contain',
														backgroundRepeat: 'no-repeat',
													}}
												>
													<Typography className={clsx(classes.TextInfo)}>
														{row.name}
													</Typography>
												</div>
												<div className=" flex w-2/5 p-12 text-center items-center justify-center"
													style={{
														backgroundImage: `url("assets/images/preescolar/fecha.png")`,
														backgroundPosition: 'center',
														backgroundSize: 'contain',
														backgroundRepeat: 'no-repeat',
													}}
												>
													<Typography className={clsx(classes.TextInfo)}>
														Lista
													</Typography>
												</div>
											</>
											:
											<div className=" flex w-4/5 p-4 text-center items-center justify-center">
													<p className={clsx(classes.infoCardsColumn)} >
														<Typography className={clsx(classes.TextInfo)}>
														{row.name}
														</Typography>
													</p>
												</div>
												
											}
										</>
									))
								}
							</div>
							{entregadas && entregadas.length > 0 ?
								null
								:
								<div className="flex flex-1 items-center justify-center h-full">
									<Typography className={clsx(classes.TextInfo)}>
										{ escuelabaja ? 'No hay tareas que mostrar!' : 'No hay actividades que mostrar!' }
									</Typography>
								</div>
							}
						</List>
					</Paper>

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

				</div>
			</FuseAnimateGroup>
		</div>
	);
}

export default withReducer('PreescolarApp', reducer)(MisTareas);
