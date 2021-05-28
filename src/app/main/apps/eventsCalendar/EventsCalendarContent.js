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
import Calendar from "@ericz1803/react-google-calendar";

function EventsCalendarContent(props) {

	let calendars = [
		{calendarId: "cr7v50c3mikurhfr73oqa3qcbk@group.calendar.google.com"},
		{calendarId: "rg4m0k607609r2jmdr97sjvjus@group.calendar.google.com", color: "rgb(63, 191, 63)"}, //accepts hex and rgb strings (doesn't work with color names)
		{calendarId: "62llaglq7i0b3jkp3t402rfosg@group.calendar.google.com", color: "rgb(10, 191, 63)"}, //accepts hex and rgb strings (doesn't work with color names)
		{calendarId: "vk8dl7jod7qq9s44paa48eqq20@group.calendar.google.com", color: "rgb(10, 91, 63)"} //accepts hex and rgb strings (doesn't work with color names)		
	];

	let styles = {
		//you can use object styles (no import required)
		calendar: {
		  borderWidth: "3px", //make outer edge of calendar thicker
		},
		
		//you can also use emotion's string styles
		today: {
			border: "1px solid red",
			backgroundColor: "#ffeceb",
		}
	  }

	return (
		<>
		
		
		<div
			style={{
				padding: "2%",
				backgroundColor: 'white'
			}}>
            <Calendar apiKey={process.env.REACT_APP_CALENDAR_KEY} calendars={calendars} styles={styles} language={'ES'}/>
		</div>
		</>
	);
}
export default withReducer('EventsCalendarContent', reducer)(EventsCalendarContent);