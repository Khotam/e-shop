import React, { useEffect, useRef, useState } from 'react';
import Homepage from './pages/Homepage/Homepage';
import { Route, Switch } from 'react-router-dom';
import Items from './components/Items/Items';
import Header from './components/UI/Header/Header';
import Shop from './components/Shop/Shop';
import SignUp from './components/UI/Forms/SignUp/SignUp';
import SignIn from './components/UI/Forms/SignIn/SignIn';
import Cart from './components/Cart/Cart';
import ItemDetails from './components/Items/ItemDetails/ItemDetails';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Checkout from './components/Checkout/Checkout';
import PrivateRoute from './HOC/privateRoute/privateRoute';
import { Container } from '@material-ui/core';
import { debounce } from 'lodash';
import axios from 'axios';
import Spinner from './components/UI/Spinner/Spinner';
import PurchasedProducts from './components/PurchasedProducts/PurchasedProducts';
import withErrorHandler from './HOC/withErrorHandler/withErrorHandler';

function App() {
  const secretKey = '$2b$10$RsOR2w8Tvb/xA/zP.x4OoedUk1Vp1qkUhKPLf5Z4dNJlWx2SqmoWm';
  const shopDataURL = 'https://api.jsonbin.io/b/5eae8cf5a47fdd6af15ca5d6';
  const categoriesURL = 'https://api.jsonbin.io/b/5eae8876a47fdd6af15ca4a3';

  const auth = useSelector((state) => state.firebase.auth);

  // Sticky header setup
  const [isSticky, setSticky] = useState(false);
  const headerWrapperRef = useRef(null);
  const handleScroll = debounce(() => {
    if (headerWrapperRef.current) {
      setSticky(headerWrapperRef.current.getBoundingClientRect().top < 0);
    }
  }, 10);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Fetch data from API and save it to redux store state
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        setLoading(true);
        const [shopDataResponse, categoriesResponse] = await Promise.all([
          axios.get(
            shopDataURL,
            { headers: { 'secret-key': secretKey } },
            {
              cancelToken: source.token,
            }
          ),
          axios.get(
            categoriesURL,
            { headers: { 'secret-key': secretKey } },
            {
              cancelToken: source.token,
            }
          ),
        ]);
        dispatch({
          type: 'RETRIEVE_SHOP_DATA',
          shopData: shopDataResponse.data,
          categories: categoriesResponse.data,
        });
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          dispatch({ type: 'RETRIEVE_SHOP_DATA_ERROR', error });
          setLoading(false);
        }
      }

      return () => {
        source.cancel();
      };
    };

    fetchData();
  }, [dispatch]);

  return loading ? (
    <Spinner />
  ) : (
    <Container>
      <Router>
        <div
          ref={headerWrapperRef}
          style={{ position: 'relative', height: '10vh' }}
          className={`${isSticky ? 'sticky' : ''}`}>
          <Header />
        </div>
        {auth.uid ? <Cart /> : null}
        <Switch>
          <Route path='/shop' exact component={Shop} />
          <Route exact path='/shop/:category' component={Items} />
          <Route path='/signup' component={SignUp} />
          <Route path='/signin' component={SignIn} />
          <Route path='/shop/products/:productId' component={ItemDetails} />
          <PrivateRoute path='/checkout'>
            <Checkout />
          </PrivateRoute>
          <PrivateRoute path='/purchased'>
            <PurchasedProducts />
          </PrivateRoute>
          <Route path='/' exact render={() => <Homepage />} />
        </Switch>
      </Router>
    </Container>
  );
}

export default withErrorHandler(App, axios);
