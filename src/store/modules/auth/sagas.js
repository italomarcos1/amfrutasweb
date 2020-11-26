import { call, put, all, takeLatest } from 'redux-saga/effects';

import backend from '~/services/api';

import { signInSuccess, signFailure } from '~/store/modules/auth/actions';
import { addFavorites } from '~/store/modules/cart/actions';

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

    yield put(signInSuccess(token, user));
  } catch (error) {
    // console.tron.log(error);
    // console.log(error);
    // console.log('ai');
    alert('Erro no login, confira seus dados.');
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

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
