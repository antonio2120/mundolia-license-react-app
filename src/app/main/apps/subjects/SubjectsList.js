import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import SchoolsMultiSelectMenu from './ItemsMultiSelectMenu';
import SubjectsTable from './SubjectsTable';
import { openEditSubjectDialog, removeSubject, toggleStarredItem, selectSubjects, downloadSubject } from './store/subjectSlice';
import {showMessage} from "../../../store/fuse/messageSlice";

// import ItemsSidebarContent from "./ItemsSidebarContent";
// import ContactsSidebarContent from "../contacts/ContactsSidebarContent";
// import ContactsTable from "../contacts/ContactsTable";

function SubjectsList(props) {

	const dispatch = useDispatch();
	const subjects = useSelector(selectSubjects);
	let searchText = useSelector(({ SubjectsApp }) => SubjectsApp.subject.searchText);
	searchText =searchText? searchText : '';
	const [filteredData, setFilteredData] = useState(null);

	const columns = React.useMemo(
		() => [
			{
				Header: 'Color',
				accessor: d => (
					<div style={{backgroundColor: d.custom_color, height:22, width:22, borderRadius: '50%', borderWidth:2, borderColor:'#FFFFFF', boxShadow: "2px 4px 2px #9E9E9E"}}></div>
				),
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Nombre de la Materia',
				accessor: 'custom_name',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Materia Base',
				accessor: 'name',
				className: 'font-bold',
				sortable: true
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
									dispatch(openEditSubjectDialog(row.original));
								}}
							>
								<Icon>edit</Icon>
							</IconButton>
					</div>
				)
			},
			{
				Header: 'Borrar',
				id: 'delete',
				width: 128,
				sortable: false,
				Cell: ({ row }) => (
					<div className="flex items-center">
							<IconButton
								onClick={ev => {
									ev.stopPropagation();
									dispatch(removeSubject({"id": row.original.id, "group": props.params}));
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
		function getFilteredArray(subjects, _searchText) {
			if (_searchText.length === 0) {
				return subjects;
			}
			return FuseUtils.filterArrayByString(subjects, _searchText);
		}
		if (subjects) {
			setFilteredData(getFilteredArray(subjects, searchText));
		}
	}, [subjects, searchText]);

	if (!filteredData) {
		return null;
	}


	let res
	if (filteredData.length > 0) {
		res =  (
			<SubjectsTable
				columns={columns}
				data={filteredData}
				onRowClick={(ev, row) => {
					if (row) {
						dispatch(openEditSubjectDialog(row.original));
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

export default SubjectsList;
