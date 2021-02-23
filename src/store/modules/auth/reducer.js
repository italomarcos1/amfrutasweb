import produce from 'immer';
import uuid from 'react-uuid';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  loginError: false,
  registerError: false,
  noFavorite: false,
  firstLogin: false,
  uuid: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  return produce(state, draft => {
    switch (type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_UP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = payload.token;
        draft.signed = true;
        draft.loading = false;
        draft.loginError = false;
        draft.noFavorite = false;
        draft.firstLogin = true;

        break;
      }

      case '@auth/SIGN_IN_ALPHA': {
        draft.signed = true;
        break;
      }

      case '@GENERATE_UUID': {
        draft.uuid = uuid();
        break;
      }

      case '@SET_UUID': {
        draft.uuid = payload.uuid;
        break;
      }

      case '@auth/LOADING': {
        draft.loading = true;
        break;
      }

      case '@auth/LOADING_ERROR': {
        draft.loading = false;
        break;
      }

      case '@auth/CANCEL_FIRST_LOGIN': {
        draft.firstLogin = false;
        break;
      }

      case '@auth/NO_FAVORITE': {
        draft.noFavorite = true;
        break;
      }

      case '@auth/CLOSE_MODAL': {
        draft.noFavorite = false;
        break;
      }

      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        draft.loginError = true;
        break;
      }

      case '@auth/SIGN_UP_FAILURE': {
        draft.loading = false;
        draft.registerError = true;
        break;
      }

      case '@auth/CLEAN_LOGIN_ERROR': {
        draft.loginError = false;
        break;
      }

      case '@auth/CLEAN_REGISTER_ERROR': {
        draft.registerError = false;
        break;
      }

      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.signed = false;
        draft.loading = false;
        break;
      }
      default:
    }
  });
};
