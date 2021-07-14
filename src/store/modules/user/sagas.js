import { call, put, all, takeLatest, select } from 'redux-saga/effects';

import backend from '~/services/api';

import {
  updateProfileSuccess,
  updateProfileFailure,
  addFinalProfileSuccess,
  addFinalProfileFailure,
} from './actions';

export function* updateProfile({ payload }) {
  try {
    const { data } = payload;

    const { default_address } = yield select(s => s.user.profile);

    const {
      data: { data: profileData },
    } = yield call(backend.put, 'clients', data);

    yield put(updateProfileSuccess({ ...profileData, default_address }));
  } catch (error) {
    yield put(updateProfileFailure());
  }
}

export function* addFinalProfile({ payload }) {
  try {
    const { profile } = payload;

    yield call(backend.put, 'clients', profile);

    yield put(addFinalProfileSuccess(profile));
  } catch (error) {
    yield put(addFinalProfileFailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/ADD_FINAL_PROFILE_REQUEST', addFinalProfile),
]);
