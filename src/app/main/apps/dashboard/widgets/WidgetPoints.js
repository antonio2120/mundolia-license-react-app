import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import Divider from '@material-ui/core/Divider';

function WidgetPoints(props) {
	const [currentRange, setCurrentRange] = useState(props.widget.currentRange);

	function handleChangeRange(ev) {
		setCurrentRange(ev.target.value);
	}

	return (
		<Paper className="w-full rounded-8 shadow-1">
			<div className="flex items-center justify-between px-4 pt-4">
				{/* <Select
					className="px-12"
					native
					value={currentRange}
					onChange={handleChangeRange}
					inputProps={{
						name: 'currentRange'
					}}
					disableUnderline
				>
					{Object.entries(props.widget.ranges).map(([key, n]) => {
						return (
							<option key={key} value={key}>
								{n}
							</option>
						);
					})}
				</Select>
				<IconButton aria-label="more">
					<Icon>more_vert</Icon>
				</IconButton> */}
			</div>
            
            <div className="flex items-center p-8">
				<div className="flex flex-1 flex-col items-center justify-center p-16">
					{/* <Typography className="text-32 leading-none">
                        Current Points
                        </Typography> */}
					<Typography className="text-15" color="textSecondary">
						{/* {widget.footerLeft.title} */}
                        Current Points
					</Typography>
                    <Typography className="text-32 leading-none">
                        0
                    </Typography>
				</div>
                <div className="flex flex-1 flex-col items-center justify-center p-16 border-r-1">
					{/* <Typography className="text-32 leading-none">
                        Current Points
                        </Typography> */}
					<Typography className="text-15" color="textSecondary">
						{/* {widget.footerLeft.title} */}
                        Earned
					</Typography>
                    <Typography className="text-15" color="textSecondary">
						{/* {widget.footerLeft.title} */}
                        Bought
					</Typography>
				</div>
                {/* <Divider /> */}
				<div className="flex flex-1 flex-col items-center justify-center p-16">
					{/* <Typography className="text-32 leading-none">
                        hola
                        </Typography> */}
					<Typography className="text-15" color="textSecondary">
						{/* {widget.footerRight.title} */}
                        Spent
					</Typography>
                    <Typography className="text-32 leading-none">
                        0
                    </Typography>
				</div>
                <div className="flex flex-1 flex-col items-center justify-center p-16">
					<Typography className="text-15" color="textSecondary">
						{/* {widget.footerRight.title} */}
                        Sent
					</Typography>
                    <Typography className="text-32 leading-none">
                        0
                    </Typography>
				</div>
			</div>
			{/* <div className="flex items-center px-16 h-52 border-t-1">
				<Typography className="text-15 flex w-full" color="textSecondary">
					<span className="truncate">{props.widget.data.extra.label}</span>:
					<b className="px-8">{props.widget.data.extra.count[currentRange]}</b>
				</Typography>
			</div> */}
		</Paper>
	);
}

export default React.memo(WidgetPoints);
