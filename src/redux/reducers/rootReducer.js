import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import checkoutReducer from './checkoutReducer';
import shopDataReducer from './shopDataReducer';

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  auth: authReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  shop: shopDataReducer,
});

export default rootReducer;
