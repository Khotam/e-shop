import React, { useState, useEffect } from 'react';
import './Header.css';
import { NavLink, Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { signOutAction } from '../../../redux/actionCreators/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { debounce } from 'lodash';

const Header = ({ signOut, openCart }) => {
  const userProfile = useSelector((state) => state.firebase.profile);
  const auth = useSelector((state) => state.firebase.auth);

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const resizeWindow = debounce((e) => {
    console.count(e);
    setWindowWidth(window.innerWidth);
  }, 50);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', resizeWindow);
    return () => {
      window.removeEventListener('resize', resizeWindow);
    };
  }, [windowWidth, resizeWindow]);

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  const handleToggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const numberOfItemsInCart = !userProfile.isEmpty && Object.keys(userProfile.cart).length;

  let permanentLinks = (
    <li className='signup'>
      <NavLink activeClassName='current' to='/signup' onClick={handleCloseMenu}>
        Sign Up
      </NavLink>
    </li>
  );

  let navLinks = (
    <>
      <li className='shop'>
        <NavLink activeClassName='current' to='/shop' onClick={handleCloseMenu}>
          Shop
        </NavLink>
      </li>
      <li className='signin'>
        <NavLink activeClassName='current' to='/signin' onClick={handleCloseMenu}>
          Sign In
        </NavLink>
      </li>
    </>
  );
  if (auth.uid) {
    permanentLinks = (
      <>
        <li className='cart-list-item'>
          <span className='cart-badge'>{numberOfItemsInCart}</span>
          <a
            href='/'
            onClick={(e) => {
              e.preventDefault();
              handleCloseMenu();
              openCart();
            }}>
            <FontAwesomeIcon icon={faShoppingCart} size='lg' />
          </a>
        </li>
        <li className='user-initials'>
          <NavLink activeClassName='current' to='/' onClick={handleCloseMenu}>
            <div className='initials'>{userProfile.initials}</div>
          </NavLink>
        </li>
      </>
    );

    navLinks = (
      <>
        <li className='shop'>
          <NavLink activeClassName='current' to='/shop' onClick={handleCloseMenu}>
            Shop
          </NavLink>
        </li>
        <li className='purchased'>
          <NavLink activeClassName='current' to='/purchased' onClick={handleCloseMenu}>
            Purchased
          </NavLink>
        </li>
        <li className='logout'>
          <Link
            to='/'
            onClick={() => {
              handleCloseMenu();
              signOut();
            }}>
            Log out
          </Link>
        </li>
      </>
    );
  }
  return (
    <header className='header'>
      <div className='left'>
        <div className='hamburger' onClick={handleToggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <Link to='/'>
          <h2 className='logo'>e-Shop</h2>
        </Link>
      </div>

      <nav className='nav'>
        {windowWidth < 776 ? (
          <>
            <ul className='permanent-links'>{permanentLinks}</ul>
            <ul className={isMenuOpen ? 'nav-list open' : 'nav-list'}>{navLinks}</ul>
          </>
        ) : (
          <ul className='nav-list'>
            {navLinks}
            {permanentLinks}
          </ul>
        )}
      </nav>
    </header>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOutAction()),
    openCart: () => dispatch({ type: 'OPEN_CART' }),
  };
};

export default connect(null, mapDispatchToProps)(Header);
