import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import '../Preescolar.css';
import {Link} from 'react-router-dom';
import Calendar from "@ericz1803/react-google-calendar";
import Fab from "@material-ui/core/Fab";
import {openEventDialog} from "../../eventsCalendar/store/eventsSlice";
import {openCalendarDialog} from "../../eventsCalendar/store/calendarSlice";
import EventsCalendarEventDialog from "../../eventsCalendar/EventCalendarEventDialog";
import EventsCalendarDialog from "../../eventsCalendar/EventsCalendarDialog";

const useStyles = makeStyles(theme => ({
    // header: {
    // 	height: 600,
    // 	background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    // 	color: theme.palette.primary.contrastText
    // },
    // badge: {
    // 	backgroundColor: theme.palette.error.main,
    // 	color: theme.palette.getContrastText(theme.palette.error.main)
    // },
    // textTitle: {
    // 	color: "#0071e7",
    // },
    // priceText: {
    // 	fontWeight:"bold",
    // 	fontSize:"20px"
    // },
    // textRegistro: {
    // 	fontWeight:"bold",
    // 	fontSize:"26px"
    // },
    // price: {
    // 	backgroundColor: "#0071e7",
    // 	color: theme.palette.getContrastText(theme.palette.primary[600])
    // },
    // backColButton: {
    // 	backgroundColor: "#0071e7",
    // },
    // textButton: {
    // 	color: "#FFF",
    // 	fontSize:"16px"
    // },
    // img: {
    // 	width:"100%"
    // }
    Text: {
        fontWeight: "bold",
        fontSize: "32px",
        color: 'white',
        textShadow: '2px 2px 2px black',
    },
    button: {
        // main styles,
        // "&:focus": {
        // 	width:"120%"
        // },
        "&:hover": {
            transform: "scale(1.2)"
            // width:"120%"
        },
        text: "center"
    },
    img: {
        animationName: "floating",
        animationDuration: "6s",
        animationIterationCount: "infinite",
        animationTimingFunction: "ease-in-out",
    }

}));

function calendarActivities(props) {
    const classes = useStyles();

    function handleSubmit(event) {
        const token = localStorage.getItem('jwt_access_token');
        if (token) {
            console.log("token_exists::");
        } else {
            console.log("token_exists::no");
        }
    }


    return (
        <div className="flex flex-1"
             style={{
                 backgroundImage: `url("assets/images/preescolar/pantalla12.png")`,
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 backgroundRepeat: 'no-repeat'
             }}>
            <div
                className="w-full item-center p-20"
                style={{
                    color: 'white'
                }}
            >
                <div
                    style={{
                        padding: "2%",
                        backgroundColor: 'white'
                    }}>
                    <Calendar apiKey={process.env.REACT_APP_CALENDAR_KEY} calendars={calendarsIds} styles={styles}
                              language={'ES'}/>
                    <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Fab
                            color="primary"
                            aria-label="add"
                            className={classes.addEvent}
                            onClick={ev => dispatch(openEventDialog())}
                        >
                            <Icon>add_to_photos</Icon>
                        </Fab>
                    </FuseAnimate>
                </div>
            </div>
            :
            <div className="flex flex-1 items-center justify-center">
                <Typography color="textSecondary" className="text-24 my-24">
                    No se encontraron calendarios!
                </Typography>
            </div>
            }
            <FuseAnimate animation="transition.expandIn" delay={300}>
                <Fab
                    color="primary"
                    aria-label="add"
                    className={classes.addCalendar}
                    onClick={ev => dispatch(openCalendarDialog())}
                >
                    <Icon>event</Icon>
                </Fab>
            </FuseAnimate>
            <EventsCalendarEventDialog/>
            <EventsCalendarDialog/>
        </div>
    );
}

export default calendarActivities();
