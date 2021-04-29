import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Avatar from '@material-ui/core/Avatar';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withReducer from 'app/store/withReducer';
import GoogleMap from 'google-map-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import reducer from './store';
import { getOrder } from './store/orderSlice';
// import OrderInvoice from './order/OrderInvoice';
// import OrdersStatus from './order/OrdersStatus';
import { Button } from '@material-ui/core';
import { getUserInfo, openUserInfoDialog } from './store/userInfoSlice'
import UserInfoDialog from './UserInfoDialog';
import { getMembershipInfo, openRenewLicenseDialog } from './store/membershipInfoSlice'
import RenewLicenseDialog from './RenewLicenseDialog'
import { getMembershipType } from './store/typeMembershipSlice'


function Marker(props) {
	return (
		<Tooltip title={props.text} placement="top">
			<Icon className="text-red">place</Icon>
		</Tooltip>
	);
}

function AdminLicenciasApp(props) {
	const dispatch = useDispatch();
	const order = useSelector(({ adminLicenciasApp }) => adminLicenciasApp.order);
	const theme = useTheme();
	const info = useSelector(({ auth }) => auth.user);
	const userInfo = useSelector(({ adminLicenciasApp }) => adminLicenciasApp.user.data);
	const membershipInfo = useSelector(({ adminLicenciasApp }) => adminLicenciasApp.membership.data);
	// const membershipType = useSelector(({ adminLicenciasApp }) => adminLicenciasApp.typeMembership.entities);


	// console.log(membershipType);

	// const infoComplete = useSelector(({ adminLicenciasApp }) => adminLicenciasApp.user);


	const routeParams = useParams();
	const [tabValue, setTabValue] = useState(0);
	const [map, setMap] = useState('shipping');

	useDeepCompareEffect(() => {
		dispatch(getUserInfo());
		dispatch(getMembershipInfo());
		dispatch(getMembershipType());
		dispatch(getOrder(routeParams));
	}, [dispatch, routeParams]);

	function handleChangeTab(event, value) {
		setTabValue(value);
	}

	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={
				
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex flex-1 flex-col items-center sm:items-start">
							

							<div className="flex flex-col min-w-0 items-center sm:items-start">
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography className="text-16 sm:text-20 truncate">
										Administrador de Membresías
									</Typography>
								</FuseAnimate>

								{/* <FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography variant="caption">
										{`From ${order.customer.firstName} ${order.customer.lastName}`}
									</Typography>
								</FuseAnimate> */}
							</div>
						</div>
					</div>
				
			}
			contentToolbar={
				<Tabs
					value={tabValue}
					onChange={handleChangeTab}
					indicatorColor="primary"
					textColor="primary"
					variant="scrollable"
					scrollButtons="auto"
					classes={{ root: 'w-full h-64' }}
				>
					<Tab className="h-64 normal-case" label="Detalles" />
					{/* <Tab className="h-64 normal-case" label="Products" />
					<Tab className="h-64 normal-case" label="Invoice" /> */}
				</Tabs>
			}
			content={
				order && (
					<div className="p-16 sm:p-24 max-w-2xl w-full">
						{/* Order Details */}
						{tabValue === 0 && (
							<div>
								<div className="pb-48">
									<div className="pb-16 flex items-center">
										<Icon color="action">account_circle</Icon>
										<Typography className="h2 mx-16" color="textSecondary">
											Cuenta
										</Typography>
									</div>

									<div className="mb-24">
										<div className="table-responsive mb-48 w-full">
											<table className="simple">
												<thead>
													<tr>
														<th>Nombre</th>
														<th>Apellido</th>
														<th>Email</th>
														<th>Escuela</th>
														<th>Rol</th>
														<th></th>
													</tr>
												</thead>
												<tbody>
												
													<tr> 
														<td>
															<div className="flex items-center">
																<Avatar src={info.data.photoURL} />
																{/* <Avatar src={order.customer.avatar} /> */}
																{userInfo ? 
																<Typography className="truncate mx-8">
																	{userInfo.name}
																</Typography>
																:null
																}
															</div>
														</td>
														<td>
															{userInfo ?
															<Typography className="truncate">
																{userInfo.last_name}
															</Typography>
															:null}
														</td>
														<td>
															{userInfo ?
															<Typography className="truncate">
																{userInfo.email}
															</Typography>
															:null}
														</td>
														<td>
															<Typography variant="subtitle1" className="truncate">
																{info.data.school_name}
															</Typography>
														</td>
														<td>
															<span className="truncate">{info.data.role}</span>
														</td>
														<th>
															<Button 
																onClick={ev => dispatch(openUserInfoDialog(userInfo))}
																component={Link}
																className="justify-start px-32"
																color="secondary">
																Edit
															</Button>
														</th>
														
													</tr>
													
												</tbody>
											</table>
										</div>
										</div>


										{ userInfo && userInfo.childrens_id ? 
											<Accordion
											elevation={1}
											expanded={map === 'hijos'}
											onChange={() => setMap(map !== 'hijos' ? 'hijos' : false)}
										>
											<AccordionSummary expandIcon={<ExpandMoreIcon />}>
											<Icon color="action">child_care</Icon>
											<Typography className="h2 mx-16" color="textSecondary">
												Hijos
											</Typography>
											</AccordionSummary>
											<AccordionDetails className="flex flex-col md:flex-row">



												<div className="table-responsive mb-48 w-full">
													<table className="simple">
														<thead>
															<tr>
																<th>Nombre</th>
																<th>Apellido</th>
																<th>Email</th>																<th></th>
															</tr>
														</thead>
														{userInfo.childrens_id.map((ch) => (
															<tbody>
																<tr>
																	<td>
																		<div className="flex items-center">
																			{/* <Avatar src={info.data.photoURL} /> */}
																			{/* <Avatar src={order.customer.avatar} /> */}
																			<Typography className="truncate mx-8">
																				{ch.name}
																			</Typography>
																		</div>
																	</td>
																	<td>
																		<Typography className="truncate">
																			{ch.last_name}
																		</Typography>
																	</td>
																	<td>
																		<Typography className="truncate">
																			{ch.email}
																		</Typography>
																	</td>
																	<th>
																		<Button
																			onClick={ev => dispatch(openUserInfoDialog(ch))}
																			component={Link}
																			className="justify-start px-32"
																			color="secondary">
																			Edit
																		</Button>
																	</th>
																</tr>
															</tbody>
														))}
													</table>
												</div>
										
											</AccordionDetails>
										</Accordion>

											:
											null
										}




										{/* <Accordion
											elevation={1}
											expanded={map === 'shipping'}
											onChange={() => setMap(map !== 'shipping' ? 'shipping' : false)}
										>
											<AccordionSummary expandIcon={<ExpandMoreIcon />}>
												<Typography className="font-600">Shipping Address</Typography>
											</AccordionSummary>
											<AccordionDetails className="flex flex-col md:flex-row">
												<Typography className="w-full md:max-w-256 mb-16 md:mb-0">
													{order.customer.shippingAddress.address}
												</Typography>
											</AccordionDetails>
										</Accordion>

										<Accordion
											elevation={1}
											expanded={map === 'invoice'}
											onChange={() => setMap(map !== 'invoice' ? 'invoice' : false)}
										>
											<AccordionSummary expandIcon={<ExpandMoreIcon />}>
												<Typography className="font-600">Invoice Address</Typography>
											</AccordionSummary>
											<AccordionDetails className="flex flex-col md:flex-row">
												<Typography className="w-full md:max-w-256 mb-16 md:mb-0">
													{order.customer.invoiceAddress.address}
												</Typography>
												<div className="w-full h-320">
													<GoogleMap
														bootstrapURLKeys={{
															key: process.env.REACT_APP_MAP_KEY
														}}
														defaultZoom={15}
														defaultCenter={[
															order.customer.invoiceAddress.lat,
															order.customer.invoiceAddress.lng
														]}
													>
														<Marker
															text={order.customer.invoiceAddress.address}
															lat={order.customer.invoiceAddress.lat}
															lng={order.customer.invoiceAddress.lng}
														/>
													</GoogleMap>
												</div>
											</AccordionDetails>
										</Accordion> */}
								</div>

								<div className="pb-48">
									<div className="pb-16 flex items-center">
										<Icon color="action">access_time</Icon>
										<Typography className="h2 mx-16" color="textSecondary">
											Membresía
										</Typography>
									</div>

									<div className="table-responsive">
										<table className="simple">
											<thead>
												<tr>
													<th>Status</th>
													<th>Fecha</th>
												</tr>
											</thead>
											<tbody>

												{membershipInfo ?
													<>
														<tr>
															<td>
																<div className="inline text-12 p-4 rounded truncate bg-blue-700 text-white">
																	{membershipInfo.licenses_type}
																</div>
															</td>
															<td>{membershipInfo.created_at.slice(0,10)}</td>
														</tr>

														<tr>
															<td>
																<div className="inline text-12 p-4 rounded truncate bg-red text-white">
																	Expira
																</div>
																
															</td>
															<td>{membershipInfo.expiry_date.slice(0,10)}</td>
														</tr>
														<Button 
																onClick={ev => dispatch(openRenewLicenseDialog(membershipInfo))}
																component={Link}
																className="justify-start px-32"
																color="secondary">
																Renovar
															</Button>
													</>
													:
													null
												}
											</tbody>
										</table>
									</div>
								</div>

								{/* <div className="pb-48">
									<div className="pb-16 flex items-center">
										<Icon color="action">attach_money</Icon>
										<Typography className="h2 mx-16" color="textSecondary">
											Payment
										</Typography>
									</div>

									<div className="table-responsive">
										<table className="simple">
											<thead>
												<tr>
													<th>TransactionID</th>
													<th>Payment Method</th>
													<th>Amount</th>
													<th>Date</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td>
														<span className="truncate">{order.payment.transactionId}</span>
													</td>
													<td>
														<span className="truncate">{order.payment.method}</span>
													</td>
													<td>
														<span className="truncate">{order.payment.amount}</span>
													</td>
													<td>
														<span className="truncate">{order.payment.date}</span>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>

								<div className="pb-48">
									<div className="pb-16 flex items-center">
										<Icon color="action">local_shipping</Icon>
										<Typography className="h2 mx-12" color="textSecondary">
											Shipping
										</Typography>
									</div>

									<div className="table-responsive">
										<table className="simple">
											<thead>
												<tr>
													<th>Tracking Code</th>
													<th>Carrier</th>
													<th>Weight</th>
													<th>Fee</th>
													<th>Date</th>
												</tr>
											</thead>
											<tbody>
												{order.shippingDetails.map(shipping => (
													<tr key={shipping.date}>
														<td>
															<span className="truncate">{shipping.tracking}</span>
														</td>
														<td>
															<span className="truncate">{shipping.carrier}</span>
														</td>
														<td>
															<span className="truncate">{shipping.weight}</span>
														</td>
														<td>
															<span className="truncate">{shipping.fee}</span>
														</td>
														<td>
															<span className="truncate">{shipping.date}</span>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div> */}
								<UserInfoDialog />	
								<RenewLicenseDialog />
							</div>

						)}
						{/* Products */}
						{/* {tabValue === 1 && (
							<div className="table-responsive">
								<table className="simple">
									<thead>
										<tr>
											<th>ID</th>
											<th>Image</th>
											<th>Name</th>
											<th>Price</th>
											<th>Quantity</th>
										</tr>
									</thead>
									<tbody>
										{order.products.map(product => (
											<tr key={product.id}>
												<td className="w-64">{product.id}</td>
												<td className="w-80">
													<img className="product-image" src={product.image} alt="product" />
												</td>
												<td>
													<Typography
														component={Link}
														to={`/apps/e-commerce/products/${product.id}`}
														className="truncate"
														style={{
															color: 'inherit',
															textDecoration: 'underline'
														}}
													>
														{product.name}
													</Typography>
												</td>
												<td className="w-64 text-right">
													<span className="truncate">${product.price}</span>
												</td>
												<td className="w-64 text-right">
													<span className="truncate">{product.quantity}</span>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)} */}
						{/* Invoice */}
						{/* {tabValue === 2 && <OrderInvoice order={order} />} */}
						
					</div>
				)
			}
			
			innerScroll
		/>
	);
}

export default withReducer('adminLicenciasApp', reducer)(AdminLicenciasApp);
