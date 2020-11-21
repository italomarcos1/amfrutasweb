import { all } from 'redux-saga/effects';

// import auth from '~/store/modules/auth/sagas';
import user from '~/store/modules/user/sagas';
import cart from '~/store/modules/cart/sagas';
import addresses from '~/store/modules/addresses/sagas';

export default function* rootSaga() {
  return yield all([user, cart, addresses]);
}
