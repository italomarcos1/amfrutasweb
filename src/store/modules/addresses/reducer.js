import produce from 'immer';

const INITIAL_STATE = {
  addresses: [],
  primaryAddress: null,
};

export default function addresses(state = INITIAL_STATE, { type, payload }) {
  return produce(state, draft => {
    switch (type) {
      // case '@auth/SIGN_IN_SUCCESS': {
      //   draft.profile = payload.user;
      //   break;
      // --
      // puxar da api e popular aqui
      // --
      // }
      case '@addresses/ADD_ADDRESS': {
        const { address } = payload;
        console.tron.log(address);
        draft.addresses.push(address);
        if (draft.addresses.length === 1) {
          const newPrimaryAddress = draft.addresses[0];
          draft.primaryAddress = newPrimaryAddress;
        }

        break;
      }

      case '@addresses/DELETE_ADDRESS': {
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

          if (
            draft.primaryAddress !== null &&
            draft.primaryAddress.id === id &&
            draft.addresses.length !== 0
          ) {
            const newPrimaryAddress = draft.addresses[0];
            draft.primaryAddress = newPrimaryAddress;
          }
          if (draft.addresses.length === 0) {
            draft.primaryAddress = null;
          }
        }

        break;
      }

      case '@addresses/SET_PRIMARY_ADDRESS': {
        const { id } = payload;

        const findAddressIndex = draft.addresses.findIndex(
          address => address.id === id
        );

        const findPrimaryAddress = draft.addresses[findAddressIndex];

        draft.primaryAddress = findPrimaryAddress;

        break;
      }

      case '@addresses/UPDATE_SHIPPING_INFO_SUCCESS': {
        console.tron.log('updating address final');
        const { shipping } = payload;
        const findAddressIndex = draft.addresses.findIndex(
          address => address.id === shipping.id
        );

        console.tron.log(`shipping: ${shipping.distrito}`);
        console.tron.log(`findAddressIndex: ${findAddressIndex}`);

        draft.addresses[findAddressIndex] = shipping;

        break;
      }

      case '@auth/SIGN_OUT': {
        draft.addresses = [];
        draft.primaryAddress = null;
        break;
      }
      default:
    }
  });
}
