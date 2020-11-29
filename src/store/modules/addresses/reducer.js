import produce from 'immer';

const INITIAL_STATE = {
  addresses: [],
  finalAddress: null,
};

export default function addresses(state = INITIAL_STATE, { type, payload }) {
  return produce(state, draft => {
    switch (type) {
      case '@addresses/POPULATE_ADDRESSES': {
        draft.addresses = payload.addresses;
        break;
      }

      case '@addresses/ADD_ADDRESS_SUCCESS': {
        const { address } = payload;
        draft.addresses.push(address);

        break;
      }

      case '@addresses/ADD_FINAL_ADDRESS_SUCCESS': {
        const { address } = payload;
        draft.addresses.push(address);

        draft.finalAddress = address;

        break;
      }

      case '@addresses/DELETE_ADDRESS_SUCCESS': {
        const { id } = payload;

        const findAddress = draft.addresses.findIndex(
          address => address.id === id
        );

        if (findAddress > -1) {
          if (draft.addresses.length === 1) draft.addresses.splice(0, 1);
          else {
            draft.addresses = draft.addresses.filter(
              address => address.id !== id
            );
          }
        }

        break;
      }

      case '@addresses/SET_PRIMARY_ADDRESS': {
        const { id } = payload;

        const findAddressIndex = draft.addresses.findIndex(
          address => address.id === id
        );

        break;
      }

      case '@addresses/UPDATE_SHIPPING_INFO_SUCCESS': {
        const { shipping } = payload;
        const findAddressIndex = draft.addresses.findIndex(
          address => address.id === shipping.id
        );

        draft.addresses[findAddressIndex] = shipping;

        break;
      }

      case '@addresses/UPDATE_FINAL_SHIPPING_INFO_SUCCESS': {
        const { shipping } = payload;
        const findAddressIndex = draft.addresses.findIndex(
          address => address.id === shipping.id
        );

        draft.addresses[findAddressIndex] = shipping;

        draft.finalAddress = shipping;

        break;
      }

      case '@auth/SIGN_OUT': {
        draft.addresses = [];
        draft.finalAddress = null;

        break;
      }
      default:
    }
  });
}
