import React from 'react';
import Item from './Item/Item';
import './Items.css';
import { useSelector } from 'react-redux';

const Items = (props) => {
  const routeName = props.match.params.category;
  let items = [];

  const shopData = useSelector((state) => state.shop.shopData);

  for (const category of shopData) {
    if (category.routeName === routeName) {
      items = category.items;
    }
  }

  return (
    <>
      <h2 className='category-title'>{routeName}</h2>
      <div className='items'>
        {items.length &&
          items.map((item) => {
            return <Item {...item} key={item.id} />;
          })}
      </div>
    </>
  );
};

export default Items;
