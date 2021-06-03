import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useRef,useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import reducer from './store';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import {submitFileClassroom,getFileClassroom,getMeetingId,downloadFile} from './store/aulaSlice.js';
import { Typography } from '@material-ui/core';
import FuseLoading from '@fuse/core/FuseLoading';
import {showMessage} from "../../../store/fuse/messageSlice";
import clsx from 'clsx';


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
	},
    imgBackgroundStyle: {
        backgroundImage: "url(assets/images/backgrounds/background-space.png)",backgroundSize:"cover",position:"relative",height:"80%",backgroundSize:"cover",
        width: '100%',
        height: '100%',
    },
    containerStyle: {
        width: '100%',
        height: '100%',
    },
    rightContainerStyle: {
        overflowY:"scroll",
        width: '100%',
        height: '100%',
    },
    jitsiContainerOpen: {
        display: 'block',
        width: '100%',
        height: '100%',
    },
    divFiles: {}
});

function AulaVirtualApp(props) {
	const dispatch = useDispatch();

	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const [openMeeting, setOpenMeeting] = useState(false);
	const [meetingId, setMeetingId] = useState("ClubLIAMeet-502-raul");

	const user = useSelector(({ auth }) => auth.user.data);
	const role = user.role;
	const aula = useSelector(({ AulaVirtualApp }) => AulaVirtualApp.aulaVirtual.filesAula);
	const meetingIdVal = useSelector(({ AulaVirtualApp }) => AulaVirtualApp.aulaVirtual.meetingAula);

    useEffect(() => {
        if(meetingIdVal.success){
            setMeetingId(meetingIdVal.response.meeting_id);
			// dispatch(showMessage({message:'get data',variant: 'success'}));
		}
    }, [aula.error,aula.success]);

	useDeepCompareEffect(() => {
        dispatch(getMeetingId());
    }, [dispatch, routeParams]);
    
	function createJitsiMeet(){
        try {
            dispatch(getFileClassroom(meetingIdVal.response.meeting_id));
			const domain = 'meet.jit.si';
			const options = {
			 roomName: meetingIdVal.response.meeting_id,
             parentNode: document.getElementById('jitsi-container'),
             userInfo: {
                email: user.email,
                displayName: user.username
            },
			 interfaceConfigOverwrite: {
			  filmStripOnly: false,
			  SHOW_JITSI_WATERMARK: false,
			 },
			 configOverwrite: {
			  disableSimulcast: false,
			 },
			};
		 
			const api = new window.JitsiMeetExternalAPI(domain, options);
			api.addEventListener('videoConferenceJoined', () => {
             setOpenMeeting(true);
			//  api.executeCommand('displayName', user.username);
			});
		   } catch (error) {
			console.error('Failed to load Jitsi API', error);
		   }
	}

    function uploadFile(file){
        dispatch(submitFileClassroom(file, meetingId));
        dispatch(getFileClassroom(meetingId));
    }

	return (
		<>

			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				content={ 
                    <div className={classes.imgBackgroundStyle}>
                        <Grid container direction="row" className={classes.containerStyle}>
                            <Grid item xs={9} className={classes.containerStyle}>
                                <div id="jitsi-container" className={classes.jitsiContainerOpen}/>
                            </Grid>
                            <Grid item xs={3} className={classes.rightContainerStyle}>
                                <div className={clsx(classes.divFiles,'flex flex-col')}>    
                                {openMeeting !== false && aula.response &&
                                <>
                                {aula.response.map(file => {
                                    return(
                                        <>
                                            <IconButton
                                                onClick={ev => {
                                                    ev.stopPropagation();
                                                    dispatch(downloadFile(file.replace('public','')));
                                                }}>

                                                <Typography
                                                    className="text-center text-13 font-600 mt-4">
                                                    {file.slice(file.indexOf('_')+1)}
                                                </Typography>

                                                <Icon className="text-center text-13 font-600 mt-4 ml-4">save_alt</Icon>
                                            </IconButton>  
                                        </>
                                    )})} 
                                    <input
                                        fullWidth
                                        style={{alignSelf:"center",marginTop:"10%"}}
                                        className="mb-16"
                                        type="file"
                                        name="file"
                                        id="file"
                                        onChange={(e) => uploadFile(e.target.files[0])}
                                        variant="outlined"
                                    /> 
                                </>
                                } 
                                </div>
                            </Grid>
                        </Grid>
                         
                        {openMeeting === false &&
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Fab
                                color="primary"
                                aria-label="add"
                                className={classes.addButton}
                                onClick={() => {setOpenMeeting('pending');createJitsiMeet()}}>
                                <Icon>meeting_room</Icon>
                            </Fab>
                        </FuseAnimate>}
                    </div>
                }
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
		</>
	);
}
export default withReducer('AulaVirtualApp', reducer)(AulaVirtualApp);
