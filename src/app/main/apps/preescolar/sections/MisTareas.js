import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Preescolar.css';
import { Link, useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import reducer from '../store';
import withReducer from 'app/store/withReducer';
import { getTareasPendientes } from '../store/tareasPendientesSlice';
import { getTareasEntregadas } from '../store/tareasEntregadasSlice';
import { useDeepCompareEffect } from '@fuse/hooks';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
	TextTitle: {
		fontWeight: "bold",
		fontSize: "32px",
		color: 'white',
		textShadow: '2px 2px 2px black',
	},
	Text: {
		fontSize: "22px",
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
		marginTop: "-50px",
		paddingTop: "20px",
		// height: "90px",
		
		justifyContent: "center",
		alignItems: "center",
		text: "center",
		textAlign: "center", //*important
	},
	paperTitle: {
		marginTop: "-50px",
		paddingTop: "20px",
		height: "70px",
		width: "280px",
		textAlign: "center", //*important
	},
	scroll: {
		width: '100%',
		position: 'relative',
		overflow: 'auto',
		maxHeight: 380,
		height: 380,
		border: 1
	},

}));

function MisTareas(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const routeParams = useParams();
	const role = useSelector(({ auth }) => auth.user.role);
	const pendientes = useSelector(({ MisTareasApp }) => MisTareasApp.tareasPendientes.data);
	const entregadas = useSelector(({ MisTareasApp }) => MisTareasApp.tareasEntregadas.data);



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

				<div className="float flex sm:w-1">
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
							Mis Actividades
						</Typography>
					</Button>
				</div>

				< div className="w-full pt-28 pb-28 m-20 pr-40 pl-40 items-center justify-center flex-wrap flex-row flex ">

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
								Mis tareas Pendientes
								</Typography>
						</div>
						{/* ----------------------------Info inside card-------------------------- */}
						<List className={classes.scroll} >
							<div className="flex flex-row flex-wrap p-8 relative overflow-hidden">
								{pendientes &&
									pendientes.map(row => (
										<>
											<div className="flex w-1/5 p-12 text-center items-center justify-center">
												<img src="assets/images/preescolar/pendientes.png"/>
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
									))
								}
							</div>
								{entregadas ? 
									<div className="flex flex-1 items-center justify-center h-full">
										<Typography className={clsx(classes.TextInfo)}>
											No hay registros que mostrar!
										</Typography>
									</div>
									: 
									<div className="flex flex-1 items-center justify-center h-full">
										<CircularProgress color="secondary" />
									</div>
								}
						</List>
					</Paper>

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
								Mis tareas Entregadas
								</Typography>
						</div>
						{/* ----------------------------Info inside card-------------------------- */}
						<List className={classes.scroll} >
							<div className="flex flex-row flex-wrap p-8 relative overflow-hidden">
								{entregadas &&
									entregadas.map(row => (
										<>
											<div className="flex w-1/5 p-12 text-center items-center justify-center">
												<img src="assets/images/preescolar/entregado.png"/>
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
									))
								}
							</div>
							{entregadas ? 
									<div className="flex flex-1 items-center justify-center h-full">
										<Typography className={clsx(classes.TextInfo)}>
											No hay registros que mostrar!
										</Typography>
									</div>
									: 
									<div className="flex flex-1 items-center justify-center h-full">
										<CircularProgress color="secondary" />
									</div>
								}
						</List>
					</Paper>

				</div>
			</FuseAnimateGroup>
		</div>
	);
}

export default withReducer('MisTareasApp', reducer)(MisTareas);
