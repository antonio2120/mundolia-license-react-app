import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';

function WidgetPosts(props) {
	console.log(props);
	return (
		<>
			{ props.widget.length > 0 ?
					< div className="w-full pt-28 pb-28 m-20">
						{props.widget.map((row) => (
							<Paper className="w-full rounded-8 shadow-1 p-24 mb-12">

								<div className="flex items-center justify-between px-4 pt-4">
									<Typography className="text-16 leading-none text-orange justify-center ">{row.full_name}
										{row.type == 'photo' ? ' una imagen'
											: row.type == 'video' ? ' compartió un video'
											: row.type == 'link' ? ' compartió un enlace'
											: row.type == 'blog' ? ' creó un blog'
											: row.type == 'event' ? ' creó un evento'
											: row.type == 'forum' ? ' creó un foro'
											: row.type == 'market' ? ' listó un nuevo producto'
											: row.type == 'song' ? ' compartió una canción'
											: row.type == 'album' ? ' compartió un álbum'
											: row.type == 'poll' ? ' creó una encuesta'
											: row.type == 'quiz' ? ' creó un cuestionario'
												: 'compartió'
										}

									</Typography>

									{row.type == 'photo' ? <Icon className="text-18 justify-between">photo</Icon>
											: row.type == 'video' ? <Icon className="text-18 justify-between">movie</Icon>
											: row.type == 'link' ? <Icon className="text-18 justify-between">link</Icon>
											: row.type == 'blog' ? <Icon className="text-18 justify-between">description</Icon>
											: row.type == 'event' ? <Icon className="text-18 justify-between">event</Icon>
											: row.type == 'forum' ? <Icon className="text-18 justify-between">forum</Icon>
											: row.type == 'market' ? <Icon className="text-18 justify-between">shopping_cart</Icon>
											: row.type == 'song' ? <Icon className="text-18 justify-between">music_note</Icon>
											: row.type == 'album' ? <Icon className="text-18 justify-between">library_music</Icon>
											: row.type == 'poll' ? <Icon className="text-18 justify-between">poll</Icon>
											: row.type == 'quiz' ? <Icon className="text-18 justify-between">list</Icon>
												: <Icon className="text-18 justify-between">short_text</Icon>
										}
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
									{row.link_title ?
										<Typography className="text-16 font-semibold pt-4">
											{row.link_title}
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
								No hay publicaciones recientes.
							</Typography>
						</div>
					</Paper>
				</div>
			}
		</>
	);
}

export default React.memo(WidgetPosts);
