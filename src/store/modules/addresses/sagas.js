import { call, put, all, select, takeLatest } from 'redux-saga/effects';

import backend from '~/services/api';

import {
  addAddressSuccess,
  addFinalAddressSuccess,
  addAddressFailure,
  updateShippingInfoSuccess,
  updateFinalShippingInfoSuccess,
  updateAddressFailure,
  deleteAddressSuccess,
} from './actions';

import { updateProfileSuccess } from '../user/actions';

export function* addAddress({ payload }) {
  try {
    const { address } = payload;
    const profile = yield select(state => state.user.profile);

    const {
      data: { data },
    } = yield call(backend.post, 'clients/addresses', address);

    if (address.default === 1) {
      const updatedDefaultAddress = { ...profile, default_address: data };

      yield put(updateProfileSuccess(updatedDefaultAddress));
    }
    yield put(
      addAddressSuccess({
        ...data,
        destination_last_name: address.destination_last_name,
      })
    );
  } catch (error) {
    yield put(addAddressFailure());
  }
}
export function* addFinalAddress({ payload }) {
  try {
    const {
      data: { address, profile },
    } = payload;

    const {
      data: { data },
    } = yield call(backend.post, 'clients/addresses', address);

    if (address.default === 1) {
      const updatedDefaultAddress = { ...profile, default_address: data };

      yield put(updateProfileSuccess(updatedDefaultAddress));
    }
    yield put(addFinalAddressSuccess(data));
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

      yield put(updateProfileSuccess(updatedDefaultAddress));
    }
    yield put(updateShippingInfoSuccess(responseData));
  } catch (error) {
    yield put(updateAddressFailure());
  }
}

export function* updateFinalAddress({ payload }) {
  try {
    const {
      data: { profile, address },
    } = payload;

    const addresses = yield select(state => state.addresses.addresses);

    const findIndex = addresses.findIndex(a => a.address === address.address);

    const addressId = addresses[findIndex].id;

    const {
      data: { data: responseData },
    } = yield call(backend.put, `clients/addresses/${addressId}`, address);

    if (address.default === 1) {
      const updatedDefaultAddress = {
        ...profile,
        default_address: responseData,
      };

      yield put(updateProfileSuccess(updatedDefaultAddress));
    }

    yield put(updateFinalShippingInfoSuccess(responseData));
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

    yield put(updateProfileSuccess(updatedDefaultAddress));

    yield put(updateShippingInfoSuccess(responseData));
  } catch (error) {
    yield put(updateAddressFailure());
  }
}

export function* removeAddress({ payload }) {
  try {
    const { id } = payload;
    const profile = yield select(state => state.user.profile);

    const { default_address } = profile;
    yield call(backend.delete, `clients/addresses/${id}`);

    if (default_address.length !== 0) {
      if (default_address.id === id) {
        const updatedDefaultAddress = { ...profile, default_address: [] };

        yield put(updateProfileSuccess(updatedDefaultAddress));
      }
    }
    yield put(deleteAddressSuccess(id));
  } catch (error) {
    yield put(addAddressFailure());
  }
}

export default all([
  takeLatest('@addresses/ADD_ADDRESS_REQUEST', addAddress),
  takeLatest('@addresses/ADD_FINAL_ADDRESS_REQUEST', addFinalAddress),
  takeLatest('@addresses/UPDATE_SHIPPING_INFO_REQUEST', updateAddress),
  takeLatest(
    '@addresses/UPDATE_FINAL_SHIPPING_INFO_REQUEST',
    updateFinalAddress
  ),
  takeLatest('@addresses/SET_PRIMARY_ADDRESS', updateDefaultAddress),
  takeLatest('@addresses/DELETE_ADDRESS_REQUEST', removeAddress),
]);
