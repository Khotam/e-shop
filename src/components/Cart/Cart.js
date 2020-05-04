import React from 'react';
import { Button } from '@material-ui/core';
import { useSelector, connect } from 'react-redux';
import './Cart.css';
import CartItem from './CartItem/CartItem';
import { v4 as uuid } from 'uuid';
import findCartItemFromShopDataById from '../../utilFunctions/findProductById.function';
import { useHistory } from 'react-router-dom';

const Cart = React.memo(({ closeCart }) => {
  const shopData = useSelector((state) => state.shop.shopData);
  const userCartItems = useSelector((state) => state.firebase.profile.cart);
  const cartIsOpen = useSelector((state) => state.cart.isOpen);

  const userCartItemsArray = userCartItems && Object.entries(userCartItems);

  const totalPrice =
    shopData.length &&
    userCartItemsArray &&
    userCartItemsArray.reduce((acc, [id, quantity]) => {
      const item = findCartItemFromShopDataById(shopData, id);
      acc += item.price * quantity;
      return acc;
    }, 0);

  const history = useHistory();
  const handleCheckout = () => {
    history.push('/checkout');
    closeCart();
  };
  return (
    <>
      <div className={`cart ${cartIsOpen ? '' : 'transparent'}`}>
        <div className={`cart-inside ${cartIsOpen ? 'active' : ''}`}>
          <h2>Shopping Cart</h2>
          <button onClick={closeCart} className='close-cart-btn'>
            ×
          </button>
          {userCartItemsArray && userCartItemsArray.length ? (
            <div className='cart-items'>
              <div className='items'>
                <ul>
                  {userCartItemsArray &&
                    userCartItemsArray.map(([cartItemId, cartItemQuantity]) => {
                      return (
                        <CartItem
                          key={uuid()}
                          cartItemId={cartItemId}
                          quantity={cartItemQuantity}
                        />
                      );
                    })}
                </ul>
              </div>
            </div>
          ) : (
            <h2 style={{ margin: '49% 0' }}>No items added yet :(</h2>
          )}
          <div className='total-amount'>
            <p>
              <strong>Delivery</strong>
              <span>free</span>
            </p>
            <p>
              <strong>Total</strong>
              <span>{totalPrice}$</span>
            </p>
            <div className='checkout-btn'>
              <Button
                disabled={totalPrice <= 0}
                onClick={handleCheckout}
                variant='contained'
                color='primary'>
                Go to checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

const mapDispatchToProps = (dispatch) => {
  return {
    closeCart: () => dispatch({ type: 'CLOSE_CART' }),
  };
};

export default connect(null, mapDispatchToProps)(Cart);
