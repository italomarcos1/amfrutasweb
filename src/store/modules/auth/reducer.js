import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  loginError: false,
  noFavorite: false,
  firstLogin: false,
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

      case '@auth/CLEAN_LOGIN_ERROR': {
        draft.loginError = false;
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
