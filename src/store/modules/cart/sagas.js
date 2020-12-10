import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import uuid from 'react-uuid';

import backend from '~/services/api';

import {
  addToCartSuccess,
  removeFromCartSuccess,
  updateAmountSuccess,
  addToFavoritesSuccess,
  removeFromFavoritesSuccess,
} from './actions';

import { signInSuccess } from '../auth/actions';
import { setOrder } from '../user/actions';

export function* addToCart({ payload }) {
  try {
    const profile = yield select(state => state.user.profile);
    const signed = yield select(state => state.auth.signed);
    const notSignedUuid = yield select(state => state.auth.uuid);
    const token = yield select(state => state.auth.token);
    const { product, qty } = payload;
    const products = yield select(state => state.cart.products);
    const alreadyInCart = products.findIndex(p => {
      return p.id === product.id;
    });

    let newUuid;
    newUuid = profile !== null ? profile.uuid : null;

    if (!signed) {
      newUuid = notSignedUuid;
    } else {
      newUuid = profile.uuid;
    }

    const pushProduct = {
      uuid: newUuid,
      product_id: product.id,
      quantity: qty,
    };

    if (alreadyInCart >= 0) {
      const { rowId, qty: currentQty } = products[alreadyInCart];
      // conferir se o update retorna certo os dados
      const {
        data: { data },
      } = yield call(backend.put, `cart/${rowId}/${currentQty + qty}`, {
        ...pushProduct,
      });
      // 80%

      yield put(updateAmountSuccess(product.id, data.qty));
    } else {
      const {
        data: { data },
      } = yield call(backend.post, '/cart', { ...pushProduct });

      const {
        options: { product: productData },
      } = data;

      // formattedData;

      delete data.options;

      yield put(addToCartSuccess({ ...data, product: productData }));
    }
  } catch (error) {
    console.log(error);
  }
}
export function* removeFromCart({ payload }) {
  try {
    const { id } = payload;

    const { uuid: userUuid } = yield select(state => state.user.profile);
    const products = yield select(state => state.cart.products);
    const findIndex = products.findIndex(p => {
      return p.id === id;
    });

    const { rowId } = products[findIndex];

    yield call(backend.delete, `/cart/${userUuid}/${rowId}`);

    yield put(removeFromCartSuccess(id));
  } catch (err) {
    console.log(err);
    alert('Erro na remoção');
  }
}

export function* updateAmount({ payload }) {
  try {
    const profile = yield select(state => state.user.profile);
    const signed = yield select(state => state.auth.signed);
    const notSignedUuid = yield select(state => state.auth.uuid);
    const products = yield select(state => state.cart.products);
    const { id, qty } = payload;

    const findIndex = products.findIndex(p => {
      return p.id === id;
    });

    const { rowId } = products[findIndex];

    let newUuid;
    newUuid = profile !== null ? profile.uuid : null;

    if (!signed) {
      newUuid = notSignedUuid;
    } else {
      newUuid = profile.uuid;
    }
    yield call(backend.put, `/cart/${rowId}/${qty}`, {
      uuid: newUuid,
    });

    yield put(updateAmountSuccess(id, qty));
  } catch (error) {
    console.log(error);
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
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
  takeLatest('@cart/ADD_TO_FAVORITES_REQUEST', addToFavorites),
  takeLatest('@cart/REMOVE_FROM_FAVORITES_REQUEST', removeFromFavorites),
  takeLatest('@cart/FINISH_ORDER', finishOrder),
]);
