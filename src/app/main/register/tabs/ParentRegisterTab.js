import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { submitRegister } from 'app/auth/store/registerSlice';
import { membershipPayment } from 'app/auth/store/registerSlice';
import SelectFormsy from "../../../../@fuse/core/formsy/SelectFormsy";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme => ({
	divContainer:{flexGrow:1}
}));

function ParentRegisterTab(props) { 
	const dispatch = useDispatch();
	const register = useSelector(({ auth }) => auth.register);
	const [isFormValid, setIsFormValid] = useState(false);
	const [count, setCount] = useState(1);
	const classes = useStyles();
	const formRef = useRef(null);

	useEffect(() => {
		if (register.error && (register.error.username || register.error.password)) {
			formRef.current.updateInputsWithError({
				...register.error
			});
			disableButton();
		} else if(register.data) {
			console.log("register.data",register.data);
		}
	}, [register.error]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		console.log("model::",model.parentName);
		
		dispatch(membershipPayment(model));
		// dispatch(submitRegister(model));
	}

	return (
		<div className={clsx(classes.divContainer,"w-full items-center justify-center")}>
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
			>
				<Grid container>
					<Grid item xs={6} 
						className="flex flex-col w-full p-4">
						<TextFieldFormsy
							className="mb-16"
							type="text"
							name="parentName"
							label="Nombre del padre"
							validations={{
								minLength: 4
							}}
							validationErrors={{
								minLength: 'Min character length is 4'
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											person
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>

						<TextFieldFormsy
							className="mb-16"
							type="text"
							name="parentSurname"
							label="Apellido/s del padre"
							validations={{
								minLength: 4
							}}
							validationErrors={{
								minLength: 'Min character length is 4'
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											person
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>

						<TextFieldFormsy
							className="mb-16"
							type="text"
							name="parentEmail"
							label="Email del padre"
							validations="isEmail"
							validationErrors={{
								isEmail: 'Please enter a valid email'
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											email
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>
						
						<TextFieldFormsy
							className="mb-16 w-full"
							type="text"
							name="parentPhone"
							label="Teléfono del padre"
							validations={{
								isLength: 10
							}}
							validationErrors={{
								isLength: 'Character length is 10'
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											phone_iphone
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>

						<TextFieldFormsy
							className="mb-16"
							type="text"
							name="title"//parentUsername
							label="UsernameTITLE del padre"
							validations={{
								minLength: 4
							}}
							validationErrors={{
								minLength: 'Min character length is 4'
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											account_circle
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>

						{/* <TextFieldFormsy
							className="mb-16"
							type="password"
							name="parentPassword"
							label="Password del padre"
							validations="equalsField:parentPassword-confirm"
							validationErrors={{
								equalsField: 'Passwords do not match'
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											vpn_key
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>

						<TextFieldFormsy
							className="mb-16"
							type="password"
							name="parentPassword-confirm"
							label="Confirma password del padre"
							validations="equalsField:parentPassword"
							validationErrors={{
								equalsField: 'Passwords do not match'
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											vpn_key
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/> */}

						<TextFieldFormsy
							className="mb-16"
							type="text"
							name="description" //schoolName
							label="Nombre DESCde la escuela"
							validations={{
								minLength: 4
							}}
							validationErrors={{
								minLength: 'Min character length is 4'
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											school
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>
					</Grid>

					<Grid item xs={6} 
						className="flex flex-col w-full p-4">

						<TextFieldFormsy
							className="mb-16"
							type="text"
							name="unit_price"//studentName
							label="Nombre UNITPRICE del alumno"
							validations={{
								minLength: 1 //4
							}}
							validationErrors={{
								minLength: 'Min character length is 4'
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											person
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>

						{/* <TextFieldFormsy
							className="mb-16"
							type="text"
							name="studentEmail"
							label="Email del alumno"
							validations="isEmail"
							validationErrors={{
								isEmail: 'Please enter a valid email'
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											email
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>

						<TextFieldFormsy
							className="mb-16"
							type="text"
							name="studentUsername"
							label="Username del alumno"
							validations={{
								minLength: 4
							}}
							validationErrors={{
								minLength: 'Min character length is 4'
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											account_circle
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>

						<TextFieldFormsy
							className="mb-16"
							type="password"
							name="studentPassword"
							label="Password del alumno"
							validations="equalsField:studentPassword-confirm"
							validationErrors={{
								equalsField: 'Passwords do not match'
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											vpn_key
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>

						<TextFieldFormsy
							className="mb-16"
							type="password"
							name="studentPassword-confirm"
							label="Confirma password del alumno"
							validations="equalsField:studentPassword"
							validationErrors={{
								equalsField: 'Passwords do not match'
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon className="text-20" color="action">
											vpn_key
										</Icon>
									</InputAdornment>
								)
							}}
							variant="outlined"
							required
						/>

						<SelectFormsy
							id="age"
							name="age"
							width="100%"
							label="Edad del alumno"
							fullWidth
							variant="outlined"
							className="mb-24 MuiInputBase-fullWidth"
						>
							<MenuItem key={'3'} value={3}>3</MenuItem>
							<MenuItem key={'4'} value={4}>4</MenuItem>
							<MenuItem key={'5'} value={5}>5</MenuItem>
							<MenuItem key={'6'} value={6}>6</MenuItem>
							<MenuItem key={'7'} value={7}>7</MenuItem>
							<MenuItem key={'8'} value={8}>8</MenuItem>
							<MenuItem key={'9'} value={9}>9</MenuItem>
							<MenuItem key={'10'} value={10}>10</MenuItem>
							<MenuItem key={'11'} value={11}>11</MenuItem>
							<MenuItem key={'12'} value={12}>12</MenuItem>
							<MenuItem key={'13'} value={13}>13</MenuItem>
							<MenuItem key={'14'} value={14}>14</MenuItem>
							<MenuItem key={'15'} value={15}>15</MenuItem>
						</SelectFormsy> 

						<SelectFormsy
							id="level"
							name="level"
							width="100%"
							label="Nivel del alumno"
							fullWidth
							variant="outlined"
							className="mb-24 MuiInputBase-fullWidth">
							<MenuItem key={'kinder'} value={"kinder"}>Kinder</MenuItem>
							<MenuItem key={'primaria'} value={"primaria"}>Primaria</MenuItem>
							<MenuItem key={'secundaria'} value={"secundaria"}>Secundaria</MenuItem>
						</SelectFormsy>*/}

						<SelectFormsy
							id="country"
							name="country"
							width="100%"
							label="País"
							fullWidth
							variant="outlined"
							className="mb-24 MuiInputBase-fullWidth"
							value={'México'}
						>
							<MenuItem key={'México'} value="México">México</MenuItem>
						</SelectFormsy>

						<SelectFormsy
							id="state"
							name="state"
							width="100%"
							label="Estado"
							fullWidth
							variant="outlined"
							className="mb-24 MuiInputBase-fullWidth"
						>
							<MenuItem key={'Aguascalientes'} value="Aguascalientes">Aguascalientes</MenuItem>
							<MenuItem key={'Baja California'} value="Baja California">Baja California</MenuItem>
							<MenuItem key={'Baja California Sur'} value="Baja California Sur">Baja California Sur</MenuItem>
							<MenuItem key={'Campeche'} value="Campeche">Campeche</MenuItem>
							<MenuItem key={'Chiapas'} value="Chiapas">Chiapas</MenuItem>
							<MenuItem key={'Chihuahua'} value="Chihuahua">Chihuahua</MenuItem>
							<MenuItem key={'CDMX'} value="CDMX">Ciudad de México</MenuItem>
							<MenuItem key={'Coahuila'} value="Coahuila">Coahuila</MenuItem>
							<MenuItem key={'Colima'} value="Colima">Colima</MenuItem>
							<MenuItem key={'Durango'} value="Durango">Durango</MenuItem>
							<MenuItem key={'Estado de México'} value="Estado de México">Estado de México</MenuItem>
							<MenuItem key={'Guanajuato'} value="Guanajuato">Guanajuato</MenuItem>
							<MenuItem key={'Guerrero'} value="Guerrero">Guerrero</MenuItem>
							<MenuItem key={'Hidalgo'} value="Hidalgo">Hidalgo</MenuItem>
							<MenuItem key={'Jalisco'} value="Jalisco">Jalisco</MenuItem>
							<MenuItem key={'Michoacán'} value="Michoacán">Michoacán</MenuItem>
							<MenuItem key={'Morelos'} value="Morelos">Morelos</MenuItem>
							<MenuItem key={'Nayarit'} value="Nayarit">Nayarit</MenuItem>
							<MenuItem key={'Nuevo León'} value="Nuevo León">Nuevo León</MenuItem>
							<MenuItem key={'Oaxaca'} value="Oaxaca">Oaxaca</MenuItem>
							<MenuItem key={'Puebla'} value="Puebla">Puebla</MenuItem>
							<MenuItem key={'Querétaro'} value="Querétaro">Querétaro</MenuItem>
							<MenuItem key={'Quintana Roo'} value="Quintana Roo">Quintana Roo</MenuItem>
							<MenuItem key={'San Luis Potosí'} value="San Luis Potosí">San Luis Potosí</MenuItem>
							<MenuItem key={'Sinaloa'} value="Sinaloa">Sinaloa</MenuItem>
							<MenuItem key={'Sonora'} value="Sonora">Sonora</MenuItem>
							<MenuItem key={'Tabasco'} value="Tabasco">Tabasco</MenuItem>
							<MenuItem key={'Tamaulipas'} value="Tamaulipas">Tamaulipas</MenuItem>
							<MenuItem key={'Tlaxcala'} value="Tlaxcala">Tlaxcala</MenuItem>
							<MenuItem key={'Veracruz'} value="Veracruz">Veracruz</MenuItem>
							<MenuItem key={'Yucatán'} value="Yucatán">Yucatán</MenuItem>
							<MenuItem key={'Zacatecas'} value="Zacatecas">Zacatecas</MenuItem>
						</SelectFormsy>

						<Card className="hidden md:flex justify-center p-4">
							<CardContent className="w-full">
								<b>Heavy Duty Plastic Table</b> <br/>
								Table is made of heavy duty white plastic and is 96 inches wide and 29 inches tall.
							</CardContent>
						</Card>

						<Button
							type="submit"
							variant="contained"
							color="primary"
							className="w-full mx-auto mt-16 normal-case"
							aria-label="REGISTER"
							disabled={!isFormValid}
							value="legacy"
							>
							Register
						</Button>
					</Grid>
				</Grid>
			</Formsy>
		</div>
	);
}

export default ParentRegisterTab;
