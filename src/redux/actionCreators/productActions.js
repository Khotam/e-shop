export const addProductToCartAction = (productId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();

    const userId = state.firebase.auth.uid;
    const userCart = state.firestore.data.users[userId].cart;

    try {
      if (productId in userCart) {
        await firestore
          .collection('users')
          .doc(userId)
          .set(
            {
              cart: {
                [productId]: userCart[productId] + 1,
              },
            },
            { merge: true }
          );
        dispatch({ type: 'PRODUCT_INCREMENTED' });
      } else {
        await firestore
          .collection('users')
          .doc(userId)
          .set(
            {
              cart: {
                [productId]: 1,
              },
            },
            { merge: true }
          );
        dispatch({ type: 'PRODUCT_ADDED' });
      }
    } catch (err) {
      dispatch({ type: 'PRODUCT_ADD_ERROR', err });
    }
  };
};

export const decrementProductQuantityAction = (productId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();

    const userId = state.firebase.auth.uid;
    const userCart = state.firestore.data.users[userId].cart;

    try {
      if (userCart[productId] > 1) {
        await firestore
          .collection('users')
          .doc(userId)
          .set(
            {
              cart: {
                [productId]: userCart[productId] - 1,
              },
            },
            { merge: true }
          );
        dispatch({ type: 'PRODUCT_DECREMENTED' });
      }
    } catch (err) {
      dispatch({ type: 'PRODUCT_DECREMENT_ERROR', err });
    }
  };
};

export const removeProductFromCartAction = (productId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();

    const userId = state.firebase.auth.uid;

    try {
      await firestore
        .collection('users')
        .doc(userId)
        .update({
          [`cart.${productId}`]: firestore.FieldValue.delete(),
        });
      dispatch({ type: 'PRODUCT_REMOVED' });
    } catch (err) {
      dispatch({ type: 'PRODUCT_REMOVE_ERROR', err });
    }
  };
};

export const buyItemsAction = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const state = getState();

    const userId = state.firebase.auth.uid;
    const userCart = state.firebase.profile.cart;
    try {
      const setItemsAsBought = async () => {
        await firestore
          .collection('users')
          .doc(userId)
          .set(
            {
              purchasedProducts: { ...userCart },
            },
            { merge: true }
          );
      };
      const removeItemsFromCart = async () => {
        await firestore.collection('users').doc(userId).set(
          {
            cart: {},
          },
          { merge: true }
        );
      };

      await Promise.all([setItemsAsBought(), removeItemsFromCart()]);
      dispatch({ type: 'PRODUCTS_PURCHASED' });
    } catch (err) {
      dispatch({ type: 'PRODUCTS_PURCHASED_ERROR', err });
    }
  };
};
