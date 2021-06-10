import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(theme => ({
	labelScore10: {
		color:"#F3FF00",
        textShadow:"-1px 0 #B2B65D, 0 1px #B2B65D, 1px 0 #B2B65D, 0 -1px #B2B65D;"
	},
	labelScore9: {
		color:"#AFE39A",
        textShadow:"-1px 0 #55A40B, 0 1px #55A40B, 1px 0 #55A40B, 0 -1px #55A40B;"
	},
	labelScore8: {
		color:"#A5A6DF",
        textShadow:"-1px 0 #2527A5, 0 1px #2527A5, 1px 0 #2527A5, 0 -1px #2527A5;"
	},
	labelScore7: {
		color:"#F8D074",
        textShadow:"-1px 0 #E0A212, 0 1px #E0A212, 1px 0 #E0A212, 0 -1px #E0A212;"
	},
}));

function Widget2(props) {
	const classes = useStyles(props);
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
								{item.score}
								<div className='flex justify-center align-center'>
									<Typography className={clsx(
										item.score == "10.00".valueOf() ? classes.labelScore10 :
										item.score > "8.9".valueOf() ? classes.labelScore9 :
										item.score > "7.9".valueOf() ? classes.labelScore8 :
										item.score > "6.9".valueOf() ? classes.labelScore7 : null,"text-14 justify-center align-center")}>{
										item.score == "10.00".valueOf() ? 'Excelente!' :
										item.score > "8.9".valueOf() ? '¡Buen trabajo!' :
										item.score > "7.9".valueOf() ? '¡Muy bien!' :
										item.score > "6.9".valueOf() ? '¡Puede mejorar!' : null
									}</Typography>
								</div>
							</div>
							} />
						</ListItem>
					</Button>
				))}
			</List>
		</Paper>
	);
}

export default React.memo(Widget2);
