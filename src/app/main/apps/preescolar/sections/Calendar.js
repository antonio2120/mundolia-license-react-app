import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Preescolar.css';
import { Link, useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import reducer from '../store';
import withReducer from 'app/store/withReducer';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {isMobile} from "react-device-detect";
import {getStudentCalendars, getStudentSubjects} from '../store/subjectCalendarSlice';
import {useDeepCompareEffect} from "../../../../../@fuse/hooks";
import ListSubheader from "@material-ui/core/ListSubheader";
import {Collapse, ListItem} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import InboxIcon from "@material-ui/icons/Inbox";
import { Calendar,momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es';
import { getEvents } from './Fetch';

const formats = {
    eventTimeRangeFormat: () => {
        return "";
    },
};

const localizer = momentLocalizer(moment);

const CustomEvent = ({ event }) => {
    return (
        <span> <strong> {event.title} </strong> </span>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(3),
        backgroundColor: "transparent",
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
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
    containerClass:{
      padding:'4rem'
    },
    button: {

        "&:hover": {
            transform: "scale(1.2)"
            // width:"120%"
        },
        text: "center",
    },
    buttonClass: {
        width:'auto',
        "&:hover": {
            backgroundColor: '#6f51ed',
            transform: "scale(1.1)"
            // width:"120%"
        },
        minWidth:'48px',
        height:'48px',
        minHeight: 'auto',
        padding: ' 0 16px',
        borderRadius: '24px',
        margin: '10px',
        backgroundColor:'#6f51ed'
    },
    img: {
        maxHeight: "20%",
        maxWidth: "20%",
    },
    imgButton: {
        maxHeight: "40%",
        maxWidth: "40%",
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
    nested: {
        paddingLeft: theme.spacing(4),
    },
    infoCardsColumn: {
        paddingTop: 12, paddingBottom: 12, paddingLeft: 5, paddingRight: 5, backgroundColor: '#ECA800', color: '#FFFFFF',
        borderRadius: 15, fontWeight: "bold", width: 'full', height: 'full', textAlign: "center", flex: 1, borderColor: '#FFD90A', borderWidth: 6,
    },


}));

function CalendarActivities(props) {

    /*let calendarsIds = [
     	{calendarId: "c0ehv4iqcpjhapg7io7pjimri0@group.calendar.google.com"},
        {calendarId: "u5hkt33v643c7d51lrs6vm81s8@group.calendar.google.com", color: "#8fb4d1"}, //accepts hex and rgb strings (doesn't work with color names)
        {calendarId: "g4vjt67kr1jsi67kmirfh9kqco@group.calendar.google.com", color: "#8fb4d1"},//accepts hex and rgb strings (doesn't work with color names)
        {calendarId: "m4q47nj29b2nu6pu2fjklft3b4@group.calendar.google.com", color: "#000000"},//accepts hex and rgb strings (doesn't work with color names)
    ];*/

    const dispatch = useDispatch();
    const classes = useStyles();
    const routeParams = useParams();
    const role = useSelector(({ auth }) => auth.user.role);
    const info = useSelector(({ auth }) => auth.user);
    const calendars = useSelector(({ MisTareasApp }) => MisTareasApp.subjectCalendarSlice.data);
    const subjects = useSelector(({ MisTareasApp }) => MisTareasApp.subjectCalendarSlice.subjects.data);
    const [open, setOpen] = React.useState(true);
    const [eventData, setEventData] = React.useState([]);
    const [calendarsIds, setCalendars] = useState([]);


    const handleClick = () => {
        setOpen(!open);
    };

    const escuelabaja = role== 'alumno' && info.grade <= 3 ? true : false ;



    useDeepCompareEffect(() => {
        dispatch(getStudentCalendars());
        dispatch(getStudentSubjects());
    }, [dispatch, routeParams]);

    /*let styles = {
        calendar: {
            borderWidth: "3px",
            display: 'grid',
            backgroundColor: '#ffffff',
            width: '100%',
            borderRadius: '30px',
            maxHeight: '450px',
            overflow: 'auto'
        },
        today: {
            border: "1px solid red",
            backgroundColor: "#ffeceb",
        }
    }*/

    useEffect(() => {
        let calendarsArray = [];

        for (let i in calendars) {

            getEvents(events => { setEventData(eventData=> [...eventData, ...events]) }, process.env.REACT_APP_CALENDAR_KEY, calendars[i].calendar_id.toString(), calendars[i].custom_color.toString() );
        }

    }, [dispatch, calendars,subjects]);

    /*useEffect(() => {
        for (var i = 0; i < calendarsIds.length; i++) {
            getEvents(events => { setEventData(eventData=> [...eventData, ...events]) }, 'AIzaSyA43ykItqqQsCxgFmNviQZuRdvaABS5Ru4', calendarsIds[i].calendarId.toString(), calendarsIds[i].color.toString() );
        }
    },[calendarsIds]);*/

    const [userMenu, setUserMenu] = useState(null);

    const userMenuClick = event => {
        setUserMenu(event.currentTarget);
    };

    const userMenuClose = () => {
        setUserMenu(null);
    };

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
                            <img className={clsx(classes.img)} src="assets/images/preescolar/artes1.png" />
                            <Typography className={clsx(classes.TextTitle)}>
                                {escuelabaja ? 'Mis Tareas' : 'Mis Clases'}
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

                < div className="w-full pt-20 pb-20 m-20 pr-20 pl-20 items-center justify-center flex-wrap flex-row flex">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={2}>
                            <Paper className={classes.paper}>
                                <List
                                    component="nav"
                                    aria-labelledby="nested-list-subheader"
                                    subheader={
                                        <ListSubheader component="div" id="nested-list-subheader">
                                            LIA Clubs
                                        </ListSubheader>
                                    }
                                    className={classes.root}
                                >
                                    <ListItem button onClick={handleClick}>
                                        <ListItemIcon>
                                            <InboxIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Inbox" />
                                        {open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={open} timeout="auto" unmountOnExit>

                                    </Collapse>
                                </List>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} sm={8}>
                            <Paper className={classes.paper}>
                                {/*<Calendar apiKey={process.env.REACT_APP_CALENDAR_KEY} calendars={calendarsIds} styles={styles} language={'ES'} />*/}
                                <Calendar localizer={localizer} events={eventData.length == 0 ? [] : eventData} defaultView='week' messages={{
                                    next: "Siguiente",
                                    previous: "Anterior",
                                    today: "Hoy",
                                    month: "Mes",
                                    week: "Semana",
                                    day: "Día",
                                    noEventsInRange: "No hay eventos programados"
                                }}
                                          views={['day', 'week']}
                                          step={60} showMultiDayTimes={true} startAccessor="start" endAccessor="end"
                                          onSelectEvent={event => alert(JSON.stringify(event))}
                                          eventPropGetter={event => ({
                                              style: {
                                                  backgroundColor: event.customColor,
                                                  fontSize: "10px",
                                                  textAlign: "center"
                                              }
                                          })}
                                          components={{
                                              event: CustomEvent,
                                          }}
                                          formats={formats}>
                                </Calendar>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            <Paper className={classes.paper}>
                                <div className="flex w-full flex-col text-center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.buttonClass}
                                        endIcon={<Icon>laptop</Icon>}
                                    >
                                        Entrar A Clase
                                    </Button>
                                </div>
                                <div className="flex w-full flex-col text-center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.buttonClass}
                                        endIcon={<Icon>CalendarToday</Icon>}
                                    >
                                        Club Lia Eventos
                                    </Button>
                                </div>
                                <div className="flex w-full flex-col text-center">
                                    <Button
                                        className={clsx(classes.button)}
                                        style={{
                                            backgroundColor: 'transparent',
                                        }}
                                        to={`/loginp`}
                                        component={Link}
                                        type="button"
                                    >
                                        <img className={clsx(classes.imgButton)} src="assets/images/preescolar/comunicacionButton.png" alt="logo" />
                                    </Button>
                                    <Button
                                        style={{
                                            backgroundColor: 'transparent',
                                        }}
                                        to={`/loginp`}
                                        component={Link}
                                        type="button"
                                    >
                                        <Typography className={clsx(classes.Text)}>
                                            Mi Mundo Lia
                                        </Typography>
                                    </Button>
                                </div>
                                <div className="flex w-full flex-col text-center">
                                    <Button
                                        className={clsx(classes.button)}
                                        style={{
                                            backgroundColor: 'transparent',
                                        }}
                                        to={`/apps/sections/mistareas`}
                                        component={Link}
                                        type="button"
                                        // onMouseEnter={ playMisTareas }
                                    >
                                        <img className={clsx(classes.imgButton)} src={ escuelabaja ? "assets/images/preescolar/explorer.png" : "assets/images/preescolar/explorer1.png"} />
                                    </Button>
                                    <Button
                                        style={{
                                            backgroundColor: 'transparent',
                                        }}
                                        to={`/apps/sections/mistareas`}
                                        component={Link}
                                        // className="justify-start px-32"
                                        color="secondary"
                                    >
                                        <Typography className={clsx(classes.Text)}>
                                            { escuelabaja ? 'Mis Tareas' : 'Mis Actividades' }
                                        </Typography>
                                    </Button>
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </FuseAnimateGroup>
        </div>
    );
}

export default withReducer('MisTareasApp', reducer)(CalendarActivities);
