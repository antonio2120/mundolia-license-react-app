import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
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
	root: {
		backgroundImage: "url(assets/images/login/bg_alumnos.png)",backgroundSize:"cover",
		color: theme.palette.primary.contrastText
	},
	div:{backgroundColor:"lightgreen"},
	image_overlay:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:'rgba(255,0,255,0.5)',},
	circle:{position:"absolute",top:"10%",bottom:"10%",left:0,right:"75%",backgroundColor:'rgba(255,255,0,0.5)',},
	circle_horizontal:{position:"absolute",top:0,bottom:"50%",left:"10%",right:"10%",paddingRight:"10%",paddingLeft:"10%", alignItems:"center",backgroundColor:'rgba(255,255,0,0.5)'},
	circle_image:{width:100},
	circle_image_horizontal:{maxHeight:"100%",backgroundColor:"red",padding:0},
	leftSection: {},
	rightSection: {}
}));



function Login() {
	const classes = useStyles();
	const [selectedTab, setSelectedTab] = useState(0);
	const [widthFlag, setFlag] = useState(true);
	const [sizeW, setSize] = useState(500);

	function handleTabChange(event, value) {
		setSelectedTab(value);
	}

	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto justify-center flex-shrink-0 items-center'
			)}
		>
			<div className={clsx(classes.image_overlay)}/>
			<FuseAnimate animation="transition.expandIn">
				<div ref={el => {
						if (!el) return;
						el.getBoundingClientRect().width > 400 ? setFlag(true) : setFlag(false)
   						window.addEventListener('resize', function(){
							   console.log("div width",el.getBoundingClientRect().width); // prints 200px
							   el.getBoundingClientRect().width > 400 ? setFlag(true) : setFlag(false)
						   });
					}} 
					className={widthFlag ? clsx(classes.div,"flex w-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden justify-end")
							  	: clsx(classes.div,"flex w-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden justify-end mt-400")}>
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
											className="text-16 tracking-widest -mt-8 font-700"
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
			<div className={clsx(classes.circle)} ref={el => {
				if (!el) return;
				setSize(el.getBoundingClientRect().width)
				   window.addEventListener('resize', function(){
					   console.log("image width",el.getBoundingClientRect().width); // prints 200px
					   setSize(el.getBoundingClientRect().width)
				   });
			}} >
				<ImageMapper
					width={sizeW}
					src={require('./circle-complete.png')}  alt="circle"
					map={{
						name:"my-app",
						areas:[
							{name:"1",shape:"poly",coords:[25,33,27,300,128,240,128,94]}
						]
					}}
					onClick={area => console.log("clicked",area)}
				/>
				
			</div>
			:
			<div className={clsx(classes.circle_horizontal)}>
				<img  src="assets/images/login/circle-complete-horizontal.png" className={clsx(classes.circle_image_horizontal)} alt="circle"/>
			</div>}
		</div>
	);
}

export default Login;
