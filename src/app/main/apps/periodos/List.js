import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MultiSelectMenu from './MultiSelectMenu';
import Table from './Table';
import { openEditDialog, removeRecord, selectRecords } from './store/Slice';

function List(props) {
	const dispatch = useDispatch();
	const records = useSelector(selectRecords);
	const searchText = useSelector(({ periodosApp }) => periodosApp.records.searchText);

	const [filteredData, setFilteredData] = useState(null);

	const columns = React.useMemo(
		() => [
			{
				Header: ({ selectedFlatRows }) => {
					const selectedRowIds = selectedFlatRows.map(row => row.original.uuid);
					return (
						selectedFlatRows.length > 0 && <MultiSelectMenu selectedContactIds={selectedRowIds} />
					);
				},
				accessor: 'avatar',
				Cell: ({ row }) => {
					return <div />;
					// return <Avatar className="mx-8" alt={row.original.name} src={row.original.avatar} />;
				},
				className: 'justify-center',
				width: 64,
				sortable: false
			},
			{
				Header: 'Periodo',
				accessor: 'periodo',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Nombre',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Descripción',
				accessor: 'description',
				sortable: true
			},
			{
				Header: 'Activo',
				accessor: 'is_active',
				sortable: true
			},
			{
				Header: 'Actual',
				accessor: 'is_current',
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
								dispatch(removeRecord(row.original.id));
							}}
						>
							<Icon>delete</Icon>
						</IconButton>
					</div>
				)
			}
		],
		[dispatch]
	);

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			if (_searchText.length === 0) {
				return records;
			}
			return FuseUtils.filterArrayByString(records, _searchText);
		}

		if (records) {
			setFilteredData(getFilteredArray(records, searchText));
		}
	}, [records, searchText]);

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
			<Table
				columns={columns}
				data={filteredData}
				onRowClick={(ev, row) => {
					if (row) {
						dispatch(openEditDialog(row.original));
					}
				}}
			/>
		)
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<>
				{/*<SidebarContent />*/}
				{res}
			</>
		</FuseAnimate>
	);
}

export default List;
