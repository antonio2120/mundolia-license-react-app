import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, {Component} from 'react';
import FuseAnimate from "../../../@fuse/core/FuseAnimate/FuseAnimate";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import FuseScrollbars from "../../../@fuse/core/FuseScrollbars/FuseScrollbars";
import SwipeableViews from "react-swipeable-views";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import {Link} from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/ArrowRight';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import CSVReader from 'react-csv-reader'

const useStyles = makeStyles(theme => ({
	layoutRoot: {},
	button: { margin: theme.spacing(1),}
}));

const papaparseOptions = {
	header: true,
	dynamicTyping: true,
	skipEmptyLines: true,
	transformHeader: header =>
		header
			.toLowerCase()
			.replace(/\W/g, '_')
}

const colsCsv = [
	"tipo_usuario",
	"nombre",
	"segundo_nombre",
	"apellido_paterno",
	"apellido_materno",
	"email",
	"seccion",
	"grado",
	"nombre_padre_madre_o_tutor",
	"mail_padre"
	];
class LicenciasPage extends Component {

	constructor(props) {

		super(props);
		this.state = {
			activeStep: 1,
			records:null
		};

	}
	handleForce = res =>{
		console.log(res);

	}
	handleDarkSideForce = error =>{
		console.log(error);
		alert("Error al cargar el archivo.");
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

				// contentToolbar={
				// 	<div className="px-24">
				// 		<h4>Subir Archivo</h4>
				// 	</div>
				// }
				content={
					<div className="flex flex-1 relative overflow-hidden">
						<FuseScrollbars className="w-full overflow-auto">
							<SwipeableViews
								className="overflow-hidden"
								index={this.state.activeStep - 1}
								enableMouseEvents
								onChangeIndex={this.handleChangeActiveStep}
								animateHeight
							>
								<div className="flex justify-center p-10 pb-64 sm:p-24 sm:pb-30 md:p-20 md:pb-30" key={0}>
									<Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
										<div className="p-20">
											<div>
												<h1 className="py-16">Descargar Plantilla para carga de usuarios</h1>
												<a href={'assets/images/user-import/Plantilla_Usuarios_LIA.xlsx'}>
													<ListItem>
														<ListItemAvatar>
															<Avatar>
																<img src={'assets/images/user-import/xls_ico.png'} />
															</Avatar>
														</ListItemAvatar>
														<ListItemText primary="Plantilla_Usuarios_LIA.xlsx"
														/>
													</ListItem>
												</a>
												<p>
													Una vez descargado el archivo en formato XLSX (MS Excel), podrá vaciar la información requerida para importar sus usuarios.
												</p>
												<p>
													Al finalizar, deberá guardar este archivo en formato CSV, como se describe a continuación:
												</p>
												<List>
													<ListItem>
														<ListItemAvatar>
															<Avatar>
																<FolderIcon />
															</Avatar>
														</ListItemAvatar>
														<ListItemText primary="Menú Archivo"
														/>
													</ListItem>
													<ListItem>
														<ListItemAvatar>
															<Avatar>
																<FolderIcon />
															</Avatar>
														</ListItemAvatar>
														<ListItemText primary="Guardar Como"
														/>
													</ListItem>
													<ListItem>
														<ListItemAvatar>
															<Avatar>
																<FolderIcon />
															</Avatar>
														</ListItemAvatar>
														<ListItemText primary="Cambiar el tipo de archivo por: CSV (delimitado por comas) (*.csv)"
														/>
													</ListItem>
													<ListItem>
														<ListItemAvatar>
															<Avatar>
																<FolderIcon />
															</Avatar>
														</ListItemAvatar>
														<ListItemText primary="Guardar"/>
													</ListItem>
												</List>
												<p><img src="assets/images/user-import/xlsx1.jpg" alt=""/></p>

											</div>
										</div>
									</Paper>
								</div>
								<div className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64" key={1}>
									<Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1} margin={'dense'}>
										<div className="p-20">
											<div >
												<h1 className="py-16">Subir archivo con la información de usuarios en formato CSV</h1>

												<CSVReader
													cssClass="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary"
													onFileLoaded={this.handleForce}
													onError={this.handleDarkSideForce}
													parserOptions={papaparseOptions}
													inputId="ObiWan"
													inputStyle={{color: 'red'}}
												/>

												<p className="py-16">
													El archivo en formato CSV (delimitado por comas), es resultado de la edición de la plantilla en formato XLSX.
												</p>
												<p>Ejemplo:</p>

												<ListItem className="py-16">
													<ListItemAvatar>
														<Avatar>
															<img src={'assets/images/user-import/csv_ico.png'} />
														</Avatar>
													</ListItemAvatar>
													<ListItemText primary="Plantilla_Usuarios_LIA.csv"
													/>
												</ListItem>

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
