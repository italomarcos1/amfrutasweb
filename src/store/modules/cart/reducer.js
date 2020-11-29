import produce from 'immer';

import { calculatePrice } from '~/utils/calculatePrice';

const INITIAL_STATE = {
  products: [],
  favorites: [],
  price: '',
  saved: '',
  updating: false,
  hasOrder: false,
  orderFinished: false,
  pages: 1,
};

export default function cart(state = INITIAL_STATE, { type, payload }) {
  return produce(state, draft => {
    switch (type) {
      case '@cart/ADD_TO_CART_SUCCESS': {
        const { product } = payload;

        draft.products.push(product);

        const totalPages = Math.ceil(draft.products.length / 8);
        draft.pages = totalPages;

        const { formattedPrice, formattedSavedPrice } = calculatePrice(
          draft.products
        );

        draft.price = formattedPrice;
        draft.saved = formattedSavedPrice;

        break;
      }

      case '@cart/REMOVE_FROM_CART_SUCCESS': {
        const { id } = payload;

        const findIndex = draft.products.findIndex(product => {
          return product.id === id;
        });

        if (findIndex > -1) {
          if (draft.products.length === 1) draft.products.splice(0, 1);
          else {
            draft.products = draft.products.filter(
              product => product.id !== id
            );
          }
        }

        const { formattedPrice, formattedSavedPrice } = calculatePrice(
          draft.products
        );

        draft.price = formattedPrice;
        draft.saved = formattedSavedPrice;

        break;
      }

      case '@cart/PROCESS_ORDER': {
        draft.hasOrder = payload.value;
        break;
      }

      case '@cart/PUSH_TO_CART': {
        draft.products = payload.products;
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
        const { id, qty } = payload;

        const productIndex = draft.products.findIndex(
          product => product.id === id
        );

        if (productIndex >= 0) draft.products[productIndex].qty = qty;

        const { formattedPrice, formattedSavedPrice } = calculatePrice(
          draft.products
        );

        draft.price = formattedPrice;
        draft.saved = formattedSavedPrice;

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
