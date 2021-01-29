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



function PricingPapas(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const Membership = useSelector(({ PricingApp }) => PricingApp.pricing.RegisterScreen);

	// const RegisterScreen = useSelector(({ PricingApp }) => PricingApp.pricing);
	// console.log(RegisterScreen);

	function handleSubmit(event) {
		window.location.href = '/register?type=padre&membership='+event;

	}


	return (
		<div>
			<div className={clsx(classes.header, 'flex')}>
				<div className="p-24 w-full max-w-2xl mx-auto">
					<div className="text-center my-128 mx-24">
						<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
							<Typography variant="h2" color="inherit" className="font-light">
								Membresía Alumnos!
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
										<Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Canal LIA
										</Typography>
										<Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Podcast LIA
										</Typography>
										<Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Colectivo LIA
										</Typography>
										<Typography color="textSecondary" className="mb-16">
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Presenciar Experiencias LIA abiertas (participación con costo)
										</Typography>

										
										<Typography color="textSecondary" className="mb-16">
										{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
											CURSOS:
										</Typography>
										<Typography color="textSecondary" className="mb-16">
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Cursos Gratuitos disponibles alumnos y papás. 
											(Ciudadania digital con juego interland  y curso programación  1.0) 
										</Typography>

										<Typography color="textSecondary" className="mb-16">
										{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
										   Membresía Comunidad + Cursos :
										</Typography>
										<Typography color="textSecondary" className="mb-16">
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Acceso gratuito a Comunidad alumnos (igual que free) + 1 brief Civismo digital / acceso a juego interland con curso breve explicación.
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
												250
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
										<Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Canal LIA
										</Typography>
										<Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Podcast LIA
										</Typography>
										<Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Colectivo LIA
										</Typography>
										<Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Acceso full a mundo LIA
										</Typography>
										<Typography color="textSecondary" >
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Dashboard / info mensual y acceso a sus papás. 
										</Typography>
										<Typography color="textSecondary" className="mb-16">
											<Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon>
											Experiencias LIA del mes / incluidas. 
										</Typography>

										
										<Typography color="textSecondary" className="mb-16">
										{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
											CURSOS:
										</Typography>
										<Typography color="textSecondary" className="mb-16">
											{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
											PAGO UNICO / por sesión: Acceso al curso(s)  ilimitadas número de veces x 1 mes. 
										</Typography>

										<Typography color="textSecondary" className="mb-16">
										{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
										   Membresía Comunidad + Cursos :
										</Typography>
										<Typography color="textSecondary" >
											{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
											Todo lo mensual comunidad
										</Typography>
										<Typography color="textSecondary" className="mb-16">
											{/* <Icon style={{ fontSize: 14, marginRight: 6 }}>done_outline</Icon> */}
											Experiencias LIA: Retos / Challenges cursos en learning Lia / sesiones colaborativas y todos los cursos papás y alumnos membresía lia. 
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
												2,500 
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
										<Typography color="textSecondary" className="mb-16">
											COMUNIDAD + Learning LIA
											Adicional a membresía mensual: TODAS las Experiencias LIA del año incluidas y cursos para alumnos:
											Educacion Digital (ciudadania digital) sin limite.
											Principios de programación
										</Typography>
										<Typography color="textSecondary" className="mb-16">
											Todo lo anual de Comunidad +Learning lia alumnos: alumnos + intercambios /  sesiones colaborativas. +Votar y participar Premios LIA.
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

export default PricingPapas;
