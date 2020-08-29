import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SchoolsMultiSelectMenu from './ItemsMultiSelectMenu';
import ItemsTable from './ItemsTable';
import { openEditItemDialog, removeItem, toggleStarredItem, selectItems } from './store/itemSlice';

function ItemsList(props) {
	const dispatch = useDispatch();
	const items = useSelector(selectItems);
	let searchText = useSelector(({ schoolsApp }) => schoolsApp.items.searchText);
	searchText =searchText? searchText : ''

	const [filteredData, setFilteredData] = useState(null);

	const columns = React.useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'SchoolId',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Escuela',
				accessor: 'School',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Descripción',
				accessor: 'Description',
				sortable: true
			},
			{
				Header: 'Activa',
				accessor: 'IsActive',
				sortable: true
			},
			{
				Header: 'Usuarios actuales',
				accessor: 'CurrentUsers',
				sortable: true
			},
		],
		[dispatch]
	);

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			if (_searchText.length === 0) {
				return items;
			}
			return FuseUtils.filterArrayByString(items, _searchText);
		}
		if (items) {
			setFilteredData(getFilteredArray(items, searchText));
		}
	}, [items, searchText]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					No hay registros que mostrar!
				</Typography>
			</div>
		);
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<ItemsTable
				columns={columns}
				data={filteredData}
				// onRowClick={(ev, row) => {
				// 	if (row) {
				// 		dispatch(openEditItemDialog(row.original));
				// 	}
				// }}
			/>
		</FuseAnimate>
	);
}

export default ItemsList;
