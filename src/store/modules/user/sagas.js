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
    // console.tron.log('flamengo');

    // console.tron.log(data);

    const {
      data: { data: profileData },
    } = yield call(backend.put, 'clients', data);

    yield put(updateProfileSuccess(profileData));
  } catch (error) {
    yield put(updateProfileFailure());
  }
}

export function* addFinalProfile({ payload }) {
  try {
    const { profile } = payload;

    const {
      data: { data },
    } = yield call(backend.put, 'clients', profile);

    yield put(addFinalProfileSuccess(data));
  } catch (error) {
    yield put(addFinalProfileFailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  takeLatest('@user/ADD_FINAL_PROFILE_REQUEST', addFinalProfile),
]);
