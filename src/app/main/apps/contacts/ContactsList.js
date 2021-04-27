import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactsMultiSelectMenu from './ContactsMultiSelectMenu';
import ContactsTable from './ContactsTable';
import { openEditContactDialog, removeContact, toggleStarredContact, selectContacts } from './store/contactsSlice';
import ContactsSidebarContent from "./ContactsSidebarContent";

function ContactsList(props) {
	const dispatch = useDispatch();
	const contacts = useSelector(selectContacts);
	const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
	const user = useSelector(({ contactsApp }) => contactsApp.user);

	const [filteredData, setFilteredData] = useState(null);

	const columns = React.useMemo(
		() => [
			{
				Header: ({ selectedFlatRows }) => {
					const selectedRowIds = selectedFlatRows.map(row => row.original.uuid);
					return (
						selectedFlatRows.length > 0 && <ContactsMultiSelectMenu selectedContactIds={selectedRowIds} />
					);
				},
				accessor: 'avatar',
				Cell: ({ row }) => {
					return <Avatar className="mx-8" alt={row.original.name} src={row.original.avatar} />;
				},
				className: 'justify-center',
				width: 64,
				sortable: false
			},
			{
				Header: 'Nombre(s)',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Apellido(s)',
				accessor: 'last_name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Escuela',
				accessor: 'school_name',
				sortable: true
			},
			{
				Header: 'Grado',
				accessor: 'grade',
				sortable: true
			},
			{
				Header: 'Username',
				accessor: 'username',
				sortable: true
			},
			{
				Header: 'Rol',
				accessor: 'role_name',
				sortable: true
			},
			{
				Header: 'Email',
				accessor: 'email',
				sortable: true
			},
			{
				Header: 'Último login',
				accessor: 'community_last_login',
				sortable: true
			},
			{
				Header: 'Miembro desde',
				accessor: 'member_since',
				sortable: true
			},
			{
				id: 'action',
				width: 128,
				sortable: false,
				Cell: ({ row }) => (
					<div className="flex items-center">

						<IconButton
							onClick={ev => {
								ev.stopPropagation();
								dispatch(removeContact(row.original.uuid));
							}}
						>
							<Icon>delete</Icon>
						</IconButton>
					</div>
				)
			}
		],
		[dispatch, user.starred]
	);

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			if (_searchText.length === 0) {
				return contacts;
			}
			return FuseUtils.filterArrayByString(contacts, _searchText);
		}

		if (contacts) {
			setFilteredData(getFilteredArray(contacts, searchText));
		}
	}, [contacts, searchText]);

	if (!filteredData) {
		return null;
	}
let res
	if (filteredData.length === 0) {
		res = (
			<>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						No hay usuarios que mostrar!
					</Typography>
				</div>
			</>
		);
	}else{
		res =  (
			<ContactsTable
				columns={columns}
				data={filteredData}
				onRowClick={(ev, row) => {
					if (row) {
						dispatch(openEditContactDialog(row.original));
					}
				}}
			/>
		)
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<>
			<ContactsSidebarContent />
				{res}
			</>
		</FuseAnimate>
	);
}

export default ContactsList;
