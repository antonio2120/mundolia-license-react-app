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
import {showMessage} from "../../../store/fuse/messageSlice";
import {
	closeNewActivityDialog,
	submitCreateActivity,
	closeEditActivityDialog,
	submitUpdateActivity,
	removeActivity
} from './store/activitiesSlice.js';
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import {TextFieldFormsy} from "../../../../@fuse/core/formsy";
import Formsy from "formsy-react";
import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";

const defaultFormState = {
	id: '',
    name: '',
	group_id: '',
    finish_date: '',	
    groupList: '',
	theme: '',
	instructions: '',
	file_path: ''
};

function ActivityDialog(props) {
    const dispatch = useDispatch();
	const formOrigin = useSelector(({ ActivitiesApp }) => ActivitiesApp.activities.activityDialog.data);
	const activityDialog = useSelector(({ ActivitiesApp }) => ActivitiesApp.activities.activityDialog);
	const groups = useSelector(({ ActivitiesApp }) => ActivitiesApp.groups.data);
	const activity = useSelector(({ ActivitiesApp }) => ActivitiesApp.activities.activity);

	const { form, handleChange ,setForm} = useForm(defaultFormState);
	///Getting date time
	var today = new Date();
	const date = today.getFullYear() + '-' + ('0'+( today.getMonth() + 1)).slice(-2) + '-' + ('0'+( today.getDate())).slice(-2)
	+ 'T' + ('0'+( today.getHours() + 1)).slice(-2) + ':' + ('0'+( today.getMinutes() + 1)).slice(-2);

	console.log(form);

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
		if ((activityDialog.type === 'edit')&& activityDialog.data) {
			setForm({ ...activityDialog.data });
		}


		/**
		 * Dialog type: 'new'
		 */
		if (activityDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...activityDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [activityDialog.data, activityDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (activityDialog.props.open) {
			initDialog();
		}
	}, [activityDialog.props.open, initDialog]);

	useEffect(() => {
		if (activity.error) {

			if (activity.error.response.request.status == '500') {
				setValues({...values, loading: false});
				dispatch(showMessage({message: activity.error.response.data.message, variant: 'error'}));
			} else 
			{
				disableButton();
				setValues({...values, loading: false});
				dispatch(showMessage({message: activity.error.response.data.message, variant: 'error'}));
			}
		}

		if(activity.success){
			setValues({ ...values, loading: false });
			dispatch(showMessage({message:'Operación exitosa!',variant: 'success'	}));

			closeComposeDialog();
		}

	}, [activity.error,activity.success]);
    
	function closeComposeDialog() {
		return (activityDialog.type === 'edit' )?  dispatch(closeEditActivityDialog()) : dispatch(closeNewActivityDialog());
	}

	function handleSubmit(event) {
		setValues({ ...values, loading: true });
		event.preventDefault();

		if (activityDialog.type === 'new') {
			dispatch(submitCreateActivity(form));
		}
		else 
		if (activityDialog.type === 'edit'){
			dispatch(submitUpdateActivity(form,formOrigin));
		}
	}

	function handleRemove() {
		dispatch(removeActivity(formOrigin.id));
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
			{...activityDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{activityDialog.type === 'new' && 'Nueva Actividad'}
						{activityDialog.type === 'edit' && 'Editar Actividad'}
					</Typography>
				</Toolbar>
					<div className="flex flex-col items-center justify-center pb-24">
						{/* <Avatar className="w-96 h-96" alt="contact avatar" src={form.avatar} /> */}
						{activityDialog.type === 'edit' && (
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
						label="Nombre de Actividad"
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

					{ groups ?

					<SelectFormsy
						id="group_id"
						name="group_id"
						width="100%"
						value={form.group_id}
						onChange={handleChange}
						label="Grupo"
						fullWidth
						variant="outlined"
						className="mb-24 MuiInputBase-fullWidth"
						required
					>
						{groups.map((row) => (
							<MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
						))
						}
					</SelectFormsy>
					:
					<CircularProgress color="secondary" />
					}
					<TextFieldFormsy
						fullWidth
						className="mb-16"
						name="finish_date"
						label="Fecha de entrega"
						id="finish_date"
						type="datetime-local"
						value={form.finish_date.replace(" ", "T")}
						onChange={handleChange}
						InputLabelProps={{
						shrink: true,
						}}
						// min={date}
						inputProps={{
							min: date
						}}
						variant="outlined"
						required
					/>
					<TextFieldFormsy
						fullWidth
						className="mb-16"
						type="text"
						name="theme"
						label="Tema"
						id="theme"
						value={form.theme}
						onChange={handleChange}
						variant="outlined"
					/>
					<TextFieldFormsy
						fullWidth
						multiline
						rows={4}
						className="mb-16"
						type="text"
						name="instructions"
						label="Instrucciones"
						id="instructions"
						value={form.instructions}
						onChange={handleChange}
						variant="outlined"
						validations={{
							maxLength: 100
						}}
						validationErrors={{
							maxLength: 'El máximo de carácteres permitidos es 100'
						}}
					/>
				

		
					{values.loading && <LinearProgress />}

				</DialogContent>
				 {activityDialog.type === 'new' ? (
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

						<input
							// accept="image/*"
							// className={classes.input}
							name="file_path"
							id="file_path"
							value={form.file_path}
							style={{ display: 'none' }}
							onChange={handleChange}
							id="raised-button-file"
							multiple
							type="file"
						/>
						<label htmlFor="raised-button-file">
							<IconButton variant="raised"
								component="span"
								disabled={(values.loading)}>
								<Icon>attachment</Icon>
							</IconButton>
						</label>

					</DialogActions>
                     
                
                ) 
                : null
            }

				{/* {form.file_path.slice(12)} */}
                
                { activityDialog.type === 'edit' ? (
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

						

						<input
							// accept="image/*"
							// className={classes.input}
							name="file_path"
							id="file_path"
							value={form.file_path}
							style={{ display: 'none' }}
							onChange={handleChange}
							id="raised-button-file"
							multiple
							type="file"
						/>
						<label htmlFor="raised-button-file">
							<IconButton variant="raised"
								component="span"
								disabled={(values.loading)}>
								<Icon>attachment</Icon>
							</IconButton>
						</label>

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

export default ActivityDialog;
