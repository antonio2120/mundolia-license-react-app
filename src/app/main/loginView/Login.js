import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth0LoginTab from './tabs/Auth0LoginTab';
import FirebaseLoginTab from './tabs/FirebaseLoginTab';
import JWTLoginTab from './tabs/JWTLoginTab';
import ImageMapper from 'react-image-mapper';


const useStyles = makeStyles(theme => ({
	root_alumnos: {
		backgroundImage: "url(assets/images/login/bg_alumnos.png)",backgroundSize:"cover",position:"relative",height:"90%",backgroundSize:"cover",
		color: theme.palette.primary.contrastText
	},
	root_maestros: {
		backgroundImage: "url(assets/images/login/bg_maestros.png)",backgroundSize:"cover",position:"relative",height:"90%",backgroundSize:"cover",
		color: theme.palette.primary.contrastText
	},
	root_padres: {
		backgroundImage: "url(assets/images/login/bg_padres.png)",backgroundSize:"cover",position:"relative",height:"90%",backgroundSize:"cover",
		color: theme.palette.primary.contrastText
	},
	root_escuelas: {
		backgroundImage: "url(assets/images/login/bg_escuelas.png)",backgroundSize:"cover",position:"relative",height:"90%",backgroundSize:"cover",
		color: theme.palette.primary.contrastText
	},
	image_overlay_alumnos:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:'rgba(148,88,183,0.8)',},
	image_overlay_maestros:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:'rgb(208,66,55,0.7)',},
	image_overlay_padres:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:'rgba(231,162,63,0.7)',},
	image_overlay_escuelas:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:'rgba(34,79,245,0.7)',},
	circle:{position:"absolute",top:"10%",bottom:"10%",left:0,right:"75%",zIndex:2},
	buttons_mobile_view:{width:"100%", position:"absolute",top:"10%",zIndex:0},
	circle_image:{width:100},
	circle_image_horizontal:{maxHeight:"100%",padding:0},
	textButton:{position:"absolute",justifyContent:"center",alignSelf:"center",color:"#FFF"},
	divCard:{flexDirection:"row",zIndex:2},
	divFooter:{zIndex:1,height:"10%"},
	footerStyle:{width:"100%",alignSelf:"end"},
	leftSection: {},
	rightSection: {borderRadius:15},
	loginLeftSection:{height:"100%"},
	loginLeftSectionImg:{height:"30%"}
}));




function Login() {
	const classes = useStyles();
	const [selectedTab, setSelectedTab] = useState(0);
	const [widthFlag, setFlag] = useState(true);
	const [deviceMode, setDeviceMode] = useState(true);
	const [selectedUserType, setUserType] = useState(1);
	
	function clickedArea(area) {
		console.log("area",area);
		if(area === "alumnos") setUserType(1);
		if(area === "maestros") setUserType(2);
		if(area === "padres") setUserType(3);
		if(area === "escuelas") setUserType(4);
	}

	function handleTabChange(event, value) {
		setSelectedTab(value);
	}

	return (
		<>
		<div
			className={clsx(
				selectedUserType == 1 ? classes.root_alumnos : selectedUserType == 2 ? classes.root_maestros : selectedUserType == 3 ? classes.root_padres : classes.root_escuelas,
				'flex flex-col flex-fixed flex-auto justify-center flex-shrink-0 items-center'
			)}
			ref={el => {
				if (!el) return;
				el.getBoundingClientRect().width > 550 ? setDeviceMode(true) : setDeviceMode(false)
				window.addEventListener('resize', function(){
					console.log("parent width",el.getBoundingClientRect().width); // prints 200px
					el.getBoundingClientRect().width > 550 ? setDeviceMode(true) : setDeviceMode(false)
				});
			}}>
			<div className={clsx(
				selectedUserType == 1 ? classes.image_overlay_alumnos : selectedUserType == 2 ? classes.image_overlay_maestros : selectedUserType == 3 ? classes.image_overlay_padres : classes.image_overlay_escuelas
				)}/>

			<FuseAnimate animation="transition.slideUpIn" delay={400}>
				<div className={widthFlag ? "flex w-full max-w-350 md:max-w-3xl rounded-12 overflow-hidden justify-end" 
				: deviceMode ? "flex w-full max-w-350 md:max-w-3xl rounded-12 overflow-hidden justify-center mt-400"
				: "flex w-full max-w-350 rounded-12 overflow-hidden justify-center"}>
					<div className='flex flex-col w-full max-w-sm items-center justify-center float-md-right'>
						<Typography fontFamily variant={deviceMode ? "h1" : "h3"} color="inherit" className="font-700 leading-tight justify-end">
							<div className={"grobold"}>
								{selectedUserType == 1 ? "Alumnos" : selectedUserType == 2 ? "Maestros" : selectedUserType == 3 ? "Padres" : "Escuelas"}
							</div>
						</Typography>
					</div>
				</div>
			</FuseAnimate>

			<FuseAnimate animation="transition.expandIn">
				<div ref={el => {
						if (!el) return;
						el.getBoundingClientRect().width > 400 ? setFlag(true) : setFlag(false)
   						window.addEventListener('resize', function(){
							   console.log("div width",el.getBoundingClientRect().width); // prints 200px
							   el.getBoundingClientRect().width > 400 ? setFlag(true) : setFlag(false)
						   });
					}} 
					className={widthFlag ? clsx(classes.divCard,"flex w-full max-w-400 md:max-w-3xl rounded-20 overflow-hidden justify-end")
							  	: clsx(classes.divCard,"flex w-full max-w-400 md:max-w-3xl rounded-20 overflow-hidden justify-end")}>
					<div className={clsx(classes.loginLeftSection)}>
						<img  src="assets/images/login/SignIn.png" className={clsx(classes.loginLeftSectionImg)} alt="circle"/>
					</div>
					<Card
						className={clsx(
							classes.rightSection,
							'flex flex-col w-full max-w-sm items-center justify-center float-md-right'
						)}
						square
						elevation={0}
					>
						<CardContent className="flex flex-col items-center justify-center w-full max-w-320">
							<FuseAnimate delay={300}>
								<div className="flex items-center">
									<div className="border-l-1 w-1" />
									<div>
										<Typography className="text-24 font-800 logo-text" color="inherit">

										</Typography>
										<Typography
											className="text-16 -mt-8 font-700"
											color="textSecondary"
										>

										</Typography>
									</div>
								</div>
							</FuseAnimate>

							<Tabs
								value={selectedTab}
								onChange={handleTabChange}
								variant="fullWidth"
								className="w-full mb-32"
							>


							</Tabs>

							{selectedTab === 0 && <JWTLoginTab />}
							{selectedTab === 1 && <FirebaseLoginTab />}
							{selectedTab === 2 && <Auth0LoginTab />}
						</CardContent>

					</Card>
				</div>
			</FuseAnimate>
			{widthFlag ?
			<FuseAnimate animation="transition.slideUpIn" delay={400}>
			<div className={clsx(classes.circle)}>
				<ImageMapper
					width={370}
					src={require('./circle-complete2.png')}  alt="circle"
					map={{
						name:"my-app",
						areas:[
							{name:"alumnos",shape:"poly",coords: [15,10, 15,252, 50,257, 85,277, 250,110, 170,50, 110,26]},
							{name:"maestros",shape:"poly",coords: [90,283, 110,313, 115,353, 320,353, 320,323, 275,200, 235,140]},
							{name:"padres",shape:"poly",coords: [115,357, 110,387, 87,420, 252,584, 300,520, 345,387, 345,357]},
							{name:"escuelas",shape:"poly",coords: [55,445, 15,455, 15,650, 115,640, 155,620, 225,570, 85,425]}
						]
					}}
					onClick={area => clickedArea(area.name)}
					active={false}
				/>
				
			</div>
			</FuseAnimate>
			:
			deviceMode ? 
			<FuseAnimate animation="transition.slideUpIn" delay={400}>
			
			<div className={clsx(classes.buttons_mobile_view,'flex flex-col flex-auto justify-center flex-shrink-0 items-center')}>
				<div>
					<Button
						variant="contained"
						className="w-full max-w-200 normal-case m-10 rounded-20"
						disabled={widthFlag}
						value="legacy"
						onClick={()=>setUserType(1)}
					>
						<img  src="assets/images/login/cir_alumnos.png" className={clsx(classes.circle_image_horizontal)} alt="circle"/>
						<div className={clsx(classes.image_overlay_alumnos,"rounded-20")}/>
						<Typography className={clsx(classes.textButton)}>alumnos</Typography>
					</Button>
					<Button
						variant="contained"
						className="w-full max-w-200 normal-case m-10 rounded-20"
						disabled={widthFlag}
						value="legacy"
						onClick={()=>setUserType(2)}
					>
						<img  src="assets/images/login/cir_maestros.png" className={clsx(classes.circle_image_horizontal)} alt="circle"/>
						<div className={clsx(classes.image_overlay_maestros,"rounded-20")}/>
						<Typography className={clsx(classes.textButton)}>maestros</Typography>
					</Button>
				</div>
				<div>
					<Button
						variant="contained"
						className="w-full max-w-200 normal-case m-10 rounded-20"
						disabled={widthFlag}
						value="legacy"
						onClick={()=>setUserType(3)}
					>
						<img  src="assets/images/login/cir_padres.png" className={clsx(classes.circle_image_horizontal)} alt="circle"/>
						<div className={clsx(classes.image_overlay_padres, "rounded-20")}/>
						<Typography className={clsx(classes.textButton)}>padres</Typography>
					</Button>
					<Button
						variant="contained"
						className="w-full max-w-200 normal-case m-10 rounded-20"
						disabled={widthFlag}
						value="legacy"
						onClick={()=>setUserType(4)}
					>
						<img  src="assets/images/login/cir_escuelas.png" className={clsx(classes.circle_image_horizontal)} alt="circle"/>
						<div className={clsx(classes.image_overlay_escuelas, "rounded-20")}/>
						<Typography className={clsx(classes.textButton)}>escuelas</Typography>
					</Button>
				</div>
			</div>
			
			</FuseAnimate>
			:
			<></>
			}
		</div>
		<footer className={clsx(classes.divFooter)}>
			<img src="assets/images/login/BOTTOM.png" className={clsx(classes.footerStyle)} alt="footer"/>
		</footer>
		</>
	);			
}

export default Login;
