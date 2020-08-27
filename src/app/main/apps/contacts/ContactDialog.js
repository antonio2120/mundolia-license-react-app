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
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitRegister } from 'app/auth/store/registerSlice';

import {
	removeContact,
	updateContact,
	addContact,
	closeNewContactDialog,
	closeEditContactDialog
} from './store/contactsSlice';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

const defaultFormState = {
	uuid : '',
	name: '',
	last_name: '',
	avatar: 'assets/images/avatars/profile.jpg',
	second_last_name: '',
	id_school: '',
	email : '',
	grade: '',
	active: '',
	password :''
};

function ContactDialog(props) {
	const dispatch = useDispatch();
	const contactDialog = useSelector(({ contactsApp }) => contactsApp.contacts.contactDialog);
	const userEdit = useSelector(({ auth }) => auth.userEdit);

	const { form, handleChange, setForm } = useForm(defaultFormState);

	const [values, setValues] = React.useState({
		showPassword: false,
		loading : false
	});
	const [isFormValid, setIsFormValid] = useState(false);
	const formRef = useRef(null);


	function disableButton() {
		setIsFormValid(false);
	}

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (contactDialog.type === 'edit' && contactDialog.data) {
			setForm({ ...contactDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (contactDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...contactDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [contactDialog.data, contactDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (contactDialog.props.open) {
			initDialog();
		}
	}, [contactDialog.props.open, initDialog]);

	function closeComposeDialog() {
		return contactDialog.type === 'edit' ? dispatch(closeEditContactDialog()) : dispatch(closeNewContactDialog());
	}

	function canBeSubmitted() {
		return (form.name.length > 0);
	}

	function handleSubmit(event) {
		setValues({ ...values, loading: true });
		event.preventDefault();

		if (contactDialog.type === 'new') {
			dispatch(addContact(form));
		} else {
			dispatch(updateContact(form));
		}
		//closeComposeDialog();
	}


	function handleRemove() {
		dispatch(removeContact(form.uuid));
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...contactDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{contactDialog.type === 'new' ? 'Nuevo Usuario' : 'Editar Usuario'}
					</Typography>
				</Toolbar>
				<div className="flex flex-col items-center justify-center pb-24">
					<Avatar className="w-96 h-96" alt="contact avatar" src={form.avatar} />
					{contactDialog.type === 'edit' && (
						<Typography variant="h6" color="inherit" className="pt-8">
							{form.name}
						</Typography>
					)}
				</div>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>

						<TextField
							className="mb-24"
							label="Nombre(s)"
							autoFocus
							id="name"
							name="name"
							value={form.name}
							onChange={handleChange}
							variant="outlined"
							required
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20" />
						<TextField
							className="mb-24"
							label="Apellido(s)"
							id="last_name"
							name="last_name"
							value={form.last_name}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">star</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Username"
							id="username"
							name="username"
							value={form.username}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">navigation</Icon>
						</div>
						<FormControl variant="outlined" className="mb-24" fullWidth>
							<InputLabel id="grade-label">Grado</InputLabel>
							<Select
								labelId="grade-label"
								id="grade"
								name="grade"
								value={form.grade}
								onChange={handleChange}
								label="Grado"
								fullWidth
							>
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem value={3}>3</MenuItem>
								<MenuItem value={4}>4</MenuItem>
								<MenuItem value={5}>5</MenuItem>
								<MenuItem value={6}>6</MenuItem>
							</Select>
						</FormControl>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">email</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Email"
							id="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">domain</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Escuela"
							id="school"
							name="school"
							value={form.school}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">security</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Rol"
							id="rol"
							name="rol"
							value={form.rol}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">vpn_key</Icon>
						</div>
						<FormControl variant="outlined" className="mb-24" fullWidth>
							<InputLabel id="password-label">Contraseña</InputLabel>
							<OutlinedInput
								id="password"
								labelId="password-label"
								name='password'
								type={values.showPassword ? 'text' : 'password'}
								value={form.password}
								onChange={handleChange}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{values.showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
								fullWidth
							/>
						</FormControl>
					</div>

					{/*<div className="flex">*/}
					{/*	<div className="min-w-48 pt-20">*/}
					{/*		<Icon color="action">cake</Icon>*/}
					{/*	</div>*/}
					{/*	<TextField*/}
					{/*		className="mb-24"*/}
					{/*		id="birthday"*/}
					{/*		label="Birthday"*/}
					{/*		type="date"*/}
					{/*		value={form.birthday}*/}
					{/*		onChange={handleChange}*/}
					{/*		InputLabelProps={{*/}
					{/*			shrink: true*/}
					{/*		}}*/}
					{/*		variant="outlined"*/}
					{/*		fullWidth*/}
					{/*	/>*/}
					{/*</div>*/}

					{/*<div className="flex">*/}
					{/*	<div className="min-w-48 pt-20">*/}
					{/*		<Icon color="action">home</Icon>*/}
					{/*	</div>*/}
					{/*	<TextField*/}
					{/*		className="mb-24"*/}
					{/*		label="Address"*/}
					{/*		id="address"*/}
					{/*		name="address"*/}
					{/*		value={form.address}*/}
					{/*		onChange={handleChange}*/}
					{/*		variant="outlined"*/}
					{/*		fullWidth*/}
					{/*	/>*/}
					{/*</div>*/}

					{/*<div className="flex">*/}
					{/*	<div className="min-w-48 pt-20">*/}
					{/*		<Icon color="action">note</Icon>*/}
					{/*	</div>*/}
					{/*	<TextField*/}
					{/*		className="mb-24"*/}
					{/*		label="Notes"*/}
					{/*		id="notes"*/}
					{/*		name="notes"*/}
					{/*		value={form.notes}*/}
					{/*		onChange={handleChange}*/}
					{/*		variant="outlined"*/}
					{/*		multiline*/}
					{/*		rows={5}*/}
					{/*		fullWidth*/}
					{/*	/>*/}
					{/*</div>*/}
					{values.loading && <LinearProgress />}
				</DialogContent>

				{contactDialog.type === 'new' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								type="submit"
								disabled={(!canBeSubmitted() || values.loading)}
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
								disabled={(!canBeSubmitted() || values.loading)}
							>
								Guardar
							</Button>
						</div>
						<IconButton onClick={handleRemove} disabled={(values.loading)}>
							<Icon>delete</Icon>
						</IconButton>
					</DialogActions>
				)}
			</form>
		</Dialog>
	);
}

export default ContactDialog;
