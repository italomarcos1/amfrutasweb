export function updateShippingInfoRequest(data) {
  return { type: '@addresses/UPDATE_SHIPPING_INFO_REQUEST', payload: { data } };
}

export function updateShippingInfoSuccess(shipping) {
  return {
    type: '@addresses/UPDATE_SHIPPING_INFO_SUCCESS',
    payload: { shipping },
  };
}

export function updateShippingInfoFailure() {
  return { type: '@addresses/UPDATE_SHIPPING_INFO_FAILURE' };
}

export function addAddress(address) {
  return { type: '@addresses/ADD_ADDRESS', payload: { address } };
}

export function setPrimaryAddress(id) {
  return {
    type: '@addresses/SET_PRIMARY_ADDRESS',
    payload: { id },
  };
}

export function deleteAddress(id) {
  return { type: '@addresses/DELETE_ADDRESS', payload: { id } };
}
