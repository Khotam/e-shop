import React from 'react';
import { useSelector } from 'react-redux';
import PurchasedProduct from './PurchasedProduct/PurchasedProduct';
import { v4 as uuid } from 'uuid';
import './PurchasedProducts.css';

const PurchasedProducts = () => {
  const userPurchasedProducts = useSelector((state) => state.firebase.profile.purchasedProducts);
  const userPurchasedProductsArray = userPurchasedProducts && Object.entries(userPurchasedProducts);

  return (
    <div className='purchased-products'>
      <ul>
        {userPurchasedProductsArray && userPurchasedProductsArray.length ? (
          userPurchasedProductsArray.map(([productId, cartItemQuantity]) => {
            return (
              <PurchasedProduct key={uuid()} productId={productId} quantity={cartItemQuantity} />
            );
          })
        ) : (
          <h2>No items purchased yet :(</h2>
        )}
      </ul>
    </div>
  );
};

export default PurchasedProducts;
