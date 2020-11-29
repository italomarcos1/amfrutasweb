import { all, call, put, select, takeLatest } from 'redux-saga/effects';

import backend from '~/services/api';

import {
  addToCartSuccess,
  removeFromCartSuccess,
  updateAmount,
  addToFavoritesSuccess,
  removeFromFavoritesSuccess,
} from './actions';

import { setOrder } from '../user/actions';

export function* addToCart({ payload }) {
  const { product: newProduct, qty } = payload;

  const products = yield select(state => state.cart.products);
  const alreadyInCart = products.findIndex(product => {
    return product.id === newProduct.id;
  });

  if (alreadyInCart >= 0) {
    yield put(updateAmount(newProduct.id, products[alreadyInCart].qty + qty));
    // aqui1
  } else {
    yield put(addToCartSuccess({ ...newProduct, qty }));
    // console.tron.log(err);
    // aqui1
  }
}
export function* removeFromCart({ payload }) {
  try {
    const { id } = payload;
    // aqui1

    yield put(removeFromCartSuccess(id));
  } catch (err) {
    // console.tron.log(err);
    alert('Erro na remoção');
  }
}

export function* addToFavorites({ payload }) {
  const { product } = payload;

  try {
    yield call(backend.post, `clients/wishlists/${product.id}`);
    yield put(addToFavoritesSuccess(product));
  } catch (err) {
    // console.tron.log('err');
    console.log('err');
    alert('Erro ao adicionar favorito.');
  }
}

export function* removeFromFavorites({ payload }) {
  const { id } = payload;

  yield call(backend.delete, `clients/wishlists/${id}`);
  yield put(removeFromFavoritesSuccess(id));
}

export function* finishOrder({ payload }) {
  try {
    const { order } = payload;

    const {
      data: {
        data: { transaction },
      },
    } = yield call(backend.post, '/checkout', order);

    // formatar a data pra ter o 'traço' em vez de barra
    // passar name com 'destination_name' + 'destination_last_name'
    yield put(setOrder(transaction));
  } catch (err) {
    console.log('erro no push order');
  }
}

export default all([
  takeLatest('@cart/ADD_TO_CART_REQUEST', addToCart),
  takeLatest('@cart/REMOVE_FROM_CART_REQUEST', removeFromCart),
  takeLatest('@cart/ADD_TO_FAVORITES_REQUEST', addToFavorites),
  takeLatest('@cart/REMOVE_FROM_FAVORITES_REQUEST', removeFromFavorites),
  takeLatest('@cart/FINISH_ORDER', finishOrder),
]);
