import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Preescolar.css';
import { Link, useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import reducer from '../store';
import withReducer from 'app/store/withReducer';
import { useDeepCompareEffect } from '@fuse/hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { getMiTarea, submitUploadFile } from '../store/miTarea';
import Dialog from '@material-ui/core/Dialog';
import Formsy from "formsy-react";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

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
	LabelText: {
		fontSize: "26px",
		color: 'red',
	},
	LabelDue: {
		fontSize: "45px",
		color: 'red',
		textAlign: "center",
	},
	LabelDesc: {
		fontSize: "28px",
		color: 'white',
		textShadow: '4px 4px 4px #595959',
	},
	LabelScore: {
		fontSize: "80px",
		color: 'red',
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
	right: {
		// objectPosition: 'right',
		// display: 'flex',
		// flexDirection: "row-reverse"
		// maxHeight: '40px',
		justifyContent: "flex-end",
		alignItems: "flex-end",
		alignContent: "flex-end",
		textAlign: "right",
		alignSelf: 'flex-end',
		flexContainer: 'justify-end',
		paddingLeft: '70px',
		paddingRight: '70px',
	},
	userIcon: {
		// maxHeight: "50%",
		// maxWidth: "50%",
		display: 'flex',
		objectFit: 'cover',
		flexContainer: 'justify-end',
		justifyContent: "flex-end",
		alignItems: "flex-end",
		textAlign: "right",
		alignSelf: 'flex-end',
		alignContent: 'flex-end',
		paddingLeft: '100px'

	},
	infoCardsColumn: {
		paddingTop: 12, paddingBottom: 12, paddingLeft: 5, paddingRight: 5, backgroundColor: '#ECA800', color: '#FFFFFF',
		borderRadius: 15, fontWeight: "bold", width: 'full', height: 'full', textAlign: "center", flex: 1, borderColor: '#FFD90A', borderWidth: 6,


	},

}));

function MiTarea(props) {

	const dispatch = useDispatch();
	const classes = useStyles();
	const routeParams = useParams();

	const [fileName, setFileName] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);
	const [fileType, setFileType] = useState('file');
	const fileInput = useRef(null);
	
	const role = useSelector(({ auth }) => auth.user.role);
	const info = useSelector(({ auth }) => auth.user);
	const escuelabaja = role == 'alumno' && info.grade <= 3 ? true : false;
	const homework = useSelector(({ MiTareaApp }) => MiTareaApp.miTarea.data);

	useDeepCompareEffect(() => {
		dispatch(getMiTarea(routeParams));
	}, [dispatch, routeParams]);

	function handleSubmit() {
        dispatch(submitUploadFile(routeParams, homework, selectedFile, fileType));
		setSelectedFile(null)
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
							to={`/apps/sections/mistareas`}
							component={Link}
							type="button"
						>
							<img className={clsx(classes.img)} src="assets/images/preescolar/explorer.png" />
							<Typography className={clsx(classes.TextTitle)}>
								Mis Tareas
							</Typography>
						</Button>
					</div>


					{/* ------------------------- Avatar and User Info --------------------- */}
					<div className="flex w-full md:w-1/2 items-center justify-center flex-wrap flex-row">

						<div className={clsx(classes.right), "w-1/3 justify-end logo text-end items-end justify-end"} >
							<img className={clsx(classes.userIcon)}
								width="200"
								position="right"
								src="assets/images/preescolar/infoestudiante.png" />
						</div>
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
				</div>
				{
					homework ?

						<Grid container className="flex items-center justify-center flex-row pt-28 pb-28 m-20 pr-40 pl-40" spacing={0}>
							<Grid item xs className="flex items-center justify-center flex-col max-w-400 m-20 mb-40">
								{/* -------------------------- tasks undelivered ------------------------- */}
								<Paper
									className={clsx(classes.container), "rounded-8 items-center justify-center flex w-full flex-col mb-20"}
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
											Materia
										</Typography>
									</div>
									{/* ----------------------------Info inside card-------------------------- */}
									<div
										className="flex items-center justify-center w-full"
										style={{
											height: 110,
											paddingLeft: 45,
											paddingRight: 45,
										}}
									>
										<div
											className="w-full"
											style={{
												backgroundColor: '#FFFFFF',
												paddingLeft: 5,
												paddingRight: 5,
												paddingTop: 2,
												paddingBottom: 2,
												borderRadius: 30,
												textAlign: "center",
											}}
										>
											<Typography className={clsx(classes.LabelText)}>
												{homework.custom_name}
											</Typography>
										</div>
									</div>
								</Paper>
								<Paper
									className={clsx(classes.container), "rounded-8 items-center justify-center flex w-full flex-col"}
									elevation={3}

									style={{
										backgroundImage: `url("assets/images/preescolar/Back-tareas.png")`,
										backgroundPosition: 'center',
										backgroundSize: 'cover',
										backgroundRepeat: 'no-repeat',

									}}>
									{/* ----------------------------Info inside card-------------------------- */}
									<div
										className="flex flex-col items-center w-full"
										style={{
											height: 300,
											paddingTop: 10,
											paddingLeft: 40,
											paddingRight: 40,
										}}
									>
										<Typography className={clsx(classes.LabelDesc)}>
											Descripción
										</Typography>

										{
											homework.instructions ?
												<div
													className="w-full"
													style={{
														marginTop: 20,
														height: 200,
														overflowY: 'scroll',
														color: 'white',
														backgroundColor: 'rgba(0, 0, 0, .1)',
														padding: 10,
														fontSize: 20,
													}}
												>
													{homework.instructions}
												</div>
												:
												<div className="flex items-center justify-center h-200 text-center">
													<Typography className={clsx(classes.TextInfo)}>
														No hay instrucciones
													</Typography>
												</div>
										}
									</div>
								</Paper>
							</Grid>
							{/* -------------------------- tasks delivered ------------------------- */}
							<Grid item xs className="flex items-center justify-center flex-col max-w-400 m-20 mb-40">
								<Paper
									className={clsx(classes.container), "rounded-8 items-center justify-center flex w-full flex-col mb-20"}
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
											Vencimiento
										</Typography>
									</div>
									{/* ----------------------------Info inside card-------------------------- */}
									<div
										className="flex items-center justify-center w-full"
										style={{
											height: 110,
											paddingLeft: 45,
											paddingRight: 45,
										}}
									>

										<div
											className="flex items-center flex-col"
											style={{
												backgroundColor: '#FFFFFF',
												height: 90,
												width: 95,
												borderRadius: 5,
												position: 'relative',
											}}
										>

											<div
												className="w-full"
												style={{
													backgroundColor: 'red',
													height: 25,
													borderTopLeftRadius: 5,
													borderTopRightRadius: 5,
												}}
											>
											</div>
											<div
												style={{
													position: 'absolute',
													width: 60,
													height: 15,
													border: '3px solid #999',
													borderWidth: '0 5px',
													background: 'transparent',
													top: '-6px',
												}}>

											</div>
											<Typography className={clsx(classes.LabelDue)}>
												{new Date(homework.finish_date).getDate()}
											</Typography>
										</div>
									</div>
								</Paper>
								<Paper
									className={clsx(classes.container), "rounded-8 items-center justify-center flex w-full flex-col"}
									elevation={3}

									style={{
										backgroundImage: `url("assets/images/preescolar/Back-tareas.png")`,
										backgroundPosition: 'center',
										backgroundSize: 'cover',
										backgroundRepeat: 'no-repeat',

									}}>
									{/* ----------------------------Info inside card-------------------------- */}
									{
										homework.status == 'Calificado' ?
											<div 
												className="flex items-center justify-center text-center"
												style={{
													height: 300,
												}}
											>
												<Typography className={clsx(classes.TextInfo)}>
													La tarea ya fue calificada
												</Typography>
											</div>
											:

											<div
												className="flex flex-col items-center w-full"
												style={{
													height: 300,
													paddingLeft: 45,
													paddingRight: 45,
												}}
											>
												<Formsy
													onValidSubmit={handleSubmit}
													// onChange={validateForm}
													// onValid={enableButton}
													// onInvalid={disableButton}
													// ref={formRef}
													className="flex flex-col w-full items-center mt-40"
												>
													<DialogContent className="w-full items-center">
														<Button
															className="w-full"
															style={{
																backgroundColor: '#FFFFFF',
																paddingLeft: 5,
																paddingRight: 5,
																paddingTop: 2,
																paddingBottom: 2,
																borderRadius: 30,
																textAlign: "center",
															}}
															onClick={e => fileInput.current && fileInput.current.click()}
														>
															<Typography className={clsx(classes.LabelText)}>
																Adjuntar
															</Typography>
														</Button>
														<input
															type="file"
															name="file"
															id="file"
															onChange={(e) => {
																setFileName(e.target.files[0].name);
																setSelectedFile(e.target.files[0]);
															}}
															// onChange={handleChange}
															ref={fileInput}
															hidden
														/>
													</DialogContent>
													<Typography
														className={clsx(classes.TextInfo)}
														style={{
															width: '100%',
															overflowX: 'auto',
															whiteSpace: 'nowrap',
															height: 50,
															padding: 5,
														}}
													>
														{fileName == '' ? homework.file_path ? homework.file_path.slice(homework.file_path.indexOf('_')+1) : fileName : fileName}
													</Typography>
													<DialogActions className="w-full mt-20">
														<Button
															className="w-full"
															style={{
																backgroundColor: '#FFFFFF',
																paddingLeft: 5,
																paddingRight: 5,
																paddingTop: 2,
																paddingBottom: 2,
																borderRadius: 30,
																textAlign: "center",
															}}
															uppercase='false'
															// onClick={handleSubmit}
															type="submit"
															disabled={!selectedFile}
														>
															<Typography className={clsx(classes.LabelText)}>
																Enviar
															</Typography>
														</Button>
													</DialogActions>
												</Formsy>
											</div>
									}

								</Paper>
							</Grid>
							{/* -------------------------- tasks delivered ------------------------- */}
							<Grid item xs className="flex items-center justify-center flex-col max-w-400 m-20 mb-40">
								<Paper
									className={clsx(classes.container), "rounded-8 items-center justify-center flex w-full flex-col mb-20"}
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
											Mis Tareas
										</Typography>
									</div>
									<div
										className="flex items-center justify-center w-full"
										style={{
											height: 110,
											paddingLeft: 45,
											paddingRight: 45,
										}}
									>
										<div
											className="w-full"
											style={{
												backgroundColor: '#FFFFFF',
												paddingLeft: 5,
												paddingRight: 5,
												paddingTop: 2,
												paddingBottom: 2,
												borderRadius: 30,
												textAlign: "center",
											}}
										>
											<Typography className={clsx(classes.LabelText)}>
												{homework.status}
											</Typography>
										</div>
									</div>
									{/* ----------------------------Info inside card-------------------------- */}

								</Paper>
								<Paper
									className={clsx(classes.container), "rounded-8 items-center justify-center flex w-full flex-col"}
									elevation={3}

									style={{
										backgroundImage: `url("assets/images/preescolar/Back-tareas.png")`,
										backgroundPosition: 'center',
										backgroundSize: 'cover',
										backgroundRepeat: 'no-repeat',

									}}>
									{/* ----------------------------Info inside card-------------------------- */}
									<div
										className="flex items-center w-full flex-col"
										style={{
											height: 300,
											paddingTop: 10,
											paddingLeft: 45,
											paddingRight: 45,
										}}
									>
										<Typography className={clsx(classes.LabelDesc)}>
											Calificación
										</Typography>
										{
											homework.status == 'Calificado' ?
												<div
													style={{
														marginTop: 40,
														backgroundColor: '#FFFFFF',
														paddingLeft: 25,
														paddingRight: 25,
														borderRadius: 10,
													}}
												>
													<Typography className={clsx(classes.LabelScore)}>
														{homework.score.slice(homework.score.indexOf('.')) == '.00' ? homework.score.slice(0, homework.score.indexOf('.')) : homework.score}
													</Typography>
												</div>
												:
												<div className="flex items-center justify-center h-200 text-center">
													<Typography className={clsx(classes.TextInfo)}>
														No se ha calificado la tarea
													</Typography>
												</div>
										}
									</div>
								</Paper>
							</Grid>
						</Grid>
						:
						null
				}
			</FuseAnimateGroup>
		</div>
	);
}

export default withReducer('MiTareaApp', reducer)(MiTarea);
