import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
	divHeader:{flexGrow:1,height:"100%",backgroundColor:theme.palette.primary.dark},
	gridHeader:{justifyContent:"flex-end",alignContent:"flex-end", textAlign:"right"},
	loginButton:{backgroundColor:"#4883C0",color:"white"},
	signupButton:{backgroundColor:"#D9AB0C",color:"white"},
	typoLink:{color:"white"},
}));

function LandingPage() {
	const classes = useStyles();
	
	return (
		<>
		<header>
			<div  className={clsx(classes.divHeader)}>
				<Grid container className="flex">
					<Grid item xs={8} className="flex">
                        <div className={"flex flex-wrap items-center justify-center ml-6"}>
                            <Link to="/pricing" className="font-medium">
                                <Typography className={clsx(classes.typoLink)}>Tarifas</Typography>
                            </Link>
                        </div>
					</Grid>
					<Grid item xs={4} className={clsx(classes.gridHeader)}>
						<Button onClick={()=>window.location.href = '/login'} className={clsx(classes.loginButton,"normal-case")}>
							<Typography>Log In</Typography>
						</Button>
						<Button onClick={()=>window.location.href = '/pricing'} className={clsx(classes.signupButton,"normal-case m-6")}>
							<Typography>Sign Up</Typography>
						</Button>
					</Grid>
				</Grid>
			</div>
		</header>
        <div className='flex flex-col flex-fixed flex-auto justify-top flex-shrink-0 items-center'>
            <img src="assets/images/home/learningLiaBanner.jpg" alt="bannerLIA"/>
        </div>
		</>
	);			
}

export default LandingPage;
