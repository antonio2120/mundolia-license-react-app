import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../Preescolar.css';
import { Link } from 'react-router-dom';

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
		fontWeight:"bold",
		fontSize:"32px",
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

function MisTareas(props) {

	const classes = useStyles();

	function handleSubmit(event) {
		const token = localStorage.getItem('jwt_access_token');
		if(token){
			console.log("token_exists::");
		}else{
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

            <FuseAnimateGroup
                className="flex flex-wrap p-80"
                enter={{
                    animation: 'transition.slideUpBigIn'
                }}
            >


				<div className="avatar flex w-full sm:w-1/2 md:w-1/3 p-12 flex-col text-center">
					<Button
						className={clsx(classes.button)}
						className="flex items-center justify-between px-16 h-64 border-b-1"
						style={{

							// backgroundImage: `url("assets/images/preescolar/explorer.png")`,
						}}
						to={`/apps/landing`}
						component={Link}
						type="button"
					>
						<img src="assets/images/preescolar/explorer.png" />
						<Typography className={clsx(classes.Text)}>
							Mis tareas
						</Typography>
					</Button>
				</div>

						
						
            </FuseAnimateGroup>

        </div>
	);
}

export default MisTareas;
