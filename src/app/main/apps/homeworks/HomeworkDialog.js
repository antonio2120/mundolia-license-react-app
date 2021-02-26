import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitCreateHomework } from './store/homeworkSlice';
import {showMessage} from "../../../store/fuse/messageSlice";


import {
	removeHomework,
	closeNewHomeworkDialog,
	closeEditHomeworkDialog,
    addHomework,
	closeEditContactDialog,
	submitUpdateHomework
} from './store/homeworkSlice';
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import {TextFieldFormsy} from "../../../../@fuse/core/formsy";
import Formsy from "formsy-react";
import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";

const defaultFormState = {
	id: '',
    name: '',
	teacherId: '',
    schoolId: '',
    grade: '',
	uuid : '',
	teachers_name: '',
	avatar: 'assets/images/avatars/profile.jpg',	
    
};

function HomeworkDialog(props) {
    const dispatch = useDispatch();
    const homeworkDialog = useSelector(({ HomeworksApp }) => HomeworksApp.homework.homeworkDialog);
	const formOrigin = useSelector(({ HomeworksApp }) => HomeworksApp.homework.homeworkDialog.data);
	const homework = useSelector(({ HomeworksApp }) => HomeworksApp.homework.homework);
	const teachers = useSelector(({ HomeworksApp }) => HomeworksApp.teachers.data);
	const { form, handleChange, setForm} = useForm(defaultFormState);

	console.log(teachers);

	const [values, setValues] = React.useState({
		// showPassword: false,
		loading : false
	});
	const [isFormValid, setIsFormValid] = useState(false);
	// const [showPassword, setShowPassword] = useState(false);
	const formRef = useRef(null);


	function disableButton() {
		setIsFormValid(false);
	}

	const initDialog = useCallback(() => {
		// /**
		//  * Dialog type: 'edit'
		//  */
		if ((homeworkDialog.type === 'edit')&& homeworkDialog.data) {
			setForm({ ...homeworkDialog.data });
		}


		/**
		 * Dialog type: 'new'
		 */
		if (homeworkDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...homeworkDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [homeworkDialog.data, homeworkDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (homeworkDialog.props.open) {
			initDialog();
		}
	}, [homeworkDialog.props.open, initDialog]);

	useEffect(() => {
		if (homework.error) {

			if (homework.error.response.request.status == '500') {
				setValues({...values, loading: false});
				dispatch(showMessage({message: homework.error.data.message, variant: 'error'}));
			} else 
			{

				disableButton();
				setValues({...values, loading: false});
				
				if (homework.error.response.data.message.schoolId){
					dispatch(showMessage({message: 'El usuario no tiene escuela', variant: 'error'}));
				}
				else{
					if (homework.error.response.data.message.includes("No query results")){
						dispatch(showMessage({message: 'Grupo invalido. Contacta al administrador.', variant: 'error'}));
					}
					else{
						dispatch(showMessage({message: homework.error.response.data.message, variant: 'error'}));
					}
				}
			}
		}

		if(homework.success){
			setValues({ ...values, loading: false });
			dispatch(showMessage({message:'Operación exitosa!',variant: 'success'	}));

			closeComposeDialog();
		}
	}, [homework.error,homework.success]);
    
	function closeComposeDialog() {
        return (homeworkDialog.type === 'edit' )? dispatch(closeEditHomeworkDialog()) : dispatch(closeNewHomeworkDialog());
        // return  dispatch(closeNewHomeworkDialog());
	}

	function handleSubmit(event) {
		setValues({ ...values, loading: true });
		event.preventDefault();

		if (homeworkDialog.type === 'new') {
			dispatch(submitCreateHomework(form));
		}
		else 
		if (homeworkDialog.type === 'edit'){
			dispatch(submitUpdateHomework(form,formOrigin));
		}
		// else {
		// 	dispatch(submitUpdateContactHomework(form,users));
		// }
	}

	function handleRemove() {
		dispatch(removeHomework(formOrigin.id));
		closeComposeDialog();
	}
	function enableButton() {
		setIsFormValid(true);
	}
	function validateForm (values) {
		setForm(values);
	}
	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...homeworkDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{homeworkDialog.type === 'new' && 'Nuevo Grupo'}
						{homeworkDialog.type === 'edit' && 'Editar Grupo'}
						{/*{homeworkDialog.type === 'editHomework' && 'Editar '+ users.length+' usuario(s)'}
						{homeworkDialog.type === 'massiveMessage' && 'Crear mensaje para Usuarios'} */}
					</Typography>
				</Toolbar>
					<div className="flex flex-col items-center justify-center pb-24">
						{/* <Avatar className="w-96 h-96" alt="contact avatar" src={form.avatar} /> */}
						{homeworkDialog.type === 'edit' && (
							<Typography variant="h6" color="inherit" className="pt-8">
								{form.name}
							</Typography>
						)}
					</div>
			</AppBar>
			<Formsy
				onValidSubmit={handleSubmit}
				onChange={validateForm}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col md:overflow-hidden"
			>
				<DialogContent classes={{ root: 'p-24' }}>
					
					<TextFieldFormsy
						fullWidth
						className="mb-16"
						type="text"
						name="name"
						label="Nombre del Grupo"
						id="name"
						value={form.name}
						onChange={handleChange}
						validations={{
							minLength: 2
						}}
						validationErrors={{
							minLength: 'Min character length is 4'
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Icon className="text-20" color="action">
										star
									</Icon>
								</InputAdornment>
							)
						}}
						variant="outlined"
						required
					/>

					{homeworkDialog.type === 'new' ? 
						(
						<SelectFormsy
							id="grade"
							name="grade"
							width="100%"
							value={form.grade}
							onChange={handleChange}
							label="Grado"
							fullWidth
							variant="outlined"
							className="mb-24 MuiInputBase-fullWidth"
							required
						>
							<MenuItem key={'grade1'} value={1}>1</MenuItem>
							<MenuItem key={'grade2'} value={2}>2</MenuItem>
							<MenuItem key={'grade3'} value={3}>3</MenuItem>
							<MenuItem key={'grade4'} value={4}>4</MenuItem>
							<MenuItem key={'grade5'} value={5}>5</MenuItem>
							<MenuItem key={'grade6'} value={6}>6</MenuItem>
						</SelectFormsy>
						):null}

						{ teachers ?

							<SelectFormsy
								id="teacher"
								name="teacher"
								width="100%"
								value={form.teacher}
								onChange={handleChange}
								label="Maestro"
								fullWidth
								variant="outlined"
								className="mb-24 MuiInputBase-fullWidth"
								required
							>
								{teachers.map((row) => (
									<MenuItem key={row.id} value={row}>{row.teachers_name}</MenuItem>
								))
								}
							</SelectFormsy>
							:
							<CircularProgress color="secondary"/>
						}
				

		
					{values.loading && <LinearProgress />}

				</DialogContent>
				 {homeworkDialog.type === 'new' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								type="submit"
								disabled={( values.loading || !isFormValid)}
							>
								Agregar
							</Button>
						</div>
					</DialogActions>
                     
                
                ) 
                : null
            }
                
                { homeworkDialog.type === 'edit' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								type="submit"
								onClick={handleSubmit}
								disabled={(values.loading || !isFormValid)}
							>
								Guardar
							</Button>
						</div>
							<IconButton 
							onClick={handleRemove} 
							disabled={(values.loading)}>
								<Icon>delete</Icon>
							</IconButton>
					</DialogActions> 
				)
				: null
				}
			</Formsy>
		</Dialog>
	);
}

export default HomeworkDialog;
