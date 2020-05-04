import React from 'react';
import './CartItem.css';
import {
  addProductToCartAction,
  removeProductFromCartAction,
  decrementProductQuantityAction,
} from '../../../redux/actionCreators/productActions';
import { connect, useSelector } from 'react-redux';
import findCartItemFromShopDataById from '../../../utilFunctions/findProductById.function';

const CartItem = ({
  cartItemId,
  quantity,
  incrementCardItemQuantity,
  decrementCardItemQuantity,
  removeItemFromCart,
}) => {
  const shopData = useSelector((state) => state.shop.shopData);

  const item = findCartItemFromShopDataById(shopData, cartItemId);

  const handleIncrement = (productId) => {
    incrementCardItemQuantity(productId);
  };
  const handleDecrement = (productId) => {
    decrementCardItemQuantity(productId);
  };
  const handleRemove = (productId) => {
    removeItemFromCart(productId);
  };

  return (
    <li className='cart-item'>
      <div className='img-wrapper'>
        <img src={item.imageUrl} alt={item.name} />
      </div>
      <h4 className='name'>{item.name}</h4>
      <div className='quantity'>
        <p>
          Quantity:
          <button onClick={() => handleDecrement(cartItemId)} className='btn-subtract'>
            -
          </button>
          {quantity}
          <button onClick={() => handleIncrement(cartItemId)} className='btn-add'>
            +
          </button>
        </p>
      </div>
      <small className='price'>{item.price * quantity}$</small>
      <button
        onClick={() => {
          handleRemove(cartItemId);
        }}
        className='remove-cart-item-btn'>
        ×
      </button>
    </li>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementCardItemQuantity: (productId) => dispatch(addProductToCartAction(productId)),
    decrementCardItemQuantity: (productId) => dispatch(decrementProductQuantityAction(productId)),
    removeItemFromCart: (productId) => dispatch(removeProductFromCartAction(productId)),
  };
};

export default connect(null, mapDispatchToProps)(CartItem);
