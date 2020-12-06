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
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	removeItem,
	updateItem,
	addItem,
	closeNewItemDialog,
	closeEditItemDialog
} from './store/itemSlice';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";

const defaultFormState = {
	id: '',
	School: '',
	Description: '',
	IsActive: false,
};

function ItemDialog(props) {
	const dispatch = useDispatch();
	const itemDialog = useSelector(({ schoolsApp }) => schoolsApp.items.itemDialog);

	const { form, handleChange, setForm } = useForm(defaultFormState);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (itemDialog.type === 'edit' && itemDialog.data) {
			setForm({ ...itemDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (itemDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...itemDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [itemDialog.data, itemDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (itemDialog.props.open) {
			initDialog();
		}
	}, [itemDialog.props.open, initDialog]);

	function closeComposeDialog() {
		return itemDialog.type === 'edit' ? dispatch(closeEditItemDialog()) : dispatch(closeNewItemDialog());
	}

	function canBeSubmitted() {
		return form.School.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();

		if (itemDialog.type === 'new') {
			dispatch(addItem(form));
		} else {
			dispatch(updateItem(form));
		}
		closeComposeDialog();
	}

	function handleRemove() {
		dispatch(removeItem(form.id));
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...itemDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{itemDialog.type === 'new' ? 'Nueva Escuela' : 'Editar Escuela'}
					</Typography>
				</Toolbar>
				<div className="flex flex-col items-center justify-center pb-24">
					{itemDialog.type === 'edit' && (
						<Typography variant="h6" color="inherit" className="pt-8">
							{form.School}
						</Typography>
					)}
				</div>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">domain</Icon>
						</div>

						<TextField
							className="mb-24"
							label="Nombre"
							autoFocus
							id="School"
							name="School"
							value={form.School}
							onChange={handleChange}
							variant="outlined"
							required
							fullWidth
						/>
					</div>

					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">work</Icon>
						</div>
						<TextField
							className="mb-24"
							label="Descripción"
							id="Description"
							name="Description"
							value={form.Description}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>
					<FormControl variant="outlined" >
						<FormControlLabel
							control={
								<Switch checked={form.IsActive}
										name="IsActive"
										onChange={(event, newValue) => {
											event.target.name = 'IsActive';
											event.target.value = newValue;
											handleChange(event);
										}}
								/>}
							label="Estatus"
						/>
					</FormControl>
				</DialogContent>

				{itemDialog.type === 'new' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								type="submit"
								disabled={!canBeSubmitted()}
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
								disabled={!canBeSubmitted()}
							>
								Guardar
							</Button>
						</div>
						<IconButton onClick={handleRemove}>
							<Icon>delete</Icon>
						</IconButton>
					</DialogActions>
				)}
			</form>
		</Dialog>
	);
}

export default ItemDialog;
