import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import {showMessage} from "../../store/fuse/messageSlice";
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
	root_alumnos: {
		backgroundImage: "url(assets/images/login/bg_alumnos.png)",backgroundSize:"cover",position:"relative",height:"90%",backgroundSize:"cover",
		color: theme.palette.primary.contrastText
	},
	image_overlay_alumnos:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:'rgba(148,88,183,0.8)',},
	root: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	},
	leftSection: {},
	rightSection: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));
function getUrl(){
	axios
	.post(process.env.REACT_APP_API+'/usuario_p/login')
	.then(response => {
		if (response.data) {
			window.location.href = response.data;
			console.log(response.data)
		} else {
			//dispatch(showMessage({ message: error.message }));
		}
	})
	.catch(error => {
		//dispatch(showMessage({ message: error.message }));
	});

}

function LoginPhpFox() {
	const classes = useStyles();
	getUrl();
	return (
		<div
		className={clsx(classes.root_alumnos,
			'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
		)}
	>
		<div className={clsx(classes.image_overlay_alumnos)}/>
			<FuseAnimate animation="transition.expandIn">
				<div className={clsx("flex w-full max-w-400 md:max-w-3xl rounded-12 overflow-hidden justify-center")}>
					
					<img className="logo-icon w-49" src="assets/images/logos/clublia.png" alt="logo" />
									
				</div>

			</FuseAnimate>
					<CircularProgress color="secondary" />
		</div>
	);
}

export default LoginPhpFox;
