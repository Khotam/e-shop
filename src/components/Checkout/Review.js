import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import CartItem from '../Cart/CartItem/CartItem';
import findCartItemFromShopDataById from '../../utilFunctions/findProductById.function';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  checkoutList: {
    overflow: 'scroll',
    height: '350px',
    padding: '10px',
  },
  checkoutItem: {
    border: '1px solid #ebebeb',
    marginBottom: '10px',
    padding: '10px',
  },
}));

function Review() {
  const classes = useStyles();

  const shopData = useSelector((state) => state.shop.shopData);

  const userProfile = useSelector((state) => state.firebase.profile);
  const checkoutState = useSelector((state) => state.checkout);

  const products = !userProfile.isEmpty && Object.entries(userProfile.cart);

  const totalPrice =
    shopData.length &&
    products &&
    products.reduce((acc, [id, quantity]) => {
      const item = findCartItemFromShopDataById(shopData, id);
      acc += item.price * quantity;
      return acc;
    }, 0);

  const addresses = [
    checkoutState.address1,
    checkoutState.city,
    checkoutState.state,
    checkoutState.zip,
    checkoutState.country,
  ];

  const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: checkoutState.cardName },
    { name: 'Card number', detail: `xxxx-xxxx-xxxx-${checkoutState.cardNumber.trim().slice(-4)}` },
    { name: 'Expiry date', detail: checkoutState.expDate },
  ];

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <div className={classes.checkoutList}>
          {products &&
            products.map(([productId, quantity]) => (
              <div key={uuid()} className={classes.checkoutItem}>
                <CartItem cartItemId={productId} quantity={quantity} smallImage={true} />
              </div>
            ))}
        </div>
        <ListItem className={classes.listItem}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' className={classes.total}>
            {totalPrice}$
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>{checkoutState.cardName}</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction='column' xs={12} sm={6}>
          <Typography variant='h6' gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Review;
