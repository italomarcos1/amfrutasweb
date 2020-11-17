import produce from 'immer';

const INITIAL_STATE = {
  products: [],
  favorites: [],
  price: '',
  updating: false,
};

export default function cart(state = INITIAL_STATE, { type, payload }) {
  return produce(state, draft => {
    switch (type) {
      case '@cart/ADD_TO_CART_SUCCESS': {
        const { product } = payload;

        draft.products.push(product);

        break;
      }

      case '@cart/REMOVE_FROM_CART_SUCCESS': {
        const { id } = payload;

        const productIndex = draft.products.findIndex(
          product => product.id === id
        );

        if (productIndex > -1) {
          if (draft.products.length === 1) draft.products.splice(0, 1);
          else {
            draft.products = draft.products.filter(
              product => product.id !== id
            );
          }
        }

        break;
      }

      case '@cart/CLEAN_CART': {
        draft.products.splice(0, draft.products.length);
        break;
      }

      case '@cart/ADD_FAVORITES': {
        draft.favorites = payload.favorites;
        break;
      }

      case '@cart/ADD_TO_FAVORITES_REQUEST': {
        draft.updating = true;
        break;
      }

      case '@cart/ADD_TO_FAVORITES_SUCCESS': {
        const { product } = payload;
        console.tron.log(draft.favorites);

        const productIndex = draft.favorites.findIndex(
          favorite => favorite.id === product.id
        );

        console.tron.log('added');

        if (productIndex === -1) draft.favorites.push(product);
        draft.updating = false;

        console.tron.log(draft.favorites);

        break;
      }

      case '@cart/REMOVE_FROM_FAVORITES_REQUEST': {
        draft.updating = true;
        break;
      }

      case '@cart/REMOVE_FROM_FAVORITES_SUCCESS': {
        const { id } = payload;
        const productIndex = draft.favorites.findIndex(
          favorite => favorite.id === id
        );

        if (productIndex >= 0) draft.favorites.splice(productIndex, 1);
        draft.updating = false;

        break;
      }

      case '@cart/UPDATE_AMOUNT': {
        const { id, amount } = payload;

        const productIndex = draft.products.findIndex(prod => prod.id === id);

        if (productIndex >= 0) draft.products[productIndex].amount = amount;

        break;
      }
      case '@auth/SIGN_OUT': {
        draft.favorites = [];
        draft.products = [];
        draft.updating = false;
        break;
      }

      default:
    }
  });
}
