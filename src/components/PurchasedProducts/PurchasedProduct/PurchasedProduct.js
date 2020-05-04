import React from 'react';
import Spinner from '../../UI/Spinner/Spinner';
import findProductById from '../../../utilFunctions/findProductById.function';
import { useSelector } from 'react-redux';
import './PurchasedProduct.css';

const PurchasedProduct = ({ productId, quantity }) => {
  const shopData = useSelector((state) => state.shop.shopData);

  const product = findProductById(shopData, productId);
  return product ? (
    <li className='purchased-product'>
      <div className='img-wrapper'>
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <h4 className='name'>{product.name}</h4>
      <div className='quantity'>
        <p>
          Quantity:
          {quantity}
        </p>
      </div>
      <small className='price'>{product.price * quantity}$</small>
    </li>
  ) : (
    <Spinner />
  );
};

export default PurchasedProduct;
