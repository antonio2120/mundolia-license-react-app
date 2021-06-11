import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import SchoolsMultiSelectMenu from './ItemsMultiSelectMenu';
import GroupsTable from './GroupsTable';
import { openEditGroupDialog, removeItem, toggleStarredItem, selectGroups } from './store/groupSlice';
import { Link } from 'react-router-dom';

// import ItemsSidebarContent from "./ItemsSidebarContent";
// import ContactsSidebarContent from "../contacts/ContactsSidebarContent";
// import ContactsTable from "../contacts/ContactsTable";

function GroupsList(props) {

	const dispatch = useDispatch();
	const groups = useSelector(selectGroups);
	let searchText = useSelector(({ GroupsApp }) => GroupsApp.group.searchText);
	searchText =searchText? searchText : '';
	const [filteredData, setFilteredData] = useState(null);

	const columns = React.useMemo(
		() => [
			{
				Header: 'Nombre del Grupo',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Escuela',
				accessor: 'school_id',
				sortable: true
			},
			{
				Header: 'Profesor',
				accessor: 'teachers_name',
				sortable: true
			},
			{
				Header: 'email',
				accessor: 'email',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Numero del miembros',
				accessor: 'students_count',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Materias',
				id: 'subject',
				width: 128,
				sortable: false,
				Cell: ({ row }) => (
					<div className="flex items-center">
							<IconButton
								// onClick={ev => {
								// 	ev.stopPropagation();
								// 	dispatch(openEditGroupDialog(row.original));
								// }}
								to={`/apps/materias/${row.original.name}/${row.original.id}`}
								component={Link}
							>
								<Icon>assignment</Icon>
							</IconButton>
					</div>
				)
			},
			{
				Header: 'Editar',
				id: 'edit',
				width: 128,
				sortable: false,
				Cell: ({ row }) => (
					<div className="flex items-center">
							<IconButton
								onClick={ev => {
									ev.stopPropagation();
									dispatch(openEditGroupDialog(row.original));
								}}
							>
								<Icon>edit</Icon>
							</IconButton>
					</div>
				)
			},
		],
		[dispatch]
	);

	useEffect(() => {
		function getFilteredArray(groups, _searchText) {
			if (_searchText.length === 0) {
				return groups;
			}
			return FuseUtils.filterArrayByString(groups, _searchText);
		}
		if (groups) {
			setFilteredData(getFilteredArray(groups, searchText));
		}
	}, [groups, searchText]);

	if (!filteredData) {
		return null;
	}


	let res
	if (filteredData.length === 0) {
		res = (
			<>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						No hay registros que mostrar!
					</Typography>
				</div>
			</>
		);
	}else{
		res =  (
			<GroupsTable
				columns={columns}
				data={filteredData}
				onRowClick={(ev, row) => {
					if (row) {
						// dispatch(openEditGroupDialog(row.original));
					}
				}}
			/>
		)
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<>
				{/* <ItemsSidebarContent /> */}
				{res}
			</>
		</FuseAnimate>
	);
}

export default GroupsList;
