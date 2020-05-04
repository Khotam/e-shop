import React from 'react';
import CategoryItem from '../../components/CategoryItem/CategoryItem';
import './Homepage.css';
import { useSelector } from 'react-redux';

const Homepage = () => {
  const categories = useSelector((state) => state.shop.categories);

  return (
    <div className='homepage'>
      {categories &&
        categories.map((category) => {
          return <CategoryItem key={category.id} {...category} />;
        })}
    </div>
  );
};

export default Homepage;
