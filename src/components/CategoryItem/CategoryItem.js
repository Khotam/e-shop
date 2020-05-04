import React from 'react';
import './CategoryItem.css';
import { Link } from 'react-router-dom';

const CategoryItem = ({ title, imageUrl, size, linkUrl }) => {
  return (
    <div
      className={`category-item ${size ? size : ''}`}
      style={{ backgroundImage: `url(${imageUrl})` }}>
      <Link to={(current) => ({ ...current, pathname: linkUrl })}>
        <div className='content'>
          <h1>{title}</h1>
          <span>Shop Now</span>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
