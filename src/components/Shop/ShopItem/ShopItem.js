import React from 'react';
import { Link } from 'react-router-dom';
import Item from '../../Items/Item/Item';
import './ShopItem.css';

const ShopItem = ({ items, routeName, title }) => {
  return (
    <div className='items'>
      <Link to={'/shop/' + routeName}>
        <h2>{title}</h2>
      </Link>
      <div className='shop-items'>
        {items &&
          items.slice(0, 4).map((item) => {
            return <Item key={item.id} {...item} />;
          })}
      </div>
    </div>
  );
};

export default ShopItem;
