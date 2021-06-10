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
import './Preescolar.css';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	Text: {
		fontWeight:"bold",
		fontSize:"32px",
		color: 'white',
		textShadow: '2px 2px 2px black',
	},
	button: {

		"&:hover": {
			transform: "scale(1.2)",
			// opacity: "0%",
			// width:"120%"
		}
	},
	img: {
		animationName: "floating",
		animationDuration: "6s",
		animationIterationCount: "infinite",
		animationTimingFunction: "ease-in-out",
		}

}));

function PreescolarLayout(props) {
	  

	const classes = useStyles();
	const role = useSelector(({ auth }) => auth.user.role);
	const grade = useSelector(({ auth }) => auth.user.grade);
	const escuelabaja = role== 'alumno' && grade <= 3 ? true : false ; 

	const [values, setValues] = React.useState({
		play: false,
      	pause: true, 
	});
	// const url =  `url("assets/sounds/Mi Mundo Lia.m4a")`;
    const audioMimundoLia = new Audio("assets/sounds/Mi Mundo Lia.mp3");
	const audioMiScore = new Audio("assets/sounds/Mi Score.mp3");
	const audioMisClases= new Audio("assets/sounds/Mis Clases.mp3");
	const audioMisTareas = new Audio("assets/sounds/Mis Tareas.mp3");
	const audioMisActividades = new Audio("assets/sounds/Mis Actividades.mp3");

	function handleSubmit(event) {
		const token = localStorage.getItem('jwt_access_token');
		if(token){
			console.log("token_exists::");
		}else{
			console.log("token_exists::no");
		}
	}

	function playMundolia() {
		audioMimundoLia.play();
	}
	function playMiScore() {
		audioMiScore.play();
	}
	function playMisClases() {
		audioMisClases.play();
	}
	function playMisTareas() {
		audioMisTareas.play();
	}
	function playMisActividades() {
		audioMisActividades.play();
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
                className="flex flex-wrap p-64"
                enter={{
                    animation: 'transition.slideUpBigIn'
                }}
            >


				<div className="float flex w-full sm:w-1/2 md:w-1/3 p-12 flex-col text-center">
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
						<img src="assets/images/preescolar/explorer.png" />
					</Button>
					<Button
						style={{
							backgroundColor: 'transparent',
						}}
						to={`/apps/sections/mistareas`}
						component={Link}
						// className="justify-start px-32"
						color="secondary"
						onMouseEnter={ !escuelabaja ? playMisActividades : null }
					>
						<Typography className={clsx(classes.Text)}>
							{ escuelabaja ? 'Mis Tareas' : 'Mis Actividades' }
						</Typography>
					</Button>
				</div>



				<div className="float flex w-full sm:w-1/2 md:w-1/3 p-12 flex-col text-center" raised>
					<Button
						className={clsx(classes.button)}
						style={{
							backgroundColor: 'transparent',
						}}
						to={`/loginp`}
						component={Link}
						type="button"
					>
						<img className="logo-icon" src="assets/images/preescolar/comunicacion.png" alt="logo" />
					</Button>
					<Button
						style={{
							backgroundColor: 'transparent',
						}}
						to={`/loginp`}
						component={Link}
						type="button"
						// name={mundolia}
						// id={'mundolia'}
						onMouseEnter={ !escuelabaja ? playMundolia : null }
					>
						<Typography className={clsx(classes.Text)}>
						Mi Mundo Lia
						</Typography>
					</Button>
				</div>
				<div className="float flex w-full sm:w-1/2 md:w-1/3 p-12 flex-col text-center">
					<Button
						className={clsx(classes.button)}
						style={{
							backgroundColor: 'transparent',
						}}
						component={Link}
						type="button"
					>
						<img src="assets/images/preescolar/artes.png" alt="logo" />
					</Button>
					<Button
						style={{
							backgroundColor: 'transparent',
						}}
						// to={``}
						component={Link}
						type="button"
						onMouseEnter={ !escuelabaja ? playMisClases : null }
					>
						<Typography className={clsx(classes.Text)}>
							Mis Clases
						</Typography>
					</Button>
				</div>

				{/* <div className="float flex w-full sm:w-1/2 md:w-1/3 p-12 flex-col items-center justify-center flex-1" >
				<Button
						justifyContent="center"
						className={clsx(classes.button)}
						// className="flex items-center justify-between px-16 h-64 border-b-1"
						style={{
							backgroundColor: 'transparent',
							backgroundImage: `url("assets/images/preescolar/ButtonLIA.png")`,
							backgroundPosition: 'center',
							backgroundSize: 'contain',
							backgroundRepeat: 'no-repeat',
							height: "100%",
							// maxHeight: '100%',
							// maxWidth: '100%',

						}}
						to={`/apps/dashboard`}
						component={Link}
						type="button"
					> 						

						<Typography className={clsx(classes.Text)}>
							Mi Score
						</Typography>
					</Button>
					
				</div> */}

            </FuseAnimateGroup>

        </div>
	);
}

export default PreescolarLayout;
