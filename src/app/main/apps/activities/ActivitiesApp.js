import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import reducer from './store';
import ActivitiesList from './ActivitiesList'
import { openNewActivityDialog, getActivities, getSubjects } from './store/activitiesSlice';
// import { getSubjects } from './store/subjectSlice';
import ActivityDialog from './ActivityDialog';
import DeliveryDialog from './DeliveryDialog';

const useStyles = makeStyles({
	addButton: {
		position: 'absolute',
		right: 12,
		bottom: 12,
		zIndex: 99
	},
	exportButton: {
		position: 'absolute',
		right: 80,
		bottom: 12,
		zIndex: 99
	}
});

function ActivitiesApp(props) {
	const dispatch = useDispatch();

	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const role = useSelector(({ auth }) => auth.user.role);

	useDeepCompareEffect(() => {
		dispatch(getActivities(role));
		dispatch(getSubjects());
	}, [dispatch, routeParams]);

	return (
		<>

			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 pb-80 sm:pb-80 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				content={ <ActivitiesList params={routeParams}/>}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			{ role == 'alumno' || role == 'alumno_secundaria' ||  role == 'preescolar' || role == 'alumnoe0' || role == 'alumnoe1' || role == 'alumnoe2' || role == 'alumnoe3' || role == 'Alumno-I' || role == 'Alumno-M' || role == 'Alumno-A' ?
				null
				:
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Fab
						color="primary"
						aria-label="add"
						className={classes.addButton}
						onClick={ev => dispatch(openNewActivityDialog())}
					>
						<Icon>assignment_add</Icon>
					</Fab>
				</FuseAnimate>
			}
			<ActivityDialog/>
			<DeliveryDialog/>
		</>
	);
}
export default withReducer('ActivitiesApp', reducer)(ActivitiesApp);
