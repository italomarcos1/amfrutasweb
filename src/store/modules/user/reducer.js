import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  order: null,
  orders: [],
  product: null,
  category: null,
  finalProfile: null,
  active: '',
};

export default function user(state = INITIAL_STATE, { type, payload }) {
  return produce(state, draft => {
    switch (type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = payload.user;
        break;
      }

      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = payload.profile;
        break;
      }
      case '@user/ADD_FINAL_PROFILE_SUCCESS': {
        draft.profile = payload.profile;
        draft.finalProfile = payload.profile;
        break;
      }

      case '@user/HIDE_TAB_BAR': {
        draft.tabBar = false;
        break;
      }

      case '@user/SHOW_TAB_BAR': {
        draft.tabBar = true;
        break;
      }

      case '@user/SET_ORDER': {
        const { order } = payload;
        draft.order = order;
        draft.orders.push(order);

        break;
      }

      case '@user/VIEW_ORDER': {
        draft.triggered = true;
        break;
      }

      case '@user/RESET_ORDER': {
        draft.order = null;
        draft.triggered = false;

        break;
      }

      case '@user/RESET_TRIGGER': {
        draft.triggered = false;

        break;
      }

      case '@user/SET_PRODUCT': {
        draft.product = payload.id;

        break;
      }

      case '@user/SET_CATEGORY': {
        draft.category = payload.id;

        break;
      }

      case '@user/SET_URL_ACTIVE': {
        draft.category = payload.id;

        break;
      }

      case '@auth/SIGN_OUT': {
        draft.profile = null;
        draft.orders = [];
        draft.order = null;
        draft.product = null;
        draft.category = null;
        draft.active = '';
        draft.finalProfile = null;

        break;
      }

      case '@KNIGHTFALL': {
        draft.order = null;
        draft.finalProfile = null;
        break;
      }

      default:
    }
  });
}
