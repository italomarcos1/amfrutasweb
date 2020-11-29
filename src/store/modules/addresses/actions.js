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

export function addAddressRequest(address) {
  return { type: '@addresses/ADD_ADDRESS_REQUEST', payload: { address } };
}

export function addAddressSuccess(address) {
  return { type: '@addresses/ADD_ADDRESS_SUCCESS', payload: { address } };
}

export function addAddressFailure() {
  return { type: '@addresses/ADD_ADDRESS_FAILURE' };
}

export function updateAddressFailure() {
  return { type: '@addresses/UPDATE_ADDRESS_FAILURE' };
}

export function setPrimaryAddress(id) {
  return {
    type: '@addresses/SET_PRIMARY_ADDRESS',
    payload: { id },
  };
}

export function deleteAddressRequest(id) {
  return { type: '@addresses/DELETE_ADDRESS_REQUEST', payload: { id } };
}

export function deleteAddressSuccess(id) {
  return { type: '@addresses/DELETE_ADDRESS_SUCCESS', payload: { id } };
}

export function populateAddresses(addresses) {
  return { type: '@addresses/POPULATE_ADDRESSES', payload: { addresses } };
}
