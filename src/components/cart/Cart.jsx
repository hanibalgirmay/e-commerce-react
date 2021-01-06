import React from 'react'
import { CssBaseline, Container, Typography, Button, Grid } from '@material-ui/core'
import useStyles from './styles';
import CartItem from './cart-Item/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({ Cart, handleEmptyCart, handleUpdateQuantity, handleRemoveItemFromCart }) => {
    const classes = useStyles();
    // const isEmpty = !Cart.line_items.length;

    const EmptyCart = () => (
        <Typography variant="subtitle1">
            You  Have no item in your shopping cart, start adding some!
            <Link to="/" className={classes.link}>Start Adding...</Link>
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {Cart.line_items.map((item) => (
                    <Grid key={item.id} item xs={12} sm={4}>
                        <CartItem onUpdateCart={handleUpdateQuantity} onRemoveCart={handleRemoveItemFromCart} item={item} />
                        {/* <div>{item.name}</div> */}
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {Cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button
                        classname={classes.emptyBtn}
                        size="large"
                        type="button"
                        variant="contained"
                        onClick={handleEmptyCart}
                        color="secondary">
                        Empty Cart
                    </Button>
                    <Button component={Link} to='/checkout' classname={classes.checkoutBtn} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    );
    if (!Cart.line_items) return 'Loading...'

    return (
        <>
            <CssBaseline />
            <div className={classes.toolbar}>
                <Typography variant="h3" gutterBottom className={classes.title}>
                    Your Shoping Cart
                </Typography>
                {!Cart.line_items.length ? <EmptyCart /> : <FilledCart />}
            </div>
        </>
    )
}
export default Cart
