import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import {blue, green} from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import SwipeableViews from 'react-swipeable-views';
import reducer from '../store';
import { getCourse, updateCourse } from '../store/courseSlice';
import  {Component} from 'react';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
	stepLabel: {
		cursor: 'pointer!important'
	},
	successFab: {
		background: `${green[500]}!important`,
		color: 'white!important'
	}
}));
class Course extends Component {
	constructor(props) {
		super(props);
		// No llames this.setState() aquí!
		this.state = { activeStep: 1 };

		const demoSteps = [
			{
				id: '0',
				title: 'Descargar Plantilla',
				content:
					'<h1>Paso  1 - Descargar Plantilla</h1>' +
					'<br>' +
					'Plantilla_Usuarios_LIA.xlsx.' +
					'<br><br>' +
					'Una vez que los datos se hayan guardado en este archivo, el archivo se debera almacenar en formato CSV.'

			},
			{
				id: '1',
				title: 'Get the sample code',
				content:
					'<h1>Step 2 - Get the sample code</h1>' +
					'<br>' +
					'This is an example step of the course. You can put anything in here from example codes to videos.' +
					'<br><br>' +
					'To install the CLI you need to have installed <b>npm</b> which typically comes with <b>NodeJS</b>.' +
					'To install or upgrade the CLI run the following <b>npm</b> command:' +
					'<br><br>' +
					'<code>npm -g install @angular/cli</code>' +
					'<br><br>' +
					'To verify that the CLI has been installed correctly, open a console and run:' +
					'<br><br>' +
					'<code>ng version</code>' +
					'<br><br>' +
					'<h2>Install dependencies</h2>' +
					'<br>' +
					"To moderate the images we'll need a few Node.js packages:" +
					'<br><br>' +
					'<ul>' +
					'<li>' +
					'The Google Cloud Vision Client Library for Node.js: @google-cloud/vision to run the image through the Cloud Vision API to detect inappropriate images.' +
					'</li>' +
					'<br>' +
					'<li>' +
					'The Google Cloud Storage Client Library for Node.js: @google-cloud/storage to download and upload the images from Cloud Storage.' +
					'</li>' +
					'<br>' +
					'<li>' +
					'A Node.js library allowing us to run processes: child-process-promise to run ImageMagick since the ImageMagick command-line tool comes pre-installed on all Functions instances.' +
					'</li>' +
					'</ul>' +
					'<br>' +
					'To install these three packages into your Cloud Functions app, run the following npm install --save command. Make sure that you do this from the functions directory.' +
					'<br><br>' +
					'<code>npm install --save @google-cloud/vision @google-cloud/storage child-process-promise</code>' +
					'<br><br>' +
					'This will install the three packages locally and add them as declared dependencies in your package.js file.'
			},
			{
				id: '2',
				title: 'Subir archivo CSV',
				content:
					'<h1>Step 3 - Create a Firebase project and Set up your app</h1>' +
					'<br>' +
					'This is an example step of the course. You can put anything in here from example codes to videos.' +
					'<br><br>' +
					'To install the CLI you need to have installed <b>npm</b> which typically comes with <b>NodeJS</b>.' +
					'To install or upgrade the CLI run the following <b>npm</b> command:'

			},
			{
				id: '3',
				title: 'Verificar Datos',
				content:
					'<h1>Verificar los datos de los usuarios</h1>' +
					'<br>' +
					'This is an example step of the course. You can put anything in here from example codes to videos.' +
					'<br><br>' +
					'To install the CLI you need to have installed <b>npm</b> which typically comes with <b>NodeJS</b>.' +
					'To install or upgrade the CLI run the following <b>npm</b> command:'

			},
			{
				id: '4',
				title: 'Resultados',
				content:
					'<h1>Paso 5 - Resultados de la Asinacion de Licencias</h1>' +
					'<br>' +
					'This is an example step of the course. You can put anything in here from example codes to videos.' +
					'<br><br>' +
					'To install the CLI you need to have installed <b>npm</b> which typically comes with <b>NodeJS</b>.' +
					'To install or upgrade the CLI run the following <b>npm</b> command:' +
					'<br><br>' +
					'<code>npm -g install @angular/cli</code>' +
					'<br><br>' +
					'To verify that the CLI has been installed correctly, open a console and run:' +
					'<br><br>'

			}

		];
		const course = {
			id: '1',
			title: 'Asignar Licencias',
			slug: 'asignar-licencias',
			description: '',
			category: 'web',
			length: 30,
			totalSteps: 11,
			activeStep: 0,
			updated: 'Jun 28, 2017',
			steps: demoSteps
		}
		const activeStep =  1;

	}


	handleChangeActiveStep(index) {
		this.setState({ activeStep: index + 1 });
	}

	handleNext() {
		this.setState({ activeStep: this.activeStep + 1 });
	}

	handleBack() {
		this.setState({ activeStep: this.activeStep - 1 });
	}
	render() {
		return (
			<FusePageSimple
				classes={{
					content: 'flex flex-col flex-auto overflow-hidden',
					header: 'h-72 min-h-72'
				}}
				header={
					<div className="flex flex-1 items-center px-16 lg:px-24">
						<Hidden lgUp>
							<IconButton
								aria-label="open left sidebar"
							>
								<Icon>menu</Icon>
							</IconButton>
						</Hidden>

						{this.course && <Typography className="flex-1 text-20 mx-16">Asignar Licencias</Typography>}
					</div>
				}
				content={
					this.course && (
						<div className="flex flex-1 relative overflow-hidden">
							<FuseScrollbars className="w-full overflow-auto">
								<SwipeableViews
									className="overflow-hidden"
									index={this.state.activeStep - 1}
									enableMouseEvents
									onChangeIndex={this.handleChangeActiveStep}
								>
									{this.course.steps.map((step, index) => (
										<div
											className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64"
											key={step.id}
										>
											<Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
												<div
													dangerouslySetInnerHTML={{ __html: step.content }}
													dir={'ltr'}
												/>
											</Paper>
										</div>
									))}
								</SwipeableViews>
							</FuseScrollbars>

							<div className="flex justify-center w-full absolute left-0 right-0 bottom-0 pb-16 md:pb-32">
								<div className="flex justify-between w-full max-w-xl px-8">
									<div>
										{this.state.activeStep !== 1 && (
											<Fab className="" color="secondary" onClick={this.handleBack}>
												<Icon>{'chevron_left'}</Icon>
											</Fab>
										)}
									</div>
									<div>
										{this.state.activeStep < this.course.steps.length ? (
											<Fab className="" color="secondary" onClick={this.handleNext}>
												<Icon>{'chevron_right'}</Icon>
											</Fab>
										) : (
											<Fab className={'this.classes.successFab'} to="/apps/academy/courses" component={Link}>
												<Icon>check</Icon>
											</Fab>
										)}
									</div>
								</div>
							</div>
						</div>
					)
				}
				leftSidebarContent={
					this.course && (
						<Stepper classes={{ root: 'bg-transparent' }} activeStep={this.state.activeStep - 1} orientation="vertical">
							{this.course.steps.map((step, index) => {
								return (
									<Step key={step.id} onClick={() => this.handleChangeActiveStep(index)}>
										<StepLabel classes={{ root: 'this.classes.stepLabel' }}>{step.title}</StepLabel>
									</Step>
								);
							})}
						</Stepper>
					)
				}
				innerScroll

			/>
		);
	}
}
export default withReducer('academyApp', reducer)(Course);
