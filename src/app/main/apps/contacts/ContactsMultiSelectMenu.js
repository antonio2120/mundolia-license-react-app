import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {setContactsUnstarred, setContactsStarred, removeContacts, openEditContactGroupDialog} from './store/contactsSlice';

function ContactsMultiSelectMenu(props) {
	const dispatch = useDispatch();
	const { selectedContactIds } = props;

	const [anchorEl, setAnchorEl] = useState(null);

	function openSelectedContactMenu(event) {
		setAnchorEl(event.currentTarget);
	}

	function closeSelectedContactsMenu() {
		setAnchorEl(null);
	}

	return (
		<>
			<IconButton
				className="p-0"
				aria-owns={anchorEl ? 'selectedContactsMenu' : null}
				aria-haspopup="true"
				onClick={openSelectedContactMenu}
			>
				<Icon>more_horiz</Icon>
			</IconButton>
			<Menu
				id="selectedContactsMenu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={closeSelectedContactsMenu}
			>
				<MenuList>
					{/*<MenuItem*/}
					{/*	onClick={() => {*/}
					{/*		dispatch(removeContacts(selectedContactIds));*/}
					{/*		closeSelectedContactsMenu();*/}
					{/*	}}*/}
					{/*>*/}
					{/*	<ListItemIcon className="min-w-40">*/}
					{/*		<Icon>delete</Icon>*/}
					{/*	</ListItemIcon>*/}
					{/*	<ListItemText primary="Remover" />*/}
					{/*</MenuItem>*/}
					<MenuItem
						onClick={() => {
							dispatch(openEditContactGroupDialog(selectedContactIds));
							closeSelectedContactsMenu();
						}}
					>
						<ListItemIcon className="min-w-40">
							<Icon>edit</Icon>
						</ListItemIcon>
						<ListItemText primary="Editar" />
					</MenuItem>

				</MenuList>
			</Menu>
		</>
	);
}

export default ContactsMultiSelectMenu;
