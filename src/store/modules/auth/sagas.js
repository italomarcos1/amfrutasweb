import { call, put, all, takeLatest } from 'redux-saga/effects';

import { api } from '~/services/api';

import { signInSuccess, signFailure } from '~/store/modules/auth/actions';
import { addFavorites } from '~/store/modules/cart/actions';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(api.post, 'auth/login', { email, password });
    const { token, user } = response.data.data;

    const { name, last_name } = user;

    api.defaults.headers.authorization = `Bearer ${token}`;

    const {
      data: {
        meta: { message },
        data: favData,
      },
    } = yield call(api.get, 'clients/wishlists');

    if (message === 'Não há produtos favoritados.') yield put(addFavorites([]));
    else yield put(addFavorites(favData));

    // if (name === '' && last_name === '') {
    //   const {
    //     data: { data },
    //   } = yield call(api.put, 'clients', {
    //     name: 'Cliente',
    //     last_name: 'AMFrutas',
    //   });

    //   const updatedUser = { ...data, default_address: [] };

    //   yield put(signInSuccess(token, updatedUser));

    //   return;
    // }

    yield put(signInSuccess(token, user));
  } catch (error) {
    alert('Erro no login, confira seus dados.');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
