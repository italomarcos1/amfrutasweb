import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import backend from '~/services/api';

import {
  addToCartSuccess,
  removeFromCartSuccess,
  updateAmount,
  addToFavoritesSuccess,
  removeFromFavoritesSuccess,
} from './actions';

export function* addToCart({ payload }) {
  const { product: newProduct, amount } = payload;

  const products = yield select(state => state.cart.products);
  const alreadyInCart = products.findIndex(product => {
    return product.id === newProduct.id;
  });

  if (alreadyInCart >= 0) {
    const { rowId } = products[alreadyInCart];

    yield call(backend.put, `cart/${rowId}/${amount}`);
    yield put(
      updateAmount(newProduct.id, products[alreadyInCart].amount + amount)
    );
  } else {
    try {
      const {
        data: { data },
      } = yield call(backend.post, 'cart', {
        product_id: newProduct.id,
        quantity: amount,
      });

      yield put(addToCartSuccess(data));
    } catch (err) {
      alert('Não adicionou');
      // console.tron.log(err);
    }
  }
}
export function* removeFromCart({ payload }) {
  try {
    const { id } = payload;
    const products = yield select(state => state.cart.products);
    const findIndex = products.findIndex(product => {
      return product.id === id;
    });
    const { rowId } = products[findIndex];
    const { data: removeData } = yield call(backend.delete, `/cart/${rowId}`);

    yield put(removeFromCartSuccess(id));
  } catch (err) {
    // console.tron.log(err);
    alert('Erro na remoção');
  }
}

export function* addToFavorites({ payload }) {
  const { product } = payload;

  // const {
  //   data: { data },
  // } = yield call(backend.get, `ecommerce/products/${id}`);

  // yield call(backend.post, `clients/wishlists/${id}`);
  yield put(addToFavoritesSuccess(product));
}

export function* removeFromFavorites({ payload }) {
  const { id } = payload;

  // yield call(backend.delete, `clients/wishlists/${id}`);
  yield put(removeFromFavoritesSuccess(id));
}

export default all([
  takeLatest('@cart/ADD_TO_CART_REQUEST', addToCart),
  takeLatest('@cart/REMOVE_FROM_CART_REQUEST', removeFromCart),
  takeLatest('@cart/ADD_TO_FAVORITES_REQUEST', addToFavorites),
  takeLatest('@cart/REMOVE_FROM_FAVORITES_REQUEST', removeFromFavorites),
]);
