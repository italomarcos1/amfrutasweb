import { call, put, all, takeLatest, select } from 'redux-saga/effects';

import backend from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { data } = payload;

    const {
      data: { data: profileData },
    } = yield call(backend.put, 'clients', data);

    yield put(updateProfileSuccess(profileData));
  } catch (error) {
    // Toast.show('Houve um erro na atualização do perfil, verifique seus dados.');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
