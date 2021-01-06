import React from 'react';
import { Grid } from '@material-ui/core';

import Product from '../Product';

import useStyles from './styles';

// const productList = [
//     {
//         id: 1,
//         name: "Shoe one",
//         description: "addidas shoe",
//         price: 123,
//         image: 'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg'
//     },
//     {
//         id: 2,
//         name: "Shoe two",
//         description: "running shoe",
//         price: 600,
//         image: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg'
//     },
// ]
const Products = ({ products, onAddToCart }) => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="start" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product data={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </main>
    );

}

export default Products;