import { call, put, all, select, takeLatest } from 'redux-saga/effects';

import backend from '~/services/api';

import {
  addAddressSuccess,
  addAddressFailure,
  updateShippingInfoSuccess,
  updateAddressFailure,
  deleteAddressSuccess,
} from './actions';
import { updateProfileRequest } from '../user/actions';

export function* addAddress({ payload }) {
  try {
    const { address } = payload;
    const profile = yield select(state => state.user.profile);

    const {
      data: { data },
    } = yield call(backend.post, 'clients/addresses', address);

    if (address.default === 1) {
      const updatedDefaultAddress = { ...profile, default_address: data };

      yield put(updateProfileRequest(updatedDefaultAddress));
    }
    yield put(addAddressSuccess(data));
  } catch (error) {
    yield put(addAddressFailure());
  }
}

export function* updateAddress({ payload }) {
  try {
    const { data } = payload;
    const profile = yield select(state => state.user.profile);

    const {
      data: { data: responseData },
    } = yield call(backend.put, `clients/addresses/${data.id}`, data);

    if (data.default === 1) {
      const updatedDefaultAddress = {
        ...profile,
        default_address: responseData,
      };

      yield put(updateProfileRequest(updatedDefaultAddress));
    }
    yield put(updateShippingInfoSuccess(responseData));
  } catch (error) {
    yield put(updateAddressFailure());
  }
}

export function* updateDefaultAddress({ payload }) {
  try {
    const { id } = payload;
    const profile = yield select(state => state.user.profile);

    const {
      data: { data: responseData },
    } = yield call(backend.put, `clients/addresses/${id}`, { default: 1 });

    const updatedDefaultAddress = {
      ...profile,
      default_address: responseData,
    };

    yield put(updateProfileRequest(updatedDefaultAddress));

    yield put(updateShippingInfoSuccess(responseData));
  } catch (error) {
    yield put(updateAddressFailure());
  }
}

export function* removeAddress({ payload }) {
  try {
    const { id } = payload;
    const profile = yield select(state => state.user.profile);

    yield call(backend.delete, `clients/addresses/${id}`);

    if (profile.default_address.id === id) {
      const updatedDefaultAddress = { ...profile, default_address: [] };

      yield put(updateProfileRequest(updatedDefaultAddress));
    }
    yield put(deleteAddressSuccess(id));
  } catch (error) {
    yield put(addAddressFailure());
  }
}

export default all([
  takeLatest('@addresses/ADD_ADDRESS_REQUEST', addAddress),
  takeLatest('@addresses/UPDATE_SHIPPING_INFO_REQUEST', updateAddress),
  takeLatest('@addresses/SET_PRIMARY_ADDRESS', updateDefaultAddress),
  takeLatest('@addresses/DELETE_ADDRESS_REQUEST', removeAddress),
]);
