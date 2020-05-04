const initialState = {
  authError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP_SUCCESS':
      console.log('User has signed up successfully');
      return state;
    case 'SIGNUP_FAILED':
      console.log('User failed to sign up', action.err.message);
      return { ...state, authError: action.err.message };
    case 'SIGNOUT_SUCCESS':
      console.log('User has successfully signed out');
      return state;
    case 'SIGNIN_SUCCESS':
      console.log('User has successfully signed in');
      return state;
    case 'SIGNIN_FAILED':
      console.log('User failed to sign in', action.err.message);
      return { ...state, authError: action.err.message };
    default:
      return state;
  }
};

export default authReducer;
