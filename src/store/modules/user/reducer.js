import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
  order: null,
  orders: [],
};

export default function user(state = INITIAL_STATE, { type, payload }) {
  return produce(state, draft => {
    switch (type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = payload.user;
        break;
      }

      case '@auth/SIGN_IN_ALPHA': {
        const guestUser = {
          name: 'Usuário',
          nickname: 'AMFrutas',
          email: 'johndoe@mail.pt',
          dateOfBirth: '31/01/1970',
          nif: '123123123',
          phone: '12 312 31 23',
          gender: 'Masculino',
        };

        draft.profile = guestUser;

        break;
      }

      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.profile = payload.profile;
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
        draft.order = payload.order;
        break;
      }

      case '@cart/FINISH_ORDER': {
        const { order } = payload;
        draft.orders.push(order);

        draft.order = order;
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

      case '@auth/SIGN_OUT': {
        draft.profile = null;
        draft.orders = null;
        break;
      }
      default:
    }
  });
}
