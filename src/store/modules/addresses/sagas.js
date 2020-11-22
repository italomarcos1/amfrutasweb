import { call, put, all, takeLatest } from 'redux-saga/effects';
// import Toast from 'react-native-tiny-toast';

// import api from '~/services/api';

import {
  updateShippingInfoSuccess,
  updateShippingInfoFailure,
} from './actions';

export function* updateShippingInfo({ payload }) {
  try {
    // const { name, email, ...rest } = payload.data;
    const { data } = payload;

    // const profile = {
    //   name,
    //   email,
    //   ...(rest.oldPassword ? rest : {}),
    // };

    // const response = yield call(api.put, 'users', profile);

    // Toast.show('Perfil atualizado com sucesso!');

    // yield put(updateProfileSuccess(response.data));
    yield put(updateShippingInfoSuccess(data));
  } catch (error) {
    // Toast.show('Houve um erro na atualização do perfil, verifique seus dados.');
    yield put(updateShippingInfoFailure());
  }
}

export default all([
  takeLatest('@addresses/UPDATE_SHIPPING_INFO_REQUEST', updateShippingInfo),
]);
