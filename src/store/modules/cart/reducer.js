import produce from 'immer';

const INITIAL_STATE = {
  products: [],
  favorites: [],
  price: '',
  updating: false,
  hasOrder: false,
  orderFinished: false,
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

      case '@cart/PROCESS_ORDER': {
        draft.hasOrder = payload.value;
        break;
      }

      case '@cart/FINISH_ORDER': {
        draft.orderFinished = true;

        break;
      }

      case '@cart/ORDER_FINISHED': {
        draft.orderFinished = false;
        draft.hasOrder = false;
        draft.products = [];

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

        const productIndex = draft.favorites.findIndex(
          favorite => favorite.id === product.id
        );

        if (productIndex === -1) draft.favorites.push(product);
        draft.updating = false;

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
