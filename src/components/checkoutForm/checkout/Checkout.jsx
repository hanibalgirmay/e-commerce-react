import React, { useState, useEffect } from 'react'
import { Paper, Stepper, Step, Container, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core'
import { Link } from 'react-router-dom'
import useStyles from './styles';
import PaymentForm from '../PaymentForm';
import AddressForm from '../AddressForm';
import { commerce } from '../../../lib/commerce';

const steps = ["Shipping address", "Payment details"];

const Checkout = ({ cart, order, error, onCaptureCheckout }) => {
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const classes = useStyles();

    //checkout token create
    useEffect(() => {
        const generatedToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                console.log(token);
                setCheckoutToken(token);
            } catch (error) {
                console.log(error)
            }
        }
        generatedToken()
    }, [cart]);

    const nextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    const backStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    let ConfirmForm = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase,{order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
            </div>
            <br />
            <Button variant="outlined" components={Link} to="/" type="button">Back to home</Button>
        </>
    ) : (
            <div style={{ display: 'flex', justifyContent: "center" }} className={classes.spinner}>
                <CircularProgress />
            </div>
        );
    if (error) {
        <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button variant="outlined" type="button" component={Link} to="/">Back to home</Button>
        </>
    }

    const Forms = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm nextStep={nextStep} backStep={backStep} checkoutToken={checkoutToken} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />


    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <ConfirmForm /> : checkoutToken && <Forms />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
