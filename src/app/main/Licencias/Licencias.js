
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, {Component} from 'react';
import FuseAnimate from "../../../@fuse/core/FuseAnimate/FuseAnimate";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import ReactFileReader from 'react-file-reader';
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import FuseScrollbars from "../../../@fuse/core/FuseScrollbars/FuseScrollbars";
import SwipeableViews from "react-swipeable-views";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

class LicenciasPage extends Component {

	constructor(props) {

		super(props);
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
	}
	handleFiles = files => {
		var reader = new FileReader();
		reader.onload = function (e) {
			// Use reader.result
			alert(reader.result)
		}
		reader.readAsText(files[0]);
	}
	handleChangeActiveStep(index) {
		this.setState({ activeStep: index + 1 });
	}

	handleNext() {
		this.setState({ activeStep: this.state.activeStep + 1 })
	}

	handleBack() {
		this.setState({ activeStep: this.state.activeStep - 1 })
	}

	render() {
		return (
			<FusePageSimple
				classes={{
					content: 'flex flex-col flex-auto overflow-hidden',
					header: 'h-72 min-h-72'
				}}
				header={
					<div className="flex items-center">
						<FuseAnimate animation="transition.expandIn" delay={300}>
							<Icon className="text-32">account_box</Icon>
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography variant="h6" className="mx-12 hidden sm:flex">
								Asignar Licencias
							</Typography>
						</FuseAnimate>
					</div>
				}

				contentToolbar={
					<div className="px-24">
						<h4>Subir Archivo</h4>
					</div>
				}
				content={
					<div className="flex flex-1 relative overflow-hidden">
						<FuseScrollbars className="w-full overflow-auto">
							<SwipeableViews
								className="overflow-hidden"
								index={this.state.activeStep - 1}
								enableMouseEvents
								onChangeIndex={this.handleChangeActiveStep}
							>
								<div className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64" key={0}>
									<Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
										<div className="p-24">
											<h4>Content</h4>
											<br />
											<div>
												<ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
													<button className='btn'>Upload</button>
												</ReactFileReader>

												<h1 className="py-16">Early Sunrise</h1>
												<h4 className="pb-12">Demo Content</h4>
												<p>
													One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a
													horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his
													brown belly, slightly domed and divided by arches into stiff sections.
												</p>

											</div>
										</div>
									</Paper>
								</div>
								<div className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64" key={1}>
									<Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
										<div className="p-24">
											<h4>Content</h4>
											<br />
											<div>
												<ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
													<button className='btn'>Upload</button>
												</ReactFileReader>

												<h1 className="py-16">Early Sunrise</h1>
												<h4 className="pb-12">Demo Content</h4>
												<p>
													One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a
													horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his
													brown belly, slightly domed and divided by arches into stiff sections.
												</p>

											</div>
										</div>
									</Paper>
								</div>
								<div className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64" key={2}>
									<Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
										<div className="p-24">
											<h4>Content</h4>
											<br />
											<div>
												<ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
													<button className='btn'>Upload</button>
												</ReactFileReader>

												<h1 className="py-16">Early Sunrise</h1>
												<h4 className="pb-12">Demo Content</h4>
												<p>
													One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a
													horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his
													brown belly, slightly domed and divided by arches into stiff sections.
												</p>

											</div>
										</div>
									</Paper>
								</div>
								<div className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64" key={3}>
									<Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
										<div className="p-24">
											<h4>Content</h4>
											<br />
											<div>
												<ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
													<button className='btn'>Upload</button>
												</ReactFileReader>

												<h1 className="py-16">Early Sunrise</h1>
												<h4 className="pb-12">Demo Content</h4>
												<p>
													One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a
													horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his
													brown belly, slightly domed and divided by arches into stiff sections.
												</p>

											</div>
										</div>
									</Paper>
								</div>
							</SwipeableViews>
						</FuseScrollbars>
						<div className="flex justify-center w-full absolute left-0 right-0 bottom-0 pb-16 md:pb-32">
							<div className="flex justify-between w-full max-w-xl px-8">
								<div>
									{this.state.activeStep !== 1 && (
										<Fab className="" color="secondary" onClick={() => this.handleBack()}>
											<Icon>{'chevron_left'}</Icon>
										</Fab>
									)}
								</div>
								<div>
									{this.state.activeStep < 4 ? (
										<Fab className="" color="secondary" onClick={() => this.handleNext()}>
											<Icon>{'chevron_right'}</Icon>
										</Fab>
									) : (
										<Fab className={'this.classes.successFab'} to="/licencias" component={Link}>
											<Icon>check</Icon>
										</Fab>
									)}
								</div>
							</div>
						</div>
					</div>


				}
				leftSidebarContent={

					<Stepper classes={{ root: 'bg-transparent' }} activeStep={this.state.activeStep - 1} orientation="vertical">

						<Step key={0} onClick={() => this.handleChangeActiveStep(0)}>
							<StepLabel classes={{ root: 'this.classes.stepLabel' }}>
								Descargar Plantilla
							</StepLabel>
						</Step>
						<Step key={1} onClick={() => this.handleChangeActiveStep(0)}>
							<StepLabel classes={{ root: 'this.classes.stepLabel' }}>
								Subir archivo CSV
							</StepLabel>
						</Step>
						<Step key={2} onClick={() => this.handleChangeActiveStep(0)}>
							<StepLabel classes={{ root: 'this.classes.stepLabel' }}>
								Verificar Datos
							</StepLabel>
						</Step>
						<Step key={0} onClick={() => this.handleChangeActiveStep(0)}>
							<StepLabel classes={{ root: 'this.classes.stepLabel' }}>
								Resultados
							</StepLabel>
						</Step>

					</Stepper>

				}
			/>
		);
	}


}

export default LicenciasPage;
