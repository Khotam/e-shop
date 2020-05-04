const initailState = {
  shopData: [],
  categories: [],
  error: null,
};

const shopDataReducer = (state = initailState, action) => {
  switch (action.type) {
    case 'RETRIEVE_SHOP_DATA':
      return { ...state, shopData: action.shopData, categories: action.categories };
    case 'RETRIEVE_SHOP_DATA_ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default shopDataReducer;
