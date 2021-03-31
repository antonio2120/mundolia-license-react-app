// import Icon from '@material-ui/core/Icon';
// import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
// import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
// import Divider from '@material-ui/core/Divider';

function WidgetPoints(props) {
	const [currentRange, setCurrentRange] = useState(props.widget.currentRange);
	console.log(props)

	function handleChangeRange(ev) {
		setCurrentRange(ev.target.value);
	}

	return (
		<Paper className="w-full rounded-8 shadow-1">
			<div className="flex items-center justify-between px-4 pt-4">
			</div>
            
            <div className="flex items-center p-8">
				<div className="flex flex-1 flex-col items-center justify-center p-16">
					<Typography className="text-15" color="textSecondary">
                        Puntos Actuales
					</Typography>
					<Typography className="text-32 leading-none text-blue font-semibold">
						{props.widget.current}
					</Typography>
				</div>
                <div className="flex flex-1 flex-col p-16 border-r-1">

					<div className="flex justify-between px-4 pt-4 pl-4">
						<Typography className="text-15 leading-none justify-center" color="textSecondary">Ganados</Typography>
						<Typography className="text-15 justify-between pl-10 font-semibold" color="textSecondary">{ props.widget.total_earned }</Typography>
					</div>

					<div className="flex items-center justify-between px-4 pt-4">
						<Typography className="text-15 leading-none justify-center" color="textSecondary">Comprados</Typography>
						<Typography className="text-15 justify-between pl-10 font-semibold" color="textSecondary">{ props.widget.total_bought }</Typography>
					</div>

					<div className="flex items-center justify-between px-4 pt-4">
						<Typography className="text-15 leading-none justify-center" color="textSecondary">Recibidos</Typography>
						<Typography className="text-15 justify-between pl-10 font-semibold" color="textSecondary">{ props.widget.total_received }</Typography>
					</div>

					<div className="flex items-center justify-between px-4 pt-4">
						<Typography className="text-15 leading-none justify-center" color="textSecondary">Recuperados</Typography>
						<Typography className="text-15 justify-between pl-10 font-semibold" color="textSecondary">{ props.widget.total_retrieved }</Typography>
					</div>
				</div>
                {/* <Divider /> */}
				<div className="flex flex-1 flex-col items-center justify-center p-16">
					<Typography className="text-15" color="textSecondary">
                        Gastados
					</Typography>
					<Typography className="text-32 leading-none text-red font-semibold">
						{ props.widget.total_spent }
					</Typography>
				</div>
                <div className="flex flex-1 flex-col items-center justify-center p-16">
					<Typography className="text-15" color="textSecondary">
                        Enviados
					</Typography>
					<Typography className="text-32 leading-none text-red font-semibold">
						{ props.widget.total_sent }
					</Typography>
				</div>
			</div>
		</Paper>
	);
}

export default React.memo(WidgetPoints);
