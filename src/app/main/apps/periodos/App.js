import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
// import AppDialog from './AppDialog';
// import Header from './Header';
// import List from './List';
// import Download from './Download';
import reducer from './store';
import { /*openNewDialog,*/ getRecords } from './store/Slice';
import { getUserData } from './store/userSlice';
import {getSchoolsData} from "./store/schoolsSlice";
import {getRolesData} from "./store/rolesSlice";

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

function App(props) {
	const dispatch = useDispatch();

	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		 dispatch(getRecords(routeParams));
		// dispatch(getUserData());
		// dispatch(getSchoolsData());
		// dispatch(getRolesData());
	}, [dispatch, routeParams]);

	return (
		<>

			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 sm:p-24 pb-80 sm:pb-80 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				// header={<Header pageLayout={pageLayout} />}
				// content={<List />}
				// leftSidebarContent={<ContactsSidebarContent />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<FuseAnimate animation="transition.expandIn" delay={300}>

				<Fab
					color="primary"
					aria-label="add"
					className={classes.exportButton}
					//onClick={downloadContacts}
				>
					{/*<Download />*/}
				</Fab>
			</FuseAnimate>
			<FuseAnimate animation="transition.expandIn" delay={300}>
				<Fab
					color="primary"
					aria-label="add"
					className={classes.addButton}
					// onClick={ev => dispatch(openNewDialog())}
				>
					<Icon>queue</Icon>
				</Fab>
			</FuseAnimate>
			{/*<AppDialog />*/}
		</>
	);
}

export default withReducer('periodosApp', reducer)(App);
