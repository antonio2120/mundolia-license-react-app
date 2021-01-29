import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import React from 'react';
import {
	RegisterPapas,RegisterMaestros
} from '../store/pricingSlice';
import { useDispatch, useSelector } from 'react-redux';


const useStyles = makeStyles(theme => ({
	header: {
		height: 600,
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.primary.contrastText
	},
	badge: {
		backgroundColor: theme.palette.error.main,
		color: theme.palette.getContrastText(theme.palette.error.main)
	},
	price: {
		backgroundColor: theme.palette.primary[600],
		color: theme.palette.getContrastText(theme.palette.primary[600])
	}
}));



function PricingEscuelas(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const Membership = useSelector(({ PricingApp }) => PricingApp.pricing.RegisterScreen);

	// const RegisterScreen = useSelector(({ PricingApp }) => PricingApp.pricing);
	// console.log(RegisterScreen);

	function handleSubmit(event) {
		window.location.href = '/register?type=escuela&membership='+event;

	}


	return (
		<div>
			<div className={clsx(classes.header, 'flex')}>
				<div className="p-24 w-full max-w-2xl mx-auto">
					<div className="text-center my-128 mx-24">
						<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
							<Typography variant="h2" color="inherit" className="font-light">
								Membresía Escuelas!
							</Typography>
						</FuseAnimate>

						{/* <FuseAnimate duration={400} delay={600}>
							<Typography
								variant="subtitle1"
								color="inherit"
								className="opacity-75 mt-16 mx-auto max-w-512"
							>
								The most advanced customer support tools with a simple and affordable pricing. And you
								can always try for 30 days, free!
							</Typography>
						</FuseAnimate> */}
					</div>
				</div>
			</div>

			<div className="-mt-192">
				<div className="w-full max-w-2xl mx-auto">
					<FuseAnimateGroup
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
						className="flex items-center justify-center flex-wrap"
					>

						{/* -----------------------------GRATIS------------------------------- */}

						<div className="w-full max-w-320 sm:w-1/3 p-12">
							<Card className="relative rounded-8">
								<div className="p-32 text-center">
									<Typography className="text-32">Registro</Typography>
									{/* <Typography color="textSecondary" className="text-16 font-medium">
										For small teams
									</Typography> */}
								</div>

								<CardContent className="text-center p-0">
                                    <div className={clsx(classes.price, 'flex items-end justify-center py-16 px-32')}>
										<div className="flex justify-center">
											<Typography color="inherit" className="font-medium">
												$
											</Typography>
											{/* <Typography
												color="inherit"
												className="text-32 mx-4 font-light leading-none"
											>
												Sin Costo
											</Typography> */}
										</div>
										<Typography color="inherit" className="mx-4">
											Sin Costo
										</Typography>
									</div>

									<div className="flex flex-col p-32">
                                        <Typography color="textSecondary" className="mb-16">
										{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
                                            Acceso a COMUNIDAD:
										</Typography>
										<Typography color="textSecondary" className="mb-16">
										{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
                                        Acceso como director / lider educativo a: 
										</Typography>
										<Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											    Canal LIA
										</Typography>
										<Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Podcast Lia 
										</Typography>
                                        <Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Colectivo Lia 
										</Typography>
                                        <Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Experiencias LIA abiertas 
										</Typography>
										<Typography color="textSecondary" className="mb-16">
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Acceso de visitante a Grupos de Actividades y Recursos Digitales. 
										</Typography>

										
										<Typography color="textSecondary" className="mb-16">
										{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
                                            LEARNING LIA:
										</Typography>
										<Typography color="textSecondary" className="mb-16">
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Webinars y cursos abiertos  para escuelas y directores.
										</Typography>

                                        <Typography color="textSecondary" className="mb-16">
										{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
                                            Cursos / por sesion / Tema en Learning Lia:
										</Typography>
										<Typography color="textSecondary" className="mb-16">
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Cursos Gratuitos disponibles para Escuelas    
										</Typography>


										<Typography color="textSecondary" className="mb-16">
										{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
                                            Membresía COMUNIDAD + Learning LIA + Mundo LIA:
										</Typography>
										<Typography color="textSecondary" className="mb-16">
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Acceso (vista) a Grupos Públicos y su contenido.
										</Typography>
										

									</div>
								</CardContent>

								<div className="flex flex-col items-center justify-center pb-32 px-32">
									<Button variant="contained" color="secondary" className="w-full"
									onClick={ev => handleSubmit('gratis')}
									>
										ADQUIRIR
									</Button>
									{/* <Typography color="textSecondary" className="mt-16">
										7 day free trial to start
									</Typography> */}
								</div>
							</Card>
						</div>

						{/* -----------------------------MENSUAL------------------------------- */}
						<div className="w-full max-w-320 sm:w-1/3 p-12">
							<Card className="relative rounded-8" raised>
								<div className="p-32 text-center">
									<Typography className="text-32">Mensual</Typography>
									<Typography color="textSecondary" className="text-16 font-medium">
										For small teams
									</Typography>
								</div>

								<CardContent className="text-center p-0">
									<div className={clsx(classes.price, 'flex items-end justify-center py-16 px-32')}>
										<div className="flex justify-center">
											<Typography color="inherit" className="font-medium">
												$
											</Typography>
											<Typography
												color="inherit"
												className="text-32 mx-4 font-light leading-none"
											>
												250 m.n.
											</Typography>
										</div>
										{/* <Typography color="inherit" className="mx-4">
											monthly per user
										</Typography> */}
									</div>



									<div className="flex flex-col p-32">
                                        <Typography color="textSecondary" className="mb-16">
										{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
                                            Acceso a COMUNIDAD:
										</Typography>
										<Typography color="textSecondary">
										    <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            ACCESO A toda su comunidad educativa. 
										</Typography>
										<Typography color="textSecondary" >
											<Icon style={{ fontSize: 12, marginRight: 6 }}>done_outline</Icon>
											De 20 hasta 500 alumnos el total de sus maestros y padres (preescolar, primaria y secundaria) 
										</Typography>
										<Typography color="textSecondary" >
											{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
                                            Acceso personalizado a
										</Typography>
										<Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Su grupo escolar. 
										</Typography>
                                        <Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Comunicación, interacción y colaboración con su comunidad educativa: alumnos, maestros y padres de familia.  
										</Typography>
                                        <Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Grupos de Trabajo personalizados  y colaboración
										</Typography>
                                        <Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Recursos Digitales
										</Typography>
                                        <Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Actividades LIA para sus maestros y docentes
										</Typography>
                                        <Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Panel de control del colegio 
										</Typography>
                                        <Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Acceso a mundo LIA (videojuegos y actividades alumnos) 
										</Typography>
                                        <Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Tablero de información  de sus alumnos y maestross
										</Typography>
										<Typography color="textSecondary" className="mb-16">
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Participación en  Experiencias LIA para sus alumnos maestros y padres.
										</Typography>

										
										<Typography color="textSecondary" className="mb-16">
										{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
                                            LEARNING LIA:
										</Typography>
										<Typography color="textSecondary">
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Curso de educación digital para el total de sus maestros registrados  y 3 Cursos a elegir para formacion de todos sus maestros cada mes.   
										</Typography>

                                        <Typography color="textSecondary" >
										{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
                                            Cursos / por sesion / Tema en Learning Lia:
										</Typography>
										<Typography color="textSecondary" className="mb-16">
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											PAGO UNICO / por sesión: en caso de sesiones con costo, acceso a precio preferencial de miembro LIA. 
										</Typography>


										<Typography color="textSecondary" className="mb-16">
										{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
                                            Membresía COMUNIDAD + Learning LIA + Mundo LIA:
										</Typography>
                                        <Typography color="textSecondary" >
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                        Participación sin limite de sus maestros al total de cursos lecciones y experiencias de la comunidad. Participación del total de sus alumnos en los eventos de Experiencia LIA en la comunidad. 
										</Typography>
										

									</div>
								</CardContent>

								<div className="flex flex-col items-center justify-center pb-32 px-32">
									<Button variant="contained" color="secondary" className="w-full"
									onClick={ev => handleSubmit('anual')}
									>
										ADQUIRIR
									</Button>
									{/* <Typography color="textSecondary" className="mt-16">
										7 day free trial to start
									</Typography> */}
								</div>
							</Card>
						</div>

						{/* -----------------------------ANUAL------------------------------- */}

						<div className="w-full max-w-320 sm:w-1/3 p-12">
							<Card className="relative rounded-8">
								<div className="p-32 text-center">
									<Typography className="text-32">Anual</Typography>
									<Typography color="textSecondary" className="text-16 font-medium">
										For big teams
									</Typography>
								</div>

								<CardContent className="text-center p-0">
									<div className={clsx(classes.price, 'flex items-end justify-center py-16 px-32')}>
										<div className="flex justify-center">
											<Typography color="inherit" className="font-medium">
												$
											</Typography>

											<Typography
												color="inherit"
												className="text-32 mx-4 font-light leading-none"
											>
												2,500 m.n.
											</Typography>
										</div>
										{/* <Typography color="inherit" className="mx-4">
											monthly per user
										</Typography> */}
									</div>

									<div className="flex flex-col p-32">
                                    <Typography color="textSecondary" className="mb-16">
										{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
                                            Acceso a COMUNIDAD:
										</Typography>
										<Typography color="textSecondary">
										    <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            ACCESO A toda su comunidad educativa. 
										</Typography>
										<Typography color="textSecondary" >
											<Icon style={{ fontSize: 12, marginRight: 6 }}>done_outline</Icon>
											De 20 hasta 500 alumnos el total de sus maestros y padres (preescolar, primaria y secundaria) 
										</Typography>
										<Typography color="textSecondary" >
											{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
                                            Acceso personalizado a
										</Typography>
										<Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Su grupo escolar. 
										</Typography>
                                        <Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                            Comunicación, interacción y colaboración con su comunidad educativa: alumnos, maestros y padres de familia.  
										</Typography>
                                        <Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Grupos de Trabajo personalizados  y colaboración
										</Typography>
                                        <Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Recursos Digitales
										</Typography>
                                        <Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Actividades LIA para sus maestros y docentes
										</Typography>
                                        <Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Panel de control del colegio 
										</Typography>
                                        <Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Acceso a mundo LIA (videojuegos y actividades alumnos) 
										</Typography>
                                        <Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Tablero de información  de sus alumnos y maestros
										</Typography>
                                        <Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Participación en  Experiencias LIA para sus alumnos maestros y padres.
										</Typography>
                                        <Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Panel de control Anual / Escolar
										</Typography>
                                        <Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Participación incluida en Premios LIA (y la posibilidad de presentar proyecto para nominación como colegio Lider Innovador en Aprendizaje) 
										</Typography>
                                        <Typography color="textSecondary" className="mb-16">
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Todos los Eventos de Experiencia LIA de Comunidad incluidos para sus  alumnos,  maestros y padres. 
										</Typography>
										
										<Typography color="textSecondary" className="mb-16">
										{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
                                            LEARNING LIA:
										</Typography>
										<Typography color="textSecondary" className="mb-16">
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Todos los cursos de Membresía Lia para alumnos, Maestros, padres y líderes educativos  sin límites.   
										</Typography>

                                        <Typography color="textSecondary" className="mb-16">
										{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
                                            Cursos / por sesion / Tema en Learning Lia:
										</Typography>
										<Typography color="textSecondary" className="mb-16">
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Acceso exclusivo a masterclass de expertos internacionales e invitados especiales.   
										</Typography>


										<Typography color="textSecondary" className="mb-16">
										{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
                                            Membresía COMUNIDAD + Learning LIA + Mundo LIA:
										</Typography>
                                        <Typography color="textSecondary" >
										<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
                                        Todos las Experiencias LIA de comunidad / todos los  cursos de  Membresia LIA, para sus alumnos maestros y padres invitacion preferencial y preventa  a eventos restringidos, masterclass  antes de salir a la venta, eventos viajes, campamentos intercambios etc. precios Membresia LIA.
										</Typography>
										
									</div>
								</CardContent>

								<div className="flex flex-col items-center justify-center pb-32 px-32">
									<Button variant="contained" color="secondary" className="w-full"
									onClick={ev => handleSubmit('mensual')}
									// onClick={ev => dispatch(RegisterPapas())}
									>
										ADQUIRIR
									</Button>
									{/* <Typography color="textSecondary" className="mt-16">
										90 day free trial to start
									</Typography> */}
								</div>
							</Card>


						</div>
					</FuseAnimateGroup>
					{/* <div className="flex flex-col items-center py-96 text-center sm:ltr:text-left sm:rtl:text-right max-w-xl mx-auto">
						<Typography variant="h4" className="pb-32 font-light">
							Frequently Asked Questions
						</Typography>

						<div className="flex flex-wrap w-full">
							<div className="w-full sm:w-1/2 p-24">
								<Typography className="text-20 mb-8">How does free trial work?</Typography>
								<Typography className="text-16" color="textSecondary">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a diam nec augue
									tincidunt accumsan. In dignissim laoreet ipsum eu interdum.
								</Typography>
							</div>

							<div className="w-full sm:w-1/2 p-24">
								<Typography className="text-20 mb-8">Can I cancel any time?</Typography>
								<Typography className="text-16" color="textSecondary">
									Aliquam erat volutpat. Etiam luctus massa ex, at tempus tellus blandit quis. Sed
									quis neque tellus. Donec maximus ipsum in malesuada hendrerit.
								</Typography>
							</div>

							<div className="w-full sm:w-1/2 p-24">
								<Typography className="text-20 mb-8">What happens after my trial ended?</Typography>
								<Typography className="text-16" color="textSecondary">
									Aliquam erat volutpat. Etiam luctus massa ex, at tempus tellus blandit quis. Sed
									quis neque tellus. Donec maximus ipsum in malesuada hendrerit.
								</Typography>
							</div>

							<div className="w-full sm:w-1/2 p-24">
								<Typography className="text-20 mb-8">Can I have a discount?</Typography>
								<Typography className="text-16" color="textSecondary">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a diam nec augue
									tincidunt accumsan. In dignissim laoreet ipsum eu interdum.
								</Typography>
							</div>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
}

export default PricingEscuelas;
