import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';

import {
  addToCartSuccess,
  removeFromCartSuccess,
  updateAmount,
  addToFavoritesSuccess,
  removeFromFavoritesSuccess,
} from './actions';

import productsList from '~/data';

export function* addToCart({ payload }) {
  const { product, amount } = payload;

  const products = yield select(state => state.cart.products);
  // console.tron.log(product);
  const alreadyInCart = products.findIndex(p => p.id === product.id);

  if (alreadyInCart >= 0) {
    // const { rowId } = products[alreadyInCart];

    // yield call(api.put, `cart/${rowId}/${amount}`);

    yield put(
      updateAmount(product.id, products[alreadyInCart].amount + amount)
    );
  } else {
    // const {
    //   data: { data },
    // } = yield call(api.post, 'cart', {
    //   product_id: product.id,
    //   quantity: amount,
    // });
    const data = productsList.findIndex(p => {
      // if (p.id === product.id) {
      //   console.tron.log(p);
      // }
      return p.id === product.id;
    });
    // console.tron.log(productsList[data]);
    yield put(addToCartSuccess({ ...productsList[data], amount }));
  }
}
export function* removeFromCart({ payload }) {
  const { id } = payload;

  // yield call(api.delete, `cart/${id}`);

  yield put(removeFromCartSuccess(id));
}

export function* addToFavorites({ payload }) {
  const { id } = payload;
  const {
    data: { data },
  } = yield call(api.get, `ecommerce/products/${id}`);

  yield call(api.post, `clients/wishlists/${id}`);
  yield put(addToFavoritesSuccess(data));
}

export function* removeFromFavorites({ payload }) {
  const { id } = payload;

  yield call(api.delete, `clients/wishlists/${id}`);
  yield put(removeFromFavoritesSuccess(id));
}

export default all([
  takeLatest('@cart/ADD_TO_CART_REQUEST', addToCart),
  takeLatest('@cart/REMOVE_FROM_CART_REQUEST', removeFromCart),
  takeLatest('@cart/ADD_TO_FAVORITES_REQUEST', addToFavorites),
  takeLatest('@cart/REMOVE_FROM_FAVORITES_REQUEST', removeFromFavorites),
]);
