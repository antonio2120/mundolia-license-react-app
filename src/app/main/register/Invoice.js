import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Moment from 'moment';

const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`
	},
	divider: {
		backgroundColor: theme.palette.getContrastText(theme.palette.primary.dark)
	},
	seller: {
		backgroundColor: theme.palette.primary.dark,
		color: theme.palette.getContrastText(theme.palette.primary.dark),
		marginRight: -88,
		paddingRight: 66,
		width: 480
	}
}));

function CompactInvoicePage(props) {
	const classes = useStyles();
	const [invoice, setInvoice] = useState(null);
	const [invoiceData, setInvoiceData] = useState(null);
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
    });
    const search = props.location.search; // returns the URL query String
	const params = new URLSearchParams(search); 
	// const statusPayment = params.get('status');
	// const orderId = localStorage.getItem('id_order');
	// const data = {
	// 	'payment_id' : params.get('payment_id'),
	// 	'merchant_order_id' : params.get('merchant_order_id'),
	// 	'preference_id' : params.get('preference_id'),
	// 	'payment_type' : params.get('payment_type'),
	// 	'expiry_date' : "2021-02-24 23:26"
	// }
	const preapproval_id = params.get('preapproval_id');
	axios
		.get(process.env.REACT_APP_API+'/getPreapproval/'+preapproval_id)
		.then(res => {
			console.log(res);
		}).catch(error => {
			console.log(error);
		});
	

    function navLogin() {
        window.location.href= "/login";
    }

	useEffect(() => {
        // if(preapproval_id !== ""){
		// 	let dataInv={};
        //     axios
		// 	.put(process.env.REACT_APP_API+'/updateSubscription/'+orderId, data)
		// 	.then(res => {
        //         dataInv.date = Moment(new Date()).format('MMMM DD, yyyy');
		// 		dataInv.number = res.data.data.order.merchant_order_id;
        //         dataInv.orderId = res.data.data.order.id;
		// 		dataInv.title = res.data.data.licenses[0].title;
		// 		dataInv.phone = res.data.data.order.phone_number;
		// 		dataInv.email = res.data.data.lia.email;
		// 		dataInv.name = res.data.data.lia.name + " " + res.data.data.lia.last_name;
		// 		dataInv.titleService = res.data.data.licenses[0].title;
		// 		dataInv.descriptionService = res.data.data.licenses[0].description_license_type;
		// 		dataInv.price = res.data.data.licenses[0].price;

		// 		setInvoice(dataInv);
		// 	}).catch(error => {
		// 		console.log(error);
		// 	});
        // }
    }, []);

	return (
		<div className={clsx(classes.root, 'flex-grow flex-shrink-0 p-0 sm:p-64 print:p-0')}>
			{invoice && (
				<FuseAnimate animation={{ translateY: [0, '100%'] }} duration={600}>
					<Card className="mx-auto w-xl print:w-full print:p-8 print:shadow-none rounded-8">
						<CardContent className="p-88 print:p-0">
							<Typography color="textSecondary" className="mb-32">
								{invoice.date}
							</Typography>

							<div className="flex justify-between">
								<div>
									<table className="mb-16">
										<tbody>
											<tr>
												<td className="pb-4">
													<Typography
														className="font-light"
														variant="h6"
														color="textSecondary"
													>
														FACTURA #
													</Typography>
												</td>
												<td className="pb-4 px-16">
													<Typography className="font-light" variant="h6">
														{invoice.number}
													</Typography>
												</td>
											</tr>

                                            <tr>
												<td>
													<Typography color="textSecondary">ID DE PAGO</Typography>
												</td>
												<td className="px-16">
													<Typography>{invoice.orderId}</Typography>
												</td>
											</tr>

											<tr>
												<td>
													<Typography color="textSecondary">FECHA DE FACTURA</Typography>
												</td>
												<td className="px-16">
													<Typography>{invoice.date}</Typography>
												</td>
											</tr>

										</tbody>
									</table>

									 <Typography color="textSecondary">{invoice.title}</Typography>

									{invoice.name && (
										<Typography color="textSecondary">{invoice.name}</Typography>
									)}
									{invoice.phone && (
										<Typography color="textSecondary">{invoice.phone}</Typography>
									)}
									{invoice.email && (
										<Typography color="textSecondary">{invoice.email}</Typography>
									)}
								</div>

								<div className={clsx(classes.seller, 'flex items-center p-16')}>
									<img className="w-80" src="assets/images/logos/clublia.png" alt="logo" />

									<div className={clsx(classes.divider, 'w-px mx-8 h-96 opacity-50')} />

									<div className="px-8">
										<Typography color="inherit">Club LIA</Typography>

											<Typography color="inherit">Tijuana</Typography>
											<Typography color="inherit">4494494949</Typography>
											<Typography color="inherit">info@clublia.com</Typography>
											<Typography color="inherit">www.clublia.com</Typography>
									</div>
								</div>
							</div>

							<div className="mt-64">
								<Table className="simple">
									<TableHead>
										<TableRow>
											<TableCell>SERVICIO</TableCell>
											<TableCell>DESCRIPCIÓN</TableCell>
											<TableCell align="center">PRECIO UNITARIO</TableCell>
											<TableCell align="right">TOTAL</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										<TableRow>
											<TableCell>
												<Typography variant="subtitle1">{invoice.titleService}</Typography>
											</TableCell>
											<TableCell>
												{invoice.descriptionService}
											</TableCell>
											<TableCell align="center">{formatter.format(invoice.price)}</TableCell>
											<TableCell align="right">{formatter.format(invoice.price)}</TableCell>
										</TableRow>
									</TableBody>
								</Table>

								<Table className="simple mt-32">
									<TableBody>
									<TableRow> 
											<TableCell>
												<Typography className="font-light" variant="h4" color="textSecondary">
													TOTAL
												</Typography>
											</TableCell>
											<TableCell align="right">
												<Typography className="font-light" variant="h4" color="textSecondary">
													{formatter.format(invoice.price)}
												</Typography>
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</div>

							<div className="mt-96">
								<Typography className="mb-24 print:mb-12" variant="body1">
								Esta información fue enviada a tu correo.
								</Typography>
                                <Grid container justify="center">
                                    <Button onClick={()=>navLogin()} variant="contained" color="primary" 
                                        className=" mx-auto mb-10">
                                        <Typography variant="body1">
                                            Inicia sesión
                                        </Typography>
                                    </Button>
                                </Grid>
							</div>
						</CardContent>
					</Card>
				</FuseAnimate>
			)}
		</div>
	);
}

export default CompactInvoicePage;

/**

 Use the following elements to add breaks to your pages. This will make sure that the section in between
 these elements will be printed on a new page. The following two elements must be used before and after the
 page content that you want to show as a new page. So, you have to wrap your content with them.

 Elements:
 ---------
 <div className="page-break-after"></div>
 <div className="page-break-before"></div>


 Example:
 --------

 Initial page content!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>

 This is the second page!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>

 This is the third page!

 <div className="page-break-after"></div>
 <div className="page-break-before"></div>
 * */
