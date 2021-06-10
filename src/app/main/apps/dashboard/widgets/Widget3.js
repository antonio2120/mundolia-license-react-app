import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import React from 'react';

function Widget3(props) {
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
							<ListItemText primary={item.name} />
						</ListItem>
					</Button>
				))}
			</List>
		</Paper>
	);
}

export default React.memo(Widget3);
