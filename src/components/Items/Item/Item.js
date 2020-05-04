import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector, connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { addProductToCartAction } from '../../../redux/actionCreators/productActions';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: '0 25px 25px 0',
  },
  media: {
    height: 240,
  },
});

const Item = ({ name, imageUrl, price, addProductToCart, id }) => {
  const classes = useStyles();

  const auth = useSelector((state) => state.firebase.auth);
  const history = useHistory();

  const handleAddToCart = () => {
    if (auth.uid) {
      addProductToCart(id);
    } else {
      history.push('/signup');
    }
  };

  const redirectToItemDetails = () => {
    history.push(`/shop/products/${id}`);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={imageUrl} title={name} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h5'>
            {name}
          </Typography>
          <Typography variant='h5' color='textSecondary' component='p'>
            Price: {price}$
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cta}>
        <Button onClick={handleAddToCart} size='small' color='primary'>
          Add to Cart
        </Button>
        <Button onClick={redirectToItemDetails} size='small' color='primary'>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCart: (productId) => dispatch(addProductToCartAction(productId)),
  };
};

export default compose(
  firestoreConnect([{ collection: 'users' }]),
  connect(null, mapDispatchToProps)
)(Item);
