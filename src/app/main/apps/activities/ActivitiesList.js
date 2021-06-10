import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
// import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
// import InputLabel from '@material-ui/core/InputLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
// import MenuItem from '@material-ui/core/MenuItem';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import Select from '@material-ui/core/Select';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import reducer from './store';
import { getCategories, selectCategories } from './store/categoriesSlice';
// import { getCourses, selectCourses } from './store/coursesSlice';
import { getGroups } from './store/groupSlice';
import { getActivities, selectActivities, downloadActivity } from './store/activitiesSlice';
// import { getSubjects } from './store/subjectSlice';
import { openEditActivityDialog } from './store/activitiesSlice'
import { openUpdateDeliveryDialog } from './store/deliverySlice';
// import {blue} from "@material-ui/core/colors";
import IconButton from '@material-ui/core/IconButton';
import {showMessage} from "../../../store/fuse/messageSlice";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import {useDeepCompareEffect, useForm} from "../../../../@fuse/hooks";
import ActivitySidebarContent from './ActivitySideBarContent';
import {setActivitiesFilter} from './store/filterSlice';
import Tooltip from '@material-ui/core/Tooltip';


const useStyles = makeStyles(theme => ({
	header: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.getContrastText(theme.palette.primary.main)
	},
	headerIcon: {
		position: 'absolute',
		top: -64,
		left: 0,
		opacity: 0.04,
		fontSize: 512,
		width: 512,
		height: 512,
		pointerEvents: 'none'
	}
}));

const defaultFormState = {
	group_name: '',
};

const LightTooltip = withStyles((theme) => ({
	tooltip: {
	  backgroundColor: theme.palette.common.white,
	  color: 'rgba(0, 0, 0, 0.87)',
	  boxShadow: theme.shadows[1],
	  fontSize: 16,
	},
  }))(Tooltip);

function ActivitiesList(props) {
	const dispatch = useDispatch();
	// const courses = useSelector(selectCourses);
	const categories = useSelector(selectCategories);
	const activities = useSelector(selectActivities);
	// const activities = useSelector(({ ActivitiesApp }) => ActivitiesApp.activities.entities);
	const role = useSelector(({ auth }) => auth.user.role);

	const classes = useStyles(props);
	const theme = useTheme();
	const [filteredData, setFilteredData] = useState(null);
	const [searchText, setSearchText] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');

	useEffect(() => {
		dispatch(getCategories());
		// dispatch(getCourses());
		dispatch(getActivities(role));
		dispatch(getGroups());
	}, [dispatch]);

	useEffect(() => {
		function getFilteredArray() {
			if (searchText.length === 0 && selectedCategory === 'all') {
				return activities;
			}

			return _.filter(activities, item => {
				if (selectedCategory !== 'all' && item.category !== selectedCategory) {
					return false;
				}
				return item.title.toLowerCase().includes(searchText.toLowerCase());
			});
		}

		if (activities) {
			setFilteredData(getFilteredArray());
		}
	}, [activities, searchText, selectedCategory]);

	function handleSelectedCategory(event) {
		setSelectedCategory(event.target.value);
	}

	function handleSearchText(event) {
		setSearchText(event.target.value);
	}

	function buttonStatus(course) {
		switch (course.activeStep) {
			case course.totalSteps:
				return 'COMPLETED';
			case 0:
				return 'START';
			default:
				return 'CONTINUE';
		}
	}

	return (
		<div className="flex flex-col flex-auto flex-shrink-0 w-full">
			<div
				className={clsx(
					classes.header,
					'relative overflow-hidden flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-288'
				)}
				style={{
					backgroundImage: `url("assets/images/login/tareas.png")`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat'
				}}
			>
				{/* <FuseAnimate duration={400} delay={600}>
					<Typography variant="subtitle1" color="inherit" className="mt-8 sm:mt-16 mx-auto max-w-512">
						<span className="opacity-75">
							Our courses will step you through the process of building a small application, or adding a
							new feature to an existing application.
						</span>
					</Typography>
				</FuseAnimate> */}
				<Icon className={classes.headerIcon}> school </Icon>
			</div>
			<div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
				<div className=" flex-row-reverse">
					<ActivitySidebarContent/>
				</div>

				{useMemo(
					() =>
						filteredData &&
						(filteredData.length > 0 ? (
							<FuseAnimateGroup
								enter={{
									animation: 'transition.slideUpBigIn'
								}}
								className="flex flex-wrap py-24"
							>
								{filteredData.map(course => {
									const category = activities.find(_cat => _cat.value === course.category);
									return (
										<div className="w-full pb-24 sm:w-1 lg:w-1/2 sm:p-16" key={course.id}>
											<Card elevation={1} className="flex flex-col h-500 rounded-8">
												<div
													className="flex flex-shrink-0 items-center justify-between px-24 h-84"
													style={{
														// background: category.color,
														// color: theme.palette.getContrastText(category.color)
														background: (course.is_active == 1 ? '#4BB543' : '#2196f3'),
														color: theme.palette.getContrastText("#2196f3")
														// color: "#2196f3",
													}}
												>
													<div className="flex-direction: column, items-center ">
														<LightTooltip title={course.name} placement="top">
															<Typography className="text-xl font-semibold truncate py-1" color="inherit">
																Tarea: {course.name.length > 18 ? course.name.slice(0, 18) + '...' : course.name}
															</Typography>
														</LightTooltip>
														<Typography className="font-medium truncate" color="inherit">
															Grupo: {course.group_name.length > 20 ? course.group_name.slice(0,20)+'...' : course.group_name}
														</Typography>
														<LightTooltip title={course.teachers_name} placement="top">
															<Typography className="font-medium truncate" color="inherit">
																Maestro: {course.teachers_name.length > 22 ? course.teachers_name.slice(0,22)+'...' : course.teachers_name}
															</Typography>
														</LightTooltip>
													</div>
													<div className="flex-direction: column, items-center justify-center opacity-75">
														<div className="text-16 whitespace-no-wrap text-right">
															{course.is_active == 1 ? 'Activa' : 'Inactiva'}
														</div>
														<div className="text-16 whitespace-no-wrap text-right">
															{course.status}{course.status == 'Calificado' ? ': ' + course.score : null}
														</div>
														<div className="text-16 whitespace-no-wrap text-right">
															{course.status == 'Calificado' ? course.scored_date : null}
														</div>
														<div className="text-16 whitespace-no-wrap text-right">
															Materia: {course.custom_name}
														</div>
														{/* <Icon className="text-20 mx-8" color="inherit">
															access_time
														</Icon> */}
													</div>
												</div>		
												<CardContent className="flex flex-col flex-auto items-center justify-center">
													<Typography
														className="text-center text-13 font-600 mt-4"
														color="textSecondary"
													>
														{course.instructions ? course.instructions : 'Sin Instrucciones'}
													</Typography>

													<Typography
														className="text-center text-13 font-600 mt-4 fixed-bottom"
														color="textSecondary"
													>
														Se entrega el: {course.finish_date}
													</Typography>

													{course.file && (role == 'alumno' || role == 'alumno_secundaria' ||  role == 'preescolar' || role == 'alumnoe0' || role == 'alumnoe1' || role == 'alumnoe2' || role == 'alumnoe3' || role == 'Alumno-I' || role == 'Alumno-M' || role == 'Alumno-A') ?
														<IconButton
															onClick={ev => {
																ev.stopPropagation();
																dispatch(downloadActivity(course.file));
															}}
														>

															<Typography
																className="text-center text-13 font-600 mt-4"
															>
																Descargar Archivo
															</Typography>


															<Icon className="text-center text-13 font-600 mt-4 ml-4">save_alt</Icon>
														</IconButton>
														:
														course.url && (role == 'alumno' || role == 'alumno_secundaria' ||  role == 'preescolar' || role == 'alumnoe0' || role == 'alumnoe1' || role == 'alumnoe2' || role == 'alumnoe3' || role == 'Alumno-I' || role == 'Alumno-M' || role == 'Alumno-A') ?
															<IconButton
																onClick={ev => {
																	ev.stopPropagation();
																	navigator.clipboard.writeText(course.url);
																	dispatch(showMessage({ message: 'Enlace copiado' }));
																}}
															>

																<Typography
																	className="text-center text-13 font-600 mt-4"
																>
																	Copiar Enlace
																</Typography>

																<Icon className="text-center text-13 font-600 mt-4 ml-4">link</Icon>
															</IconButton>
															:
															null
													}
												</CardContent>
												<Divider />
												{role == 'maestro' || role == 'maestro_preescolar' || role == 'maestro_secundaria' || role == 'profesor_summit_2021' || role == 'maestroe1' || role == 'maestroe2' || role == 'maestroe3' || role == 'Maestro-I' || role == 'Maestro-M' || role == 'Maestro-A' ?
													<CardActions className="justify-center">
														<Button
															to={`/apps/tareas/${course.id}/${course.name}`}
															component={Link}
															className="justify-start px-32"
															color="secondary"
														>
															{/* {buttonStatus(course)} */}
														Ver
													</Button>
														<Button
															onClick={ev => dispatch(openEditActivityDialog(course))}
															component={Link}
															className="justify-start px-32"
															color="secondary"
														>
															{/* {buttonStatus(course)} */}
														Editar
													</Button>
													</CardActions>
													// {/* <LinearProgress
													// 	className="w-full"
													// 	variant="determinate"
													// 	value={{course.is_active == 1 ? "100%""  : "50%" }
													// 	color="secondary"
													// /> */}
													:
													<CardActions className="justify-center">
														<Button
															onClick={ev => dispatch(openUpdateDeliveryDialog(course))}
															component={Link}
															className="justify-start px-32"
															color="secondary"
														>
															{/* {buttonStatus(course)} */}
														Entregar Tarea
													</Button>
													</CardActions>
												}
											</Card>
										</div>
									);
								})}
							</FuseAnimateGroup>
						) : (
							<div className="flex flex-1 items-center justify-center">
								<Typography color="textSecondary" className="text-24 my-24">
									No se encontraron tareas!
								</Typography>
							</div>
						)),
					[categories, filteredData, theme.palette]
				)}
			</div>
		</div>
	);
}

export default withReducer('ActivitiesApp', reducer)(ActivitiesList);
