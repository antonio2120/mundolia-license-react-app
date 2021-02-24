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
	submitCreateActivity
} from './store/activitiesSlice.js';
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import {TextFieldFormsy} from "../../../../@fuse/core/formsy";
import Formsy from "formsy-react";
import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";

const defaultFormState = {
    name: '',
	group_id: '',
    finishDate: '',	
    groupList: '',
};

function ActivityDialog(props) {
    const dispatch = useDispatch();
	const activityDialog = useSelector(({ ActivitiesApp }) => ActivitiesApp.activities.activityDialog);
	const groups = useSelector(({ ActivitiesApp }) => ActivitiesApp.groups.data);

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
		// if ((activityDialog.type === 'edit')&& activityDialog.data) {
		// 	setForm({ ...activityDialog.data });
		// }


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
	
		
	}, []);
    
	function closeComposeDialog() {
        return  dispatch(closeNewActivityDialog());
	}

	function handleSubmit(event) {
		setValues({ ...values, loading: true });
		event.preventDefault();

		if (activityDialog.type === 'new') {
			dispatch(submitCreateActivity(form));
		}
		// else 
		// if (activityDialog.type === 'edit'){
		// 	dispatch(submitUpdateActivity(form,formOrigin));
		// }
	}

	function handleRemove() {
		// dispatch(removeActivity(formOrigin.id));
		// closeComposeDialog();
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
						name="finishDate"
						label="Fecha de entrega"
						id="finishDate"
						type="datetime-local"
						value={form.finishDate}
						onChange={handleChange}
						defaultValue="2017-05-24T10:30"
						className="mb-24 MuiInputBase-fullWidth"
						InputLabelProps={{
						shrink: true,
						}}
						variant="outlined"
						required
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
					</DialogActions>
                     
                
                ) 
                : null
            }
                
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
