import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
// import Avatar from '@material-ui/core/Avatar';
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
import {showMessage} from "../../../store/fuse/messageSlice";
import {
	closeUserInfoDialog,
	submitUpdateUserInfo
} from './store/userInfoSlice';
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import {TextFieldFormsy} from "../../../../@fuse/core/formsy";
import Formsy from "formsy-react";
import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";

const defaultFormState = {
	uuid: '',
    displayName: '',
	email: '',
    role: '',	
	password :'',
};

function UserInfoDialog(props) {
    const dispatch = useDispatch();
    const UserInfoDialog = useSelector(({ adminLicenciasApp }) => adminLicenciasApp.user.UserInfoDialog);
	// const uuid = useSelector(({ adminLicenciasApp }) => adminLicenciasApp.user.entities );
	// const formOrigin = useSelector(({ adminLicenciasApp }) => adminLicenciasApp.user.data[0]);
	// console.log(formOrigin);
	const userInfo = useSelector(({ adminLicenciasApp }) => adminLicenciasApp.user.userInfo);

	const { form, handleChange ,setForm} = useForm(defaultFormState);
	const [selectedFile, setSelectedFile] = useState(null);
	const [fileType, setFileType] = useState('file');
	///Getting date time

	const [values, setValues] = React.useState({
		showPassword: false,
		loading : false
	});
	const [isFormValid, setIsFormValid] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const formRef = useRef(null);

	function disableButton() {
		setIsFormValid(false);
	}

	const initDialog = useCallback(() => {
		// /**
		//  * Dialog type: 'edit'
		//  */
		if ((UserInfoDialog.type === 'edit')&& UserInfoDialog.data) {
			setForm({ ...UserInfoDialog.data });
		}


	}, [UserInfoDialog.data, UserInfoDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (UserInfoDialog.props.open) {
			initDialog();
		}
	}, [UserInfoDialog.props.open, initDialog]);

	useEffect(() => {
		if (userInfo.error) {

			if (userInfo.error.response.request.status == '500') {
				setValues({...values, loading: false});
				// dispatch(showMessage({message: activity.error.response.data.message, variant: 'error'}));
			} else 
			{
				disableButton();
				setValues({...values, loading: false});
				dispatch(showMessage({message: userInfo.error.response.data.message, variant: 'error'}));
			}
		}

		if(userInfo.success){
			setValues({ ...values, loading: false });
			dispatch(showMessage({message:'Operación exitosa!', variant: 'success'	}));
			dispatch(showMessage({message:'Usuario actualizado correctamente.', variant: 'success' }));

			closeComposeDialog();
		}

	}, [userInfo.error,userInfo.success]);
    
	function closeComposeDialog() {
		return (UserInfoDialog.type === 'edit' )?  dispatch(closeUserInfoDialog()) : null ;
	}

	function handleSubmit(event) {
		setValues({ ...values, loading: true });
		event.preventDefault();
		form.uuid = UserInfoDialog.data.uuid; 
		form.role_id = UserInfoDialog.data.role_id; 
		form.school_id = UserInfoDialog.data.school_id; 
		form.grade = UserInfoDialog.data.grade; 
		
			dispatch(submitUpdateUserInfo(form));
			setSelectedFile(null)
		
	}

	function handleRemove() {
		// dispatch(removeActivity(formOrigin.id));
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
			{...UserInfoDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{/* {activityDialog.type === 'new' && 'Nueva Actividad'}
						{activityDialog.type === 'edit' && 'Editar Actividad'} */}
					</Typography>
				</Toolbar>
					<div className="flex flex-col items-center justify-center pb-24">
						{/* <Avatar className="w-96 h-96" alt="contact avatar" src={form.avatar} /> */}
						<Typography variant="h6" color="inherit" className="pt-8">
							{form.name}
						</Typography>
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
						label="Nombre"
						id="name"
						value={form.name}
						onChange={handleChange}
						validations={{
							minLength: 2,
							maxLength: 30,
						}}
						validationErrors={{
							minLength: 'El minimo de caractere permitidos es 4',
							maxLength: 'El máximo de caracteres permitidos es 30'
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
					<TextFieldFormsy
								className="mb-16"
								type="text"
								name="last_name"
								value={form.last_name}
								label="Apellido(s)"
								validations={{
									minLength: 4
								}}
								validationErrors={{
									minLength: 'El mínimo de caracteres es 4'
								}}
								fullWidth
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												person
											</Icon>
										</InputAdornment>
									)
								}}
								variant="outlined"
								required
							/>

					<TextFieldFormsy
						className="mb-16"
						type="text"
						name="email"
						value={form.email}
						label="Email"
						validations="isEmail"
						validationErrors={{
							isEmail: 'Email invalido.'
						}}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<Icon className="text-20" color="action">
										email
											</Icon>
								</InputAdornment>
							)
						}}
						variant="outlined"
						required
						fullWidth
					/>

					<TextFieldFormsy
							className="mb-16"
							type="password"
							name="password"
							id="password"
							label="Password"
							validations={{
								minLength: 3
							}}
							validationErrors={{
								minLength: 'Min character length is 3'
							}}
							InputProps={{
								className: 'pr-2',
								type: showPassword ? 'text' : 'password',
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={() => setShowPassword(!showPassword)}>
											<Icon className="text-20" color="action">
												{showPassword ? 'visibility' : 'visibility_off'}
											</Icon>
										</IconButton>
									</InputAdornment>
								)
							}}

							variant="outlined"
							fullWidth
						/>


				{values.loading && <LinearProgress />}

				</DialogContent>
				 
                
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


					</DialogActions> 
				
			</Formsy>
		</Dialog>
	);
}

export default UserInfoDialog;
