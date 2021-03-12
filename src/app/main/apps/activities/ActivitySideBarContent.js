import FuseAnimate from '@fuse/core/FuseAnimate';
import { makeStyles } from '@material-ui/core/styles';
import React, {useEffect} from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import {useDeepCompareEffect, useForm} from "../../../../@fuse/hooks";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {setActivitiesFilter} from "./store/filterSlice";
import {  getActivities } from './store/activitiesSlice';
import { useDispatch, useSelector } from 'react-redux';
// import Button from "@material-ui/core/Button";
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(theme => ({
	formControl:{
		width:'95%',
		margin: 5,
		height:53, 
		alignSelf: 'flex-end',
		alignContent: 'flex-end',
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
	group_id: 0,
};


function ActivitySidebarContent(props) {

	const dispatch = useDispatch();
	const groups = useSelector(({ ActivitiesApp }) => ActivitiesApp.groups.data);
	const role = useSelector(({ auth }) => auth.user.role);
	const {form, setForm, handleChange} = useForm(defaultFormState);
	const [inputValue, setInputValue] = React.useState('');
	const [value, setValue] = React.useState('');
	const classes = useStyles(props);
	dispatch(setActivitiesFilter(form));
	useDeepCompareEffect(() => {
		dispatch(getActivities(role));
	}, [dispatch,form]);
	function handleFilterClean(){
		setForm({defaultFormState})
		setValue({value: ''})
		setInputValue({inputValue: ''})
	}
    return (
        <div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4">
			<FuseAnimate animation="transition.slideLeftIn" delay={200}>
					<div className="flex flex-1 items-center justify-between p-1 sm:p-1">
						
						
						{groups ?
							<div className="flex flex-shrink items-center sm:w-224">
							<FormControl variant="outlined" className={classes.formControl}>
								<InputLabel id="role_id">Grupo</InputLabel>
								<Select
									labelId="group_id"
									id="group_id"
									name="group_id"
									width="100%"
									value={form.group_id}
									onChange={handleChange}
									label="Grado"
									fullWidth
									variant="outlined"
									className="mb-24 MuiInputBase-fullWidth"
								>
									<MenuItem key={0} value={0}>Todos</MenuItem>
									{groups.map((row) => (
										<MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
									))
									}
								</Select>
							</FormControl>
							</div>
						:
						<CircularProgress color="secondary" />
						}
					</div>
			</FuseAnimate>
		</div>
	);
}

export default ActivitySidebarContent;
