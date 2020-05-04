import React from 'react';
import ShopItem from './ShopItem/ShopItem';
import './Shop.css';
import { useSelector } from 'react-redux';

const Shop = () => {
  const shopData = useSelector((state) => state.shop.shopData);

  return (
    <div>
      {shopData &&
        shopData.map((category) => {
          return <ShopItem key={category.id} {...category} />;
        })}
    </div>
  );
};

export default Shop;
