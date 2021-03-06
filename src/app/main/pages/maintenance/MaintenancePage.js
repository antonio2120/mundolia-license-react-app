import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grow from '@material-ui/core/Grow';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	}
}));

function MaintenancePage() {
	const classes = useStyles();

	return (
		<div
			className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
			<div className="flex flex-col items-center justify-center w-full">
				<Grow in>
					<Card className="w-full max-w-384 rounded-8">
						<CardContent className="flex flex-col items-center justify-center text-center p-48">
							<img className="w-128 m-32" src="assets/images/logos/clublia.png" alt="logo"/>
							<Typography variant="h4" color="inherit" className="font-800 leading-tight">
								Bienvenido a
								Sistema ClubLIA!
							</Typography>
						</CardContent>
					</Card>
				</Grow>
			</div>
		</div>
	);

}

export default MaintenancePage;
