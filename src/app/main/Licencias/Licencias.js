import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React, {Component, useCallback} from 'react';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/ArrowRight';
import Button from '@material-ui/core/Button';
import CSVReader from 'react-csv-reader'
import LinearProgress from '@material-ui/core/LinearProgress';
import SimpleTable from './Table'
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import _ from "../../../@lodash";

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

	async componentDidMount() {
		const response = await axios.get(process.env.REACT_APP_API+'/schools')
			.then(response => {

			if (response.data) {
				this.setState({ schools:response.data, school_id:response.data[0].id});
			}
		}).catch(error => {

		});
	}

	constructor(props) {
		super(props);
		this.state = {
			activeStep: 1,
			recordsOK:null,
			file:false,
			loading: false,
			resultImport:null,
			error:false,
			errorMessage:null,
			schools :null,
			school_id : null
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleForce = res =>{
		this.setState({loading: true, recordsOK:null, file:false, error: false})
		const result = [];
		const resultAll = [];
		let valid = 'Invalido';
		let i =0;
		let iAll =0;
		res.map((row) => {
			valid = 'Invalido';
			if (row.tipo_usuario  && row.nombre  && (row.apellido_paterno  || row.apellido_materno )  && row.email  && row.seccion  && row.grado  ) {
				valid = 'Valido';

				result[i] = {
					tipo_usuario: row.tipo_usuario,
					nombre: row.nombre,
					username: '',
					segundo_nombre: row.segundo_nombre,
					apellido_paterno: row.apellido_paterno,
					apellido_materno: row.apellido_materno,
					email: row.email,
					seccion: row.seccion,
					grado: row.grado,
					school_id: null,
					nombre_padre_madre_o_tutor: row.nombre_padre_madre_o_tutor,
					mail_padre: row.mail_padre,
					result: 'Valido'
				}
				++i;
			}

		});
		this.setState({recordsOK: result, recordsAll: resultAll, file: true, activeStep: 3, loading: false});

	}
	handleDarkSideForce = error =>{
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
		document.querySelector('.csv-input').value = ''
	}
	handleEnd() {
		document.querySelector('.csv-input').value = ''
		this.setState({
			activeStep: 1,
			recordsOK:null,
			recordsAll: null,
			file:false,
			loading: false,
			resultImport:null,
			error: false,
			errorMessage:null
		})
	}
	async handleImport() {
		let data = null;
		this.setState({loading: true, resultImport:null, error: false});
		 const response = await axios.post(process.env.REACT_APP_API+'/importar/usuarios', {
		 	data: this.state.recordsOK,
			school_id:this.state.school_id
		 }).then(response => {
			 if (response.data) {
				 data = response.data;
				 this.setState({loading: false, resultImport:data,activeStep: 4});
			 } else {
				 this.setState({loading: false, error: true, errorMessage: 'Error al procesar la información'});
			 }
		 }).catch(error => {
			 this.setState({
				 loading: false,
				 error: true,
				 errorMessage: 'Se ha producido un error en el Servidor. Por favor contacte al administrador. '
			 });
		 });
		this.setState({loading: false, resultImport:data});

	}
	handleChange(event) {
		this.setState({school_id: event.target.value});
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

				content={
					<div className="flex flex-1 relative overflow-hidden">
						<FuseScrollbars className="w-full overflow-auto">
							<SwipeableViews
								className="overflow-hidden"
								index={this.state.activeStep - 1}
								onChangeIndex={this.handleChangeActiveStep}

							>
								<div className="flex justify-center p-10 pb-64 sm:p-24 sm:pb-30 md:p-20 md:pb-30" key={0}>
									<Paper className="w-full  rounded-8 p-16 md:p-24" elevation={1}>
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
													<ListItem key={'li1'}>
														<ListItemAvatar>
															<Avatar>
																<FolderIcon />
															</Avatar>
														</ListItemAvatar>
														<ListItemText primary="Menú Archivo"
														/>
													</ListItem>
													<ListItem key={'li2'}>
														<ListItemAvatar>
															<Avatar>
																<FolderIcon />
															</Avatar>
														</ListItemAvatar>
														<ListItemText primary="Guardar Como"
														/>
													</ListItem>
													<ListItem key={'li3'}>
														<ListItemAvatar>
															<Avatar>
																<FolderIcon />
															</Avatar>
														</ListItemAvatar>
														<ListItemText primary="Cambiar el tipo de archivo por: CSV (delimitado por comas) (*.csv)"
														/>
													</ListItem>
													<ListItem key={'li4'}>
														<ListItemAvatar>
															<Avatar>
																<FolderIcon />
															</Avatar>
														</ListItemAvatar>
														<ListItemText primary="Guardar"/>
													</ListItem>
												</List>
												<p><img className={'max-w-md'} src="assets/images/user-import/xlsx1.jpg" alt=""/></p>

											</div>
										</div>
									</Paper>
								</div>
								<div className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64" key={1}>
									<Paper className="w-full  rounded-8 p-16 md:p-24" elevation={1} margin={'dense'}>
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
													disabled ={this.state.loading}
													fileEncoding={'UTF-8'}
												/>
												{this.state.loading && (<LinearProgress color="secondary" />)}

												<p className="py-16">
													El archivo en formato CSV UTF-8(delimitado por comas), es resultado de la edición de la plantilla en formato XLSX.
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
									<Paper className="w-full rounded-8 p-16 md:p-24" elevation={1}>
										<div className="p-24">
											<h1 className="py-16">Datos a Procesar</h1>
											<div className="flex">

												<FormControl variant="outlined" className="mb-24" fullWidth>
													<InputLabel id="school-label">Escuela</InputLabel>

													{this.state.schools ?
														(
															<Select
																labelId="school-label"
																id="school_id"
																name="school_id"
																value={this.state.school_id}
																onChange={this.handleChange}
																label="Escuela"
																fullWidth
															>
																{this.state.schools.map((row) =>(<MenuItem value={row.id}>{row.School}</MenuItem>))}
															</Select>
														):
														<CircularProgress color="secondary"/>
													}
												</FormControl>
											</div>
											{this.state.recordsOK ?
												(<SimpleTable data={this.state.recordsOK}/>) :
												(<h1 className="py-16">No hay datos a procesar</h1>)
											}
										</div>
										<div className="p-24">
											<Button variant="contained" color="primary"
													disabled={this.state.loading || !this.state.recordsOK}
													onClick={() => this.handleImport()}>
												Importar Usuarios
											</Button>
											{this.state.error && (<Alert severity="error">{this.state.errorMessage}</Alert>)}
										</div>
										<div className="p-24">
											{this.state.loading && (<LinearProgress color="secondary" />)}
										</div>
									</Paper>
								</div>
								<div className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64" key={3}>
									<Paper className="w-full rounded-8 p-16 md:p-24" elevation={1}>
										<div className="p-24">
											<h1 className="py-16">Resultados de la importación</h1>
											{this.state.resultImport ?
												(<SimpleTable data={this.state.resultImport}/>) :
												(<h1 className="py-16">No hay resultados</h1>)
											}
										</div>
									</Paper>
								</div>
							</SwipeableViews>
						</FuseScrollbars>
						<div className="flex justify-center w-full absolute left-0 right-0 bottom-0 pb-16 md:pb-32">
							<div className="flex  w-full px-8">
								<div>
									{(this.state.activeStep !== 1 && this.state.activeStep !== 4 )&& (
										<Fab className="" color="secondary" onClick={() => this.handleBack()} disabled={this.state.loading}>
											<Icon>{'chevron_left'}</Icon>
										</Fab>
									)}
								</div>
								<div>
									{this.state.activeStep === 1 && (
										<Fab className="" color="secondary" onClick={() => this.handleNext()} disabled={this.state.loading}>
											<Icon>{'chevron_right'}</Icon>
										</Fab>
									)
									}
								</div>
								<div>
									{this.state.activeStep === 4 && (
										<Fab color="secondary" onClick={() => this.handleEnd()} disabled={this.state.loading}>
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

						<Step key={0} >
							<StepLabel classes={{ root: 'this.classes.stepLabel' }}>
								Descargar Plantilla
							</StepLabel>
						</Step>
						<Step key={1} >
							<StepLabel classes={{ root: 'this.classes.stepLabel' }}>
								Subir archivo CSV
							</StepLabel>
						</Step>
						<Step key={2} >
							<StepLabel classes={{ root: 'this.classes.stepLabel' }}>
								Verificar Datos
							</StepLabel>
						</Step>
						<Step key={4} >
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
