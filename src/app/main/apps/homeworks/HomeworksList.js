import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import SchoolsMultiSelectMenu from './ItemsMultiSelectMenu';
import HomeworksTable from './HomeworksTable';
import { openEditHomeworkDialog, removeItem, toggleStarredItem, selectHomeworks } from './store/homeworkSlice';

// import ItemsSidebarContent from "./ItemsSidebarContent";
// import ContactsSidebarContent from "../contacts/ContactsSidebarContent";
// import ContactsTable from "../contacts/ContactsTable";

function HomeworksList(props) {

	const dispatch = useDispatch();
	const homeworks = useSelector(selectHomeworks);
	let searchText = useSelector(({ HomeworksApp }) => HomeworksApp.homework.searchText);
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
		],
		[dispatch]
	);

	useEffect(() => {
		function getFilteredArray(homeworks, _searchText) {
			if (_searchText.length === 0) {
				return homeworks;
			}
			return FuseUtils.filterArrayByString(homeworks, _searchText);
		}
		if (homeworks) {
			setFilteredData(getFilteredArray(homeworks, searchText));
		}
	}, [homeworks, searchText]);

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
			<HomeworksTable
				columns={columns}
				data={filteredData}
				onRowClick={(ev, row) => {
					if (row) {
						dispatch(openEditHomeworkDialog(row.original));
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

export default HomeworksList;
