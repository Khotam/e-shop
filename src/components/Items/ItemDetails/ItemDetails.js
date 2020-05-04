import React from 'react';
import findProductById from '../../../utilFunctions/findProductById.function';
import { useSelector } from 'react-redux';
import './ItemDetails.css';
import { Button } from '@material-ui/core';
import { v4 as uuid } from 'uuid';

const ItemDetails = (props) => {
  const { productId } = props.match.params;
  const shopData = useSelector((state) => state.shop.shopData);
  const product = findProductById(shopData, productId);

  const handleGoBack = () => {
    props.history.goBack();
  };

  const colors = ['green', 'red', 'yellow'];
  const sizes = ['XS', 'L', 'S', 'M', 'XXL'];
  return (
    product && (
      <div className='product'>
        <div className='img'>
          <img src={product.imageUrl} alt={'product-' + productId} />
        </div>
        <div className='product-details'>
          <h2 className='product-name'>{product.name}</h2>
          <p className='product-desc'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad dolore tempora vel, autem
            animi architecto sit labore eveniet iste pariatur! Odit, inventore? Ut eum, ipsa optio
            doloribus debitis odio a!
          </p>
          <p className='product-price'>
            Price: <strong>{product.price}$</strong>
          </p>
          <p className='colors'>
            <strong>Colors:</strong>
            {colors.map((color) => (
              <span
                key={uuid()}
                style={{
                  backgroundColor: color,
                  width: '30px',
                  height: '30px',
                  margin: '0 8px',
                  display: 'inline-block',
                  borderRadius: '50%',
                }}></span>
            ))}
          </p>
          <p className='sizes'>
            <strong>Sizes:</strong>
            {sizes.map((size) => (
              <strong key={uuid()}>{size} </strong>
            ))}
          </p>
          <Button onClick={handleGoBack} variant='contained' color='primary'>
            Go back
          </Button>
        </div>
      </div>
    )
  );
};

export default ItemDetails;
