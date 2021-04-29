import { useForm } from '@fuse/hooks';
// import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import Icon from '@material-ui/core/Icon';
// import IconButton from '@material-ui/core/IconButton';
// import InputAdornment from '@material-ui/core/InputAdornment';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {showMessage} from "../../../store/fuse/messageSlice";
import {
	closeRenewLicenseDialog
} from './store/membershipInfoSlice';
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import {TextFieldFormsy} from "../../../../@fuse/core/formsy";
import Formsy from "formsy-react";
import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from "@material-ui/core/Switch";
// import FormControl from "@material-ui/core/FormControl";
// import { getMembershipType } from './store/typeMembershipSlice'
// import { useDeepCompareEffect } from '@fuse/hooks';



const defaultFormState = {
	uuid: '',
    displayName: '',
	email: '',
    role: '',	
	password :'',
};

function RenewLicenseDialog(props) {
    const dispatch = useDispatch();
    const RenewLicenseDialog = useSelector(({ adminLicenciasApp }) => adminLicenciasApp.membership.RenewLicenseDialog);
	const membershipType = useSelector(({ adminLicenciasApp }) => adminLicenciasApp.typeMembership.data);
	const { form, handleChange ,setForm} = useForm(defaultFormState);

	// console.log('membershipType');
	// console.log(membershipType);
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
		if ((RenewLicenseDialog.type === 'edit')&& RenewLicenseDialog.data) {
			setForm({ ...RenewLicenseDialog.data });
		}


	}, [RenewLicenseDialog.data, RenewLicenseDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (RenewLicenseDialog.props.open) {
			initDialog();
		}
	}, [RenewLicenseDialog.props.open, initDialog]);

	// useEffect(() => {
	// 	if (userInfo.error) {

	// 		if (userInfo.error.response.request.status == '500') {
	// 			setValues({...values, loading: false});
	// 			// dispatch(showMessage({message: activity.error.response.data.message, variant: 'error'}));
	// 		} else 
	// 		{
	// 			disableButton();
	// 			setValues({...values, loading: false});
	// 			dispatch(showMessage({message: userInfo.error.response.data.message, variant: 'error'}));
	// 		}
	// 	}

	// 	if(userInfo.success){
	// 		setValues({ ...values, loading: false });
	// 		dispatch(showMessage({message:'Operación exitosa!', variant: 'success'	}));
	// 		dispatch(showMessage({message:'Usuario actualizado correctamente.', variant: 'success' }));

	// 		closeComposeDialog();
	// 	}

	// }, [userInfo.error,userInfo.success]);
    
	function closeComposeDialog() {
		return (RenewLicenseDialog.type === 'edit' )?  dispatch(closeRenewLicenseDialog()) : null ;
	}

	function handleSubmit(event) {
		setValues({ ...values, loading: true });
		event.preventDefault();
		form.uuid = RenewLicenseDialog.data.uuid; 
		form.role_id = RenewLicenseDialog.data.role_id; 
		form.school_id = RenewLicenseDialog.data.school_id; 
		form.grade = RenewLicenseDialog.data.grade; 
		
			// dispatch(submitUpdateUserInfo(form));
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
			{...RenewLicenseDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full ">
					<Typography variant="subtitle1" color="inherit" >
                        Renovar Licencia
					</Typography>
				</Toolbar>
					
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
						InputProps={{
							readOnly: true,
							// endAdornment: (
							// 	<InputAdornment position="end">
							// 		<Icon className="text-20" color="action">
							// 			person
							// 		</Icon>
							// 	</InputAdornment>
							// )
						}}
						variant="outlined"
					/>
					<TextFieldFormsy
						fullWidth
						className="mb-16"
						type="text"
						name="last_name"
						label="Apellido"
						id="last_name"
						value={form.last_name}
						onChange={handleChange}
						InputProps={{
							readOnly: true,
						}}
						variant="outlined"
					/>
					<TextFieldFormsy
						fullWidth
						className="mb-16"
						type="text"
						name="email"
						label="email"
						id="email"
						value={form.email}
						onChange={handleChange}
						required
						variant="outlined"
					/>
					
					{membershipType ?
						(
							<>
								{membershipType.map((row) => (
									 row.id == form.id_licenses_type ?

										<Typography color="inherit">
											{row.description_license_type} (${row.price})
										</Typography>
										:
										null
									
								))
								}
								<SelectFormsy
									id="id_licenses_type"
									name="id_licenses_type"
									width="100%"
									value={form.id_licenses_type}
									onChange={handleChange}
									label="Tipo de Licencia"
									fullWidth
									variant="outlined"
									className="mb-24 mt-16 MuiInputBase-fullWidth"
									required
								>
									{membershipType.map((row) => (

										<MenuItem key={row.id} value={row.id}>{row.title}</MenuItem>
									))
									}
								</SelectFormsy>
							</>
						)
						:
						<CircularProgress color="secondary" />
					}









		
					{values.loading && <LinearProgress />}

				</DialogContent>
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
			</Formsy>
		</Dialog>
	);
}

export default RenewLicenseDialog;
