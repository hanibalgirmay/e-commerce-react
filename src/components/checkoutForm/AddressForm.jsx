import React, { useState, useEffect } from 'react'
import { useForm, FormProvider } from "react-hook-form";
import { Input, Select, MenuItem, Button, Grid, Typography, InputLabel } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CustomeText from './CustomTextField';
import { commerce } from '../../lib/commerce';

const AddressForm = ({ checkoutToken, next }) => {
    const methods = useForm();
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubDivisions, setShippingDivisions] = useState([])
    const [shippingSubDivision, setShippingDivision] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')

    const arrayContry = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }));
    const arraySubDivisionContry = Object.entries(shippingSubDivisions).map(([code, name]) => ({ id: code, label: name }));
    const options = shippingOptions.map((s0) => ({ id: s0.id, label: `${s0.description} - (${s0.price.formatted_with_symbol})` }))

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
        console.log("country: " + JSON.stringify(countries));
        setShippingCountries(countries);
        //set shipping country
        setShippingCountry(Object.keys(countries)[0]);
    }

    const fetchSubDivision = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
        setShippingDivisions(subdivisions);
        setShippingDivision(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });

        setShippingOptions(options);
        setShippingOption(options[0].id);
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        if (shippingSubDivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubDivision)
    }, [shippingSubDivision])

    useEffect(() => {
        if (shippingCountry) fetchSubDivision(shippingCountry)
    }, [shippingCountry])

    return (
        <>
            {/* <h2>Address from here</h2> */}
            <Typography variant="h6" gutterBottom align="center">
                Shipping Address
            </Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubDivision, shippingOption }))}>
                    <Grid container spacing={3}>
                        <CustomeText required name="firstName" label="First Name" />
                        <CustomeText required name="lastName" label="Last Name" />
                        <CustomeText required name="address1" label="address" />
                        <CustomeText required name="email" label="Email" />
                        <CustomeText required name="city" label="City" />
                        <CustomeText required name="zipcode" label="ZIP/ Postal code" />
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {arrayContry.map((coun) => (
                                    <MenuItem key={coun.id} value={coun.id}>
                                        {coun.label}
                                    </MenuItem>
                                ))}

                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping SubDivision</InputLabel>
                            <Select value={shippingSubDivision} fullWidth onChange={(e) => setShippingDivision(e.target.value)}>
                                {arraySubDivisionContry.map((sub) => (
                                    <MenuItem key={sub.id} value={sub.id}>
                                        {sub.label}
                                    </MenuItem>
                                ))}

                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {options.map((opt) => (
                                    <MenuItem key={opt.id} value={opt.id}>
                                        {opt.label}
                                    </MenuItem>
                                ))}

                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: "flex", justifyContent: 'space-between' }}>
                        <Button component={Link} to="/cart" variant="outlined" >Back to Cart</Button>
                        <Button type="submit" color="primary" variant="contained">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
