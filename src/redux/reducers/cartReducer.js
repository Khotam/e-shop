const initialState = {
  cartError: null,
  isOpen: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'PRODUCT_ADDED':
      console.log('Product was added successfully');
      return state;
    case 'PRODUCT_ADD_ERROR':
      console.log('Product adding failure', action.err.message);
      return { ...state, cartError: action.err.message };
    case 'PRODUCT_INCREMENTED':
      console.log('Product was incremented successfully');
      return state;
    case 'PRODUCT_INCREMENT_ERROR':
      console.log('Product incrementing failure', action.err.message);
      return { ...state, cartError: action.err.message };
    case 'PRODUCT_DECREMENTED':
      console.log('Product was decremented successfully');
      return state;
    case 'PRODUCT_DECREMENT_ERROR':
      console.log('Product decrementing failure', action.err.message);
      return { ...state, cartError: action.err.message };
    case 'PRODUCT_REMOVED':
      console.log('Product was removed successfully');
      return state;
    case 'PRODUCT_REMOVE_ERROR':
      console.log('Product removing failure', action.err.message);
      return { ...state, cartError: action.err.message };
    case 'PRODUCTS_PURCHASED':
      console.log('Products were purchased successfully');
      return state;
    case 'PRODUCTS_PURCHASED_ERROR':
      console.log('Products purchasing failure', action.err.message);
      return { ...state, cartError: action.err.message };
    default:
      return state;
  }
};

export default cartReducer;
