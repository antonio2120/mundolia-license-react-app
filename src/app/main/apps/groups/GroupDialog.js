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
import { submitCreateGroup } from './store/groupSlice';
import {showMessage} from "../../../store/fuse/messageSlice";


import {
	// removeContact,
	// updateContact,
	// addContact,
    closeNewGroupDialog,
    addGroup
	// closeEditContactDialog,
	// sendEmail
} from './store/groupSlice';
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import {TextFieldFormsy} from "../../../../@fuse/core/formsy";
import Formsy from "formsy-react";
import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";

const defaultFormState = {
    groupName: '',
	teacherId: '',
    schoolId: '',
    grade: '',
	uuid : '',
	avatar: 'assets/images/avatars/profile.jpg',	
    
};

function GroupDialog(props) {
    const dispatch = useDispatch();
    const groupDialog = useSelector(({ GroupsApp }) => GroupsApp.group.groupDialog);
	const formOrigin = useSelector(({ GroupsApp }) => GroupsApp.group.groupDialog.data);
	const group = useSelector(({ GroupsApp }) => GroupsApp.group.group);
	const teachers = useSelector(({ GroupsApp }) => GroupsApp.teachers.data);
	const { form, handleChange ,setForm} = useForm(defaultFormState);

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
		// if ((contactDialog.type === 'edit' || contactDialog.type === 'editGroup' )&& contactDialog.data) {
		// 	setForm({ ...contactDialog.data });
		// }


		/**
		 * Dialog type: 'new'
		 */
		if (groupDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...groupDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [groupDialog.data, groupDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (groupDialog.props.open) {
			initDialog();
		}
	}, [groupDialog.props.open, initDialog]);

	useEffect(() => {
		if (group.error) {

			if (group.error.response.request.status == '500') {
				setValues({...values, loading: false});
				dispatch(showMessage({message: group.error.data.message, variant: 'error'}));
			} else 
			{

				disableButton();
				setValues({...values, loading: false});
				dispatch(showMessage({message: 'Faltan campos requeridos', variant: 'error'}));
			}
		}

		if(group.success){
			setValues({ ...values, loading: false });
			dispatch(showMessage({message:'Operación exitosa!',variant: 'success'	}));

			closeComposeDialog();
		}
	}, [group.error,group.success]);
    
	function closeComposeDialog() {
        // return (contactDialog.type === 'edit' || contactDialog.type === 'editGroup')? dispatch(closeEditContactDialog()) : dispatch(closeNewContactDialog());
        return  dispatch(closeNewGroupDialog());
	}

	function handleSubmit(event) {
		setValues({ ...values, loading: true });
		event.preventDefault();

		if (groupDialog.type === 'new') {
			dispatch(submitCreateGroup(form));
		}
		// else if (contactDialog.type === 'massiveMessage'){
		// 	var data = {...form, uuids:formOrigin}
		// 	dispatch(sendEmail(data));
		// 	closeComposeDialog();
		// 	setValues({ ...values, loading: false });
		// }
		// else if (contactDialog.type === 'edit'){
		// 	dispatch(submitUpdateContact(form,formOrigin));
		// }
		// else {
		// 	dispatch(submitUpdateContactGroup(form,users));
		// }
	}

	// function handleRemove() {
	// 	dispatch(removeContact(formOrigin.uuid));
	// 	closeComposeDialog();
	// }
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
			{...groupDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{groupDialog.type === 'new' && 'Nuevo Grupo'}
						{/*{groupDialog.type === 'edit' && 'Editar Grupo'}
						{groupDialog.type === 'editGroup' && 'Editar '+ users.length+' usuario(s)'}
						{groupDialog.type === 'massiveMessage' && 'Crear mensaje para Usuarios'} */}
					</Typography>
				</Toolbar>
				{/* {(groupDialog.type !== 'editGroup' && groupDialog.type !== 'massiveMessage') && (
					<div className="flex flex-col items-center justify-center pb-24">
						<Avatar className="w-96 h-96" alt="contact avatar" src={form.avatar} />
						{groupDialog.type === 'edit' && (
							<Typography variant="h6" color="inherit" className="pt-8">
								{form.name}
							</Typography>
						)}
					</div>
				)} */}
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
						name="groupName"
						label="Nombre del Grupo"
						id="groupName"
						value={form.groupName}
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
									// <MenuItem key={'school'+row.id} value={row.id}>{row.School}</MenuItem>)

									<MenuItem key={row.email} value={row}>{row.email}</MenuItem>
								))
								}
							</SelectFormsy>
							:
							<CircularProgress color="secondary"/>
						}
				

		
					{values.loading && <LinearProgress />}

				</DialogContent>
				 {groupDialog.type === 'new' ? (
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
                
                {/*: groupDialog.type === 'massiveMessage' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								type="submit"
								disabled={( values.loading || !isFormValid)}
							>
								Enviar
							</Button>
						</div>
					</DialogActions>
				) : (
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
						{groupDialog.type !== 'editGroup' && (
							<IconButton onClick={handleRemove} disabled={(values.loading)}>
								<Icon>delete</Icon>
							</IconButton>
						)}
					</DialogActions> 
				)}*/}
			</Formsy>
		</Dialog>
	);
}

export default GroupDialog;
