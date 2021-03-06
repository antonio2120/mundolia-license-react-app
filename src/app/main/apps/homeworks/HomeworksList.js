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
import { openEditHomeworkDialog, removeItem, toggleStarredItem, selectHomeworks, downloadHomework } from './store/homeworkSlice';
import {showMessage} from "../../../store/fuse/messageSlice";

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
				Header: 'Nombre del Alumno',
				accessor: 'user_name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Estado',
				sortable: true,
				accessor: d => (
					d.status == 'No entregado' ?
						<div className="flex items-center">
							<p style={{paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, backgroundColor: '#c7c7c7', color: '#FFFFFF', borderRadius: 12, fontWeight: "bold"}}>{d.status.toUpperCase()}</p>
						</div>
					: d.status == 'Entregado' ?
						<div className="flex items-center">
							<p style={{paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, backgroundColor: '#ff9c24', color: '#FFFFFF', borderRadius: 12, fontWeight: "bold"}}>{d.status.toUpperCase()}</p>
						</div>
					: d.status == 'Calificado' ?
						<div className="flex items-center">
							<p style={{paddingTop: 3, paddingBottom: 3, paddingLeft: 5, paddingRight: 5, backgroundColor: 'green', color: '#FFFFFF', borderRadius: 12, fontWeight: "bold"}}>{d.status.toUpperCase()}</p>
						</div>
					: d.status
				)
			},
			{
				Header: 'Calificación',
				accessor: 'score',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Archivo',
				accessor: d => d.file_path ? d.file_path : d.url_path ? "Link del documento" : d.url_path,
				className: 'font-bold',
				sortable: true,
			},
			{
				id: 'action',
				width: 128,
				sortable: false,
				Cell: ({ row }) => (
					<div className="flex items-center">
						{console.log(row.original)}
						{
							row.original.file_path ?
								<IconButton
								onClick={ev => {
									ev.stopPropagation();
									dispatch(downloadHomework(row.original.file_path));
								}}
								>
									<Icon>save_alt</Icon>
								</IconButton>
								:
								row.original.url_path ?
									<IconButton
									onClick={ev => {
										ev.stopPropagation();
										navigator.clipboard.writeText(row.original.url_path);
										dispatch(showMessage({message: 'Enlace copiado'}));
									}}
									>
										<Icon>link</Icon>
									</IconButton>
									:
									null
						}
					</div>
				)
			},
			{
				Header: 'Fecha de entrega',
				accessor: 'finish_date',
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
	if (filteredData.length > 0) {
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
	}else{
		res = (
			<>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						No hay registros que mostrar!
					</Typography>
				</div>
			</>
		);
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
