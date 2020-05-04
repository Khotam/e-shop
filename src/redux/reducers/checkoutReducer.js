const initialState = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  zip: '',
  state: '',
  country: '',
  cardName: '',
  cardNumber: '',
  expDate: '',
  cvv: '',
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

export default checkoutReducer;
