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
import Auth0RegisterTab from './tabs/Auth0RegisterTab';
import FirebaseRegisterTab from './tabs/FirebaseRegisterTab';
import ParentRegisterTab from './tabs/ParentRegisterTab';
import TeacherRegisterTab from './tabs/TeacherRegisterTab';
import reducer from './store';

const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	},
	leftSection: {},
	rightSection: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

function Register(props) {
	const search = props.location.search; // returns the URL query String
	const params = new URLSearchParams(search); 
	const type = params.get('type'); 
	const membership = params.get('membership'); 
	console.log("params::",type,membership);
	const classes = useStyles();
	const [selectedTab, setSelectedTab] = useState(0);

	function handleTabChange(event, value) {
		setSelectedTab(value);
	}

	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
			)}
		>
			<FuseAnimate animation="transition.expandIn">
				<div className="flex w-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden">
					
					<div
						className={clsx(classes.rightSection, 'flex flex-col w-full max-w-sm items-center justify-center')}
					>
						<div className="max-w-320">
							<FuseAnimate animation="transition.slideUpIn" delay={400}>
								<Typography variant="h3" color="inherit" className="font-800 leading-tight">
									Bienvenido a<br />
									Sistema <br /> Club LIA!
								</Typography>
							</FuseAnimate>

							<FuseAnimate delay={500}>
								<Typography variant="subtitle1" color="inherit" className="mt-32">
									Registro como usuario {type == "padre" ? "padre." : "escuela."}
								</Typography>
							</FuseAnimate>

							<FuseAnimate delay={500}>
								<Typography variant="subtitle2" color="inherit">
									Administración de Licencias para tu institución.
								</Typography> 
							</FuseAnimate>
						</div>
					</div>
					
					<Card
						className={clsx(
							classes.leftSection,
							'hidden md:flex flex-1 p-64'
						)}
						square
						elevation={0}
					>
						<CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
							<FuseAnimate delay={300}>
								<div className="flex items-center justif-center mb-32">
									<img className="logo-icon w-50" src="assets/images/logos/clublia.png" alt="logo" />
									<div className="border-l-1 mr-4 w-1 h-40" />
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
							{type == "maestro" ? <TeacherRegisterTab /> : <ParentRegisterTab />}
							
						<div className="flex flex-col items-center justify-center pb-32">
							<div>
								<span className="font-medium mr-8">Ya tiene una cuenta de usuario?</span>
								<Link className="font-medium" to="/login">
									Entrar
								</Link>
							</div>
						</div>
						</CardContent>
					</Card>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default Register;
