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
import {  getRecords } from './store/Slice';
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


function SidebarContent(props) {

	const dispatch = useDispatch();
	const {form, setForm, handleChange} = useForm(defaultFormState);
	const [inputValue, setInputValue] = React.useState('');
	const [value, setValue] = React.useState('');
	const classes = useStyles(props);
	dispatch(setContactsFilter(form));
	useDeepCompareEffect(() => {
		dispatch(getRecords());
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

export default SidebarContent;
