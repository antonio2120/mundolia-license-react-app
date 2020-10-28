import FuseAnimate from '@fuse/core/FuseAnimate';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, {useEffect} from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import {useDeepCompareEffect, useForm} from "../../../../@fuse/hooks";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {setContactsFilter} from "./store/filterSlice";
import {  getContacts } from './store/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from "@material-ui/core/Button";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
	formControl:{
		width:'95%',
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
const defaultFormState = {
	school_id: '',
	grade: '',
	role_id :''
};


function ContactsSidebarContent(props) {

	const dispatch = useDispatch();
	const schools = useSelector(({ contactsApp }) => contactsApp.schools);
	const roles = useSelector(({ contactsApp }) => contactsApp.roles);
	const {form, setForm, handleChange} = useForm(defaultFormState);
	const [inputValue, setInputValue] = React.useState('');
	const [value, setValue] = React.useState('');
	const classes = useStyles(props);
	dispatch(setContactsFilter(form));
	useDeepCompareEffect(() => {
		dispatch(getContacts());
	}, [dispatch,form]);
	function handleFilterClean(){
		setForm({defaultFormState})
		setValue({value: ''})
		setInputValue({inputValue: ''})
	}
	return (
		<div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4">
			<FuseAnimate animation="transition.slideLeftIn" delay={200}>
				<Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow-1">
					{/*<div className="p-24 flex items-center">*/}
					{/*	<Avatar alt={user.name} src={user.avatar} />*/}
					{/*	<Typography className="mx-12">{user.name}</Typography>*/}
					{/*</div>*/}
					{/*<Divider />*/}
					<div className="flex flex-1 items-center justify-between p-1 sm:p-1">
						<div className="flex flex-shrink items-center w-full" >
						{schools.length > 0 &&
							<FormControl variant="outlined" className={classes.formControl}>
								<Autocomplete
									id="school_id"
									name="school_id"
									value={value}
									onChange={(event, newValue) => {
										setValue(newValue);
										event.target.name = 'school_id';
										event.target.value = newValue.id;
										handleChange(event);
									}}
									disableClearable={true}
									inputValue={inputValue}
									onInputChange={(event, newInputValue) => {
										setInputValue(newInputValue);
									}}
									options={schools}
									getOptionLabel={(option) => option.title}
									style={{ width: '100%' }}
									renderInput={(params) => <TextField {...params} label="Escuela" name="school_id" variant="outlined" fullWidth/>}
									className="mb-24 MuiInputBase-fullWidth w-full"
								/>
							</FormControl>
						}
						</div>
						<div className="flex flex-shrink items-center sm:w-224">
						{roles.length > 0 &&
							<FormControl variant="outlined" className={classes.formControl}>
								<InputLabel id="role_id">Roles</InputLabel>
								<Select
									labelId="role_id"
									id="role_id"
									name="role_id"
									value={form.role_id}
									onChange={handleChange}
									label="Roles"
									fullWidth
									variant="outlined"
									className="mb-24 MuiInputBase-fullWidth"
								>
									<MenuItem value="">
										<em></em>
									</MenuItem>
									{roles.map((row) =>(<MenuItem key={'school'+row.id} value={row.id}>{row.name}</MenuItem>))}
								</Select>
							</FormControl>
						}
						</div>
						<div className="flex flex-shrink items-center sm:w-224">
						<FormControl variant="outlined" className={classes.formControl}>
							<InputLabel id="role_id">Grado</InputLabel>
							<Select
							id="grade"
							name="grade"
							width="100%"
							value={form.grade}
							onChange={handleChange}
							label="Grado"
							fullWidth
							variant="outlined"
							className="mb-24 MuiInputBase-fullWidth"
							>
							<MenuItem key={'grade1'} value={1}>1</MenuItem>
							<MenuItem key={'grade2'} value={2}>2</MenuItem>
							<MenuItem key={'grade3'} value={3}>3</MenuItem>
							<MenuItem key={'grade4'} value={4}>4</MenuItem>
							<MenuItem key={'grade5'} value={5}>5</MenuItem>
							<MenuItem key={'grade6'} value={6}>6</MenuItem>
						</Select>
						</FormControl>
						</div>
						<div className="flex flex-shrink items-center sm:w-224">
							<Button
								variant="contained"
								color="primary"
								type="submit"
								onClick={handleFilterClean}
								//disabled={(values.loading || !isFormValid)}
							>
								Quitar Filtros
							</Button>
						</div>
						{/*<List>*/}
						{/*	<ListItem*/}
						{/*		button*/}
						{/*		component={NavLinkAdapter}*/}
						{/*		to="/apps/usuarios/all"*/}
						{/*		activeClassName="active"*/}
						{/*		className={classes.listItem}*/}
						{/*	>*/}
						{/*		<Icon className="list-item-icon text-16" color="action">*/}
						{/*			people*/}
						{/*		</Icon>*/}
						{/*		<ListItemText className="truncate" primary="Todos los usuarios" disableTypography />*/}
						{/*	</ListItem>*/}
						{/*	<ListItem*/}
						{/*		button*/}
						{/*		component={NavLinkAdapter}*/}
						{/*		to="/apps/usuarios/frequent"*/}
						{/*		activeClassName="active"*/}
						{/*		className={classes.listItem}*/}
						{/*	>*/}
						{/*		<Icon className="list-item-icon text-16" color="action">*/}
						{/*			restore*/}
						{/*		</Icon>*/}
						{/*		<ListItemText className="truncate" primary="Usuarios Frecuentes" disableTypography />*/}
						{/*	</ListItem>*/}
						{/*	<ListItem*/}
						{/*		button*/}
						{/*		component={NavLinkAdapter}*/}
						{/*		to="/apps/usuarios/starred"*/}
						{/*		activeClassName="active"*/}
						{/*		className={classes.listItem}*/}
						{/*	>*/}
						{/*		<Icon className="list-item-icon text-16" color="action">*/}
						{/*			star*/}
						{/*		</Icon>*/}
						{/*		<ListItemText className="truncate" primary="Usuarios activos" disableTypography />*/}
						{/*	</ListItem>*/}
						{/*</List>*/}
					</div>
				</Paper>
			</FuseAnimate>
		</div>
	);
}

export default ContactsSidebarContent;
