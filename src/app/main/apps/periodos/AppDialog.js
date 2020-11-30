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
import { submitCreateContact,submitUpdateContact, submitUpdateContactGroup } from './store/userSlice';
import {
	removeRecord,
	updateRecord,
	addRecord,
	closeNewDialog,
	closeEditDialog
} from './store/Slice';
import MenuItem from "@material-ui/core/MenuItem";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import {TextFieldFormsy} from "../../../../@fuse/core/formsy";
import Formsy from "formsy-react";
import {showMessage} from "../../../store/fuse/messageSlice";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const defaultFormState = {
	id : '',
	periodo: '',
	name: '',
	description: '',
	is_active: true,
	is_current :false
};
const useStyles = makeStyles(theme => ({
	formControl:{
		width:'100%',
		margin: 5,
		height:53
	},
	listItem: {
		color: 'inherit!important',
		textDecoration: 'none!important',
		height: 40,
		width: 'calc(100% - 16px)',
		borderRadius: '0 20px 20px 0',
		paddingLeft: 24,
		paddingRight: 12,
		'&.active': {
			backgroundColor: theme.palette.secondary.main,
			color: `${theme.palette.secondary.contrastText}!important`,
			pointerEvents: 'none',
			'& .list-item-icon': {
				color: 'inherit'
			}
		},
		'& .list-item-icon': {
			marginRight: 16
		}
	}
}));

function AppDialog(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const recordsDialog = useSelector(({ periodosApp }) => periodosApp.records.Dialog);
	const formOrigin = useSelector(({ periodosApp }) => periodosApp.records.Dialog.data);
	const record = useSelector(({ periodosApp }) => periodosApp.records.record);

	const { form, handleChange ,setForm} = useForm(defaultFormState);
	const [values, setValues] = React.useState({loading : false});
	const [isFormValid, setIsFormValid] = useState(false);

	const formRef = useRef(null);

	function disableButton() {
		setIsFormValid(false);
	}

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if ((recordsDialog.type === 'edit' || recordsDialog.type === 'editGroup' )&& recordsDialog.data) {
			setForm({ ...recordsDialog.data });
		}
		/**
		 * Dialog type: 'new'
		 */
		if (recordsDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...recordsDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [recordsDialog.data, recordsDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (recordsDialog.props.open) {
			initDialog();
		}
	}, [recordsDialog.props.open, initDialog]);

	useEffect(() => {
		if (record.error) {
			if (record.error.code == '500') {
				setValues({...values, loading: false});
				dispatch(showMessage({message: record.error.message, variant: 'error'}));
			} else if (record.error && (
				record.error.errors.name ||
				record.error.errors.description ||
				record.error.errors.periodo ||
				record.error.errors.is_active ||
				record.error.errors.is_current
			)) {
				formRef.current.updateInputsWithError({
					...record.error.errors
				});
				disableButton();
				setValues({...values, loading: false});
				dispatch(showMessage({message: record.error.message, variant: 'error'}));

			}
		}

		if(record.success){
			setValues({ ...values, loading: false });
			dispatch(showMessage({message:'Operación exitosa!',variant: 'success'	}));

			closeComposeDialog();
		}
	}, [record.error,record.success]);
	function closeComposeDialog() {
		return (recordsDialog.type === 'edit' || recordsDialog.type === 'editGroup')? dispatch(closeEditDialog()) : dispatch(closeNewDialog());
	}

	function handleSubmit(event) {
		setValues({ ...values, loading: true });
		event.preventDefault();

		if (recordsDialog.type === 'new') {
			dispatch(submitCreateContact(form));
		}
		else if (recordsDialog.type === 'edit'){
			dispatch(submitUpdateContact(form,formOrigin));
		}
		else {
			dispatch(submitUpdateContactGroup(form,recordsDialog));
		}
	}
	function handleRemove() {
		dispatch(removeRecord(formOrigin.id));
		closeComposeDialog();
	}
	function enableButton() {
		setIsFormValid(true);
	}
	function validateForm (values) {
		console.log("FORM", values)
		setForm(values);
	}
	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...recordsDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{recordsDialog.type === 'new' && 'Nuevo Periodo'}
						{recordsDialog.type === 'edit' && 'Editar Periodo'}
						{recordsDialog.type === 'editGroup' && 'Editar '+ recordsDialog.length+' periodo(s)'}
					</Typography>
				</Toolbar>
				{recordsDialog.type !== 'editGroup' && (
					<div className="flex flex-col items-center justify-center pb-24">

					</div>
				)}
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
					{recordsDialog.type !== 'editGroup' &&
					(
						<div>
							<TextFieldFormsy
								className="mb-16"
								type="text"
								name="periodo"
								value={form.periodo}
								label="Período"
								fullWidth
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												date_range
											</Icon>
										</InputAdornment>
									)
								}}
								autoFocus
								variant="outlined"
								required
							/>
							<TextFieldFormsy
								className="mb-16"
								type="text"
								name="name"
								value={form.name}
								label="Nombre"
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
												date_range
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
								name="description"
								value={form.description}
								label="Descripción"
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
												date_range
											</Icon>
										</InputAdornment>
									)
								}}
								variant="outlined"
								required
							/>
							<FormControl variant="outlined" >
								<FormControlLabel
									control={
										<Switch checked={form.is_active}
												name="is_active"
												onChange={(event, newValue) => {
													event.target.name = 'is_active';
													event.target.value = newValue;
													handleChange(event);
												}}
										/>}
									label="Período Activo"
								/>
							</FormControl>
							<FormControl variant="outlined" >
								<FormControlLabel
									control={
										<Switch checked={form.is_current}
												name="is_current"
												onChange={(event, newValue) => {
													event.target.name = 'is_current';
													event.target.value = newValue;
													handleChange(event);
												}}
										/>}
									label="Período Actual"
								/>
							</FormControl>
						</div>
					)}
				</DialogContent>
				{recordsDialog.type === 'new' ? (
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
						{recordsDialog.type !== 'editGroup' && (
							<IconButton onClick={handleRemove} disabled={(values.loading)}>
								<Icon>delete</Icon>
							</IconButton>
						)}
					</DialogActions>
				)}
			</Formsy>
		</Dialog>
	);
}

export default AppDialog;
