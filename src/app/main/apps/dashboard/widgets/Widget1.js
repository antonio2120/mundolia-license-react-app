import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';

function Widget1(props) {
	const [currentRange, setCurrentRange] = useState(props.widget.currentRange);

	function handleChangeRange(ev) {
		setCurrentRange(ev.target.value);
	}

	return (
		<Paper className="w-full rounded-8 shadow-1">
			<div className="flex items-center justify-between px-16 h-64 border-b-1">
				<Typography className="text-16">{props.name}</Typography>
			</div>
			<List>
				{props.widget.map(item => (
				<Button
					to={`/apps/actividades/all`}
					component={Link}
					style={{textTransform:'none',width:"100%"}}>
					<ListItem key={item.id}>
						<ListItemText primary={item.name+' - '+item.custom_name} secondary={
							<div>
								<Typography className="text-14">Maestro: {item.teachers_name}</Typography>
								{item.finish_date.split(' ')[0].split('-')[2]+'-'+
								(
									(item.finish_date.split(' ')[0].split('-')[1]) == 1 ? 'Enero' :
									(item.finish_date.split(' ')[0].split('-')[1]) == 2 ? 'Febrero' :
									(item.finish_date.split(' ')[0].split('-')[1]) == 3 ? 'Marzo' :
									(item.finish_date.split(' ')[0].split('-')[1]) == 4 ? 'Abril' :
									(item.finish_date.split(' ')[0].split('-')[1]) == 5 ? 'Mayo' :
									(item.finish_date.split(' ')[0].split('-')[1]) == 6 ? 'Junio' :
									(item.finish_date.split(' ')[0].split('-')[1]) == 7 ? 'Julio' :
									(item.finish_date.split(' ')[0].split('-')[1]) == 8 ? 'Agosto' :
									(item.finish_date.split(' ')[0].split('-')[1]) == 9 ? 'Septiembre' :
									(item.finish_date.split(' ')[0].split('-')[1]) == 10 ? 'Octubre' :
									(item.finish_date.split(' ')[0].split('-')[1]) == 11 ? 'Noviembre': 'Diciembre')
								
								+' '+item.finish_date.split(' ')[1].split(':')[0]+':'+item.finish_date.split(' ')[1].split(':')[1]}
							</div>
							}/>
					</ListItem>
				</Button>
				))}
			</List>
		</Paper>
	);
}

export default React.memo(Widget1);
