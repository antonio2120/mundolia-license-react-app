import Icon from '@material-ui/core/Icon';
// import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function WidgetVideos(props) {
	return (
		<>
			{ props.widget.length > 0 ?
					< div className="w-full pt-28 pb-28 m-20">
						{props.widget.map((row) => (
							<Paper className="w-full rounded-8 shadow-1 p-24 mb-12">

								<div className="flex items-center justify-between px-4 pt-4">
									<Typography className="text-16 leading-none text-red justify-center ">{row.full_name} compartió un video</Typography>
                                    <Icon className="text-18 justify-between">movie</Icon>
								</div>
								<div className="flex items-center px-4 pt-4">
									<Typography className="text-16 text-blue" >
										{row.title}
									</Typography>
								</div>
								<div className="flex items-center px-4 pt-4">
									<Typography className="text-12" color="textSecondary pt-12">
										{row.time_stamp}
									</Typography>
								</div>

								<div className="flex flex-1 flex-col items-center justify-center p-16 border-t-1 px-4 pt-4">
									{row.content ?
										<Typography className="text-16">
											{row.content}
										</Typography>
										:
										null
									}
                                    {row.video_title ?
										<Typography className="text-16 font-semibold pt-4">
											{row.video_title}
										</Typography>
										:
										null
									}
								</div>
							</Paper>
						))
						}
					</div>
				:
				<div className="w-full pt-28 pb-28 m-20">
					<Paper className="w-full rounded-8 shadow-1 p-24 mb-12">
						<div className="flex items-center justify-center px-4 pt-4">
							<Typography className="text-16" color="textSecondary">
								No hay videos recientes.
							</Typography>
						</div>
					</Paper>
				</div>
			}
		</>
	);
}

export default React.memo(WidgetVideos);
