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
import Button from '@material-ui/core/Button';
import {submitFileClassroom,getFileClassroom,getMeetingId,getGroups,downloadFile} from './store/aulaSlice.js';
import { Typography } from '@material-ui/core';
import FuseLoading from '@fuse/core/FuseLoading';
import {showMessage} from "../../../store/fuse/messageSlice";
import clsx from 'clsx';
import {TextFieldFormsy} from "../../../../@fuse/core/formsy";
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from "formsy-react";


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
    fileNameStyle: {
        color:"#FFF",
        textShadow:"-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;"
    },
	groupButton:{
        backgroundColor:"#4883C0",
        color:"white",
        marginLeft:"5%"
    },
	groupTitle:{
        color:"white",
        margin:"5%"
    },
    groupDivButtons:{
        width:"100%"
    }
});

function AulaVirtualApp(props) {
	const dispatch = useDispatch();

	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const [openMeeting, setOpenMeeting] = useState(false);
	const [openGroups, setOpenGroups] = useState(false);
	const [valueGroups, setValueGroups] = useState("");

	const user = useSelector(({ auth }) => auth.user.data);
	const role = user.role;
	const aula = useSelector(({ AulaVirtualApp }) => AulaVirtualApp.aulaVirtual.filesAula);
	const meetingIdVal = useSelector(({ AulaVirtualApp }) => AulaVirtualApp.aulaVirtual.meetingAula);
	const groupsTeacher = useSelector(({ AulaVirtualApp }) => AulaVirtualApp.aulaVirtual.groups);

    useEffect(() => {
        if(meetingIdVal.success){
            setOpenGroups(false);
            createJitsiMeet();
            dispatch(getFileClassroom(meetingIdVal.response.meeting_id));
            setOpenMeeting(true);
		}
    }, [meetingIdVal]);
     
    useEffect(() => {
        if(groupsTeacher.success){
            setOpenGroups(true);
            setValueGroups(groupsTeacher.response);
        }
    }, [groupsTeacher.success,groupsTeacher.error]);

	useDeepCompareEffect(() => {
        setOpenMeeting(false);
        dispatch(getGroups());
    }, [dispatch, routeParams]);

	function createJitsiMeet(){
        try {
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
            //  api.executeCommand('displayName', user.username);
            });
        
        } catch (error) {
        console.error('Failed to load Jitsi API', error);
        }
	}

    function uploadFile(file){
        dispatch(submitFileClassroom(file, meetingIdVal.response.meeting_id));
    }
    
    function disableButton() {
		// setIsFormValid(false);
	}

	function enableButton() {
		// setIsFormValid(true);
	}

    function handleSubmit(model){

    }

    function onClickGroup(id){
        setOpenGroups(false);
        dispatch(getMeetingId(id));
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
                                {openGroups ? 
                                    <>
                                    <Typography fontFamily variant="h3" color="inherit" className={clsx(classes.groupTitle)}>
                                        <div className={clsx(classes.fileNameStyle)}>
                                            ¿A qué grupo impartirás clase?
                                        </div>
                                    </Typography>
                                    <div className={clsx(classes.groupDivButtons)}>
                                        {valueGroups.map(group => {
                                            return(
                                                    <Button onClick={()=>onClickGroup(group.id)} className={clsx(classes.groupButton,"normal-case")}>
                                                        <Typography>{group.name}</Typography>
                                                    </Button>
                                            );
                                        })}
                                    </div>
                                    </>
                                :
                                    <div id="jitsi-container" className={classes.jitsiContainerOpen}/>
                                }
                            </Grid>
                            <Grid item xs={3} className={classes.rightContainerStyle}>
                                <div className={clsx('flex flex-col justify-center')}>    
                                {openMeeting !== false && aula.response &&
                                <>
                                {aula.response.map(file => {
                                    return(
                                        <>
                                            <p style={{paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, marginTop: 5, backgroundColor: '#c7c7c7', color: '#FFFFFF', borderRadius: 12, fontWeight: "bold", textAlign:"center"}}>    
                                                <Button className='flex flex-col justify-center'
                                                    onClick={ev => {
                                                        ev.stopPropagation();
                                                        dispatch(downloadFile(file.replace('public','')));}}>
                                                    <Typography
                                                        className={clsx(classes.fileNameStyle,"text-center text-13 font-600 mt-4")}>
                                                        {file.slice(file.indexOf('_')+1)}
                                                    </Typography>

                                                    <Icon className={clsx(classes.fileNameStyle,"text-center text-13 font-600 mt-4 ml-4")}>save_alt</Icon>
                                                </Button>
                                            </p>
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
                                    {/* <Typography
                                        className={clsx(classes.fileNameStyle,"text-center text-13 font-600 mt-4")}>
                                        o
                                    </Typography>
                                    <Formsy
                                        onValidSubmit={handleSubmit}
                                        onValid={enableButton}
                                        onInvalid={disableButton}
                                        ref={pageLayout}
                                        className="flex flex-col justify-center w-full"
                                    >
                                        <TextFieldFormsy
                                            className="mb-16"
                                            type="text"
                                            name="url"
                                            label="Ingresa una url válida"
                                            validations="isUrl"
                                            validationErrors={{
                                                isUrl: 'No es una url válida'
                                            }}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Icon className="text-20" color="action">
                                                            link
                                                        </Icon>
                                                    </InputAdornment>
                                                )
                                            }}
                                            variant="outlined"
                                            required
                                        />
                                    </Formsy> */}
                                </>
                                } 
                                </div>
                            </Grid>
                        </Grid>
                         
                        
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
