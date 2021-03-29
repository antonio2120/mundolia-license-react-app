import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function WidgetScore(props) {
    // console.log(props);
	return (
		<Paper className="w-full rounded-8 shadow-1">
			{/* <div className="flex items-center justify-between px-4 pt-4">
				<div className="flex items-center px-12">
					<Icon color="action">location_on</Icon>
					<Typography className="text-16 mx-8">
						{props.widget.locations[props.widget.currentLocation].name}
					</Typography>
				</div>
				<IconButton aria-label="more">
					<Icon>more_vert</Icon>
				</IconButton>
			</div> */}
			<div className="text-center px-24 py-32">
				{/* <Icon className="meteocons text-40 ltr:mr-8 rtl:ml-8" color="action">
					{props.widget.locations[props.widget.currentLocation].icon}
				</Icon> */}
                <Typography className="text-24 leading-tight" color="textSecondary">
					Promedio
				</Typography>
				<Typography className="text-44 mx-8" color="textSecondary">
					{parseFloat(props.widget[0].calificacion)}
				</Typography>
				{/* <Typography className="text-48 font-300" color="textSecondary">
					°
				</Typography>
				<Typography className="text-44 font-300" color="textSecondary">
					C
				</Typography> */}
			</div>
			<Divider />
			<div className="flex justify-center items-center p-16">
				{/* <div className="flex items-center">
					<Icon className="meteocons text-14" color="action">
						windy
					</Icon>
					<Typography className="mx-4">
						{props.widget.locations[props.widget.currentLocation].windSpeed[props.widget.speedUnit]}
					</Typography>
					<Typography color="textSecondary">{props.widget.speedUnit}</Typography>
				</div> */}

				<div className="flex items-center">
					<Icon className="text-16" color="action">
						groups
					</Icon>
					<Typography className="mx-4 "color="textSecondary">
						{props.widget[0].name}
					</Typography>
				</div>

				{/* <div className="flex items-center">
					<Icon className="meteocons text-14" color="action">
						rainy
					</Icon>
					<Typography className="mx-4">
						{props.widget.locations[props.widget.currentLocation].rainProbability}
					</Typography>
				</div> */}
			</div>
			<Divider />
		</Paper>
	);
}

export default React.memo(WidgetScore);
