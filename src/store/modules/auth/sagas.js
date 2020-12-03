import { call, put, all, select, takeLatest } from 'redux-saga/effects';

import backend from '~/services/api';

import { signInSuccess, signFailure } from '~/store/modules/auth/actions';
import { addFavorites, pushToCart } from '~/store/modules/cart/actions';
import { populateAddresses } from '~/store/modules/addresses/actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(backend.post, 'auth/login', {
      email,
      password,
    });
    const { token, user } = response.data.data;

    const { name, last_name } = user;

    backend.defaults.headers.Authorization = `Bearer ${token}`;

    const {
      data: {
        meta: { message },
        data: favData,
      },
    } = yield call(backend.get, 'clients/wishlists');

    if (message === 'Não há produtos favoritados.') yield put(addFavorites([]));
    else yield put(addFavorites(favData));

    if (name === '' && last_name === '') {
      const {
        data: { data },
      } = yield call(backend.put, 'clients', {
        name: 'Cliente',
        last_name: 'AMFrutas',
      });

      const updatedUser = { ...data, default_address: [] };

      yield put(signInSuccess(token, updatedUser));

      return;
    }

    const notSignedCart = yield select(state => state.cart.products);

    const responseData = yield call(backend.get, '/cart');

    const {
      data: {
        data,
        meta: { message: cartMessage },
      },
    } = responseData;

    if (cartMessage === 'Não há produtos no cesto') {
      yield put(pushToCart([...notSignedCart]));
    } else yield put(pushToCart([...data.products, ...notSignedCart]));

    const addressesData = yield call(backend.get, '/clients/addresses');

    const {
      data: {
        data: addresses,
        meta: { message: addressesMessage },
      },
    } = addressesData;

    if (addressesMessage === 'Você ainda não tem endereços cadastrados.') {
      yield put(populateAddresses([]));
    } else yield put(populateAddresses([...addresses]));

    yield put(signInSuccess(token, user));
  } catch (error) {
    // console.tron.log(error);
    // console.log(error);
    // console.log('ai');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  const {
    data: { email, password },
  } = payload;

  const { data: userData } = payload;

  // console.tron.log(userData);

  try {
    const response = yield call(backend.post, 'auth/login', {
      email,
      password,
    });
    const { token, user } = response.data.data;

    const { name, last_name } = user;

    backend.defaults.headers.Authorization = `Bearer ${token}`;

    if (name === '' && last_name === '') {
      const {
        data: { data },
      } = yield call(backend.put, 'clients', {
        name: 'Cliente',
        last_name: 'AMFrutas',
        ...userData,
      });

      const updatedUser = { ...data, default_address: [] };

      yield put(signInSuccess(token, updatedUser));

      return;
    }

    const notSignedCart = yield select(state => state.cart.products);

    yield put(pushToCart([...notSignedCart]));

    yield put(signInSuccess(token, user));
  } catch (error) {
    // console.tron.log(error);
    // console.log(error);
    // console.log('ai');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    backend.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function* signOut() {
  yield call(backend.post, 'auth/logout');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
