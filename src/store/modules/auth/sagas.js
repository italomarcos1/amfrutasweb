import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import uuid from 'react-uuid';

import backend from '~/services/api';

import {
  signInSuccess,
  signFailure,
  signUpFailure,
} from '~/store/modules/auth/actions';
import { addFavorites, pushToCart } from '~/store/modules/cart/actions';
import { populateAddresses } from '~/store/modules/addresses/actions';

export function* signIn({ payload }) {
  const { email, password } = payload;
  const sessionUuid = yield select(s => s.auth.uuid);

  try {
    const response = yield call(backend.post, 'auth/login', {
      uuid: sessionUuid,
      email,
      password,
    });
    const { token, user, cart } = response.data.data;

    const { name, last_name, uuid: userUuid } = user;

    let newUuid;
    if (!userUuid) newUuid = sessionUuid;
    else newUuid = userUuid;

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
        uuid: newUuid,
      });

      const updatedUser = {
        ...data,
        uuid: newUuid,
        default_address: [],
      };

      yield put(signInSuccess(token, updatedUser));

      return;
    }

    yield call(backend.put, 'clients', {
      uuid: newUuid,
    });

    if (!!cart) {
      const cartWithoutOptions = cart.products.map(c => {
        return {
          rowId: c.rowId,
          id: c.id,
          qty: c.qty,
          name: c.name,
          price: c.price,
          product: c.options.product,
        };
      });

      yield put(pushToCart(cartWithoutOptions));
    }

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

    const userWithUuid = { ...user, uuid: newUuid };

    yield put(signInSuccess(token, userWithUuid));
  } catch (error) {
    // console.tron.log(error);
    // console.log(error);
    // console.log('ai');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  const { data: userData } = payload;

  const {
    name,
    lastName: last_name,
    email,
    password,
    birthday: birth,
  } = userData;

  try {
    const response = yield call(backend.post, 'auth/login', {
      name,
      last_name,
      email,
      password,
    });
    const { token } = response.data.data;

    backend.defaults.headers.Authorization = `Bearer ${token}`;

    const userUuid = uuid();

    const {
      data: { data },
    } = yield call(backend.put, 'clients', {
      birth,
      uuid: userUuid,
      ...userData,
    });

    const updatedUser = { ...data, default_address: [], uuid: userUuid };

    // const notSignedCart = yield select(state => state.cart.products);

    // yield put(pushToCart([...notSignedCart]));

    yield put(signInSuccess(token, updatedUser));
  } catch (error) {
    // console.tron.log(error);
    // console.log(error);
    // console.log('ai');
    // o endereço cadastrado já existe
    yield put(signUpFailure());
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
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
