import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'

import useStyle from './styles';

const Product = ({ data, onAddToCart }) => {
    const classes = useStyle();
    console.log(data);
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={data.media.source} title={data.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {data.name}
                    </Typography>
                    <Typography variant="h5">
                        {data.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: data.description }} variant="h7" color="textSecondary" />
                <CardActions disableSpacing className={classes.CardActions}>
                    <IconButton onClick={() => onAddToCart(data.id, 1)} aria-label="Add to Cart">
                        <AddShoppingCart />
                    </IconButton>
                </CardActions>
            </CardContent>
        </Card>
    )
}

export default Product
