export function updateProfileRequest(data) {
  return { type: '@user/UPDATE_PROFILE_REQUEST', payload: { data } };
}

export function updateProfileSuccess(profile) {
  return { type: '@user/UPDATE_PROFILE_SUCCESS', payload: { profile } };
}

export function updateProfileFailure() {
  return { type: '@user/UPDATE_PROFILE_FAILURE' };
}

export function addFinalProfileRequest(profile) {
  return { type: '@user/ADD_FINAL_PROFILE_REQUEST', payload: { profile } };
}

export function addFinalProfileSuccess(profile) {
  return { type: '@user/ADD_FINAL_PROFILE_SUCCESS', payload: { profile } };
}

export function addFinalProfileFailure() {
  return { type: '@user/ADD_FINAL_PROFILE_FAILURE' };
}

export function hideTabBar() {
  return { type: '@user/HIDE_TAB_BAR' };
}

export function showTabBar() {
  return { type: '@user/SHOW_TAB_BAR' };
}

export function setInfo(info) {
  return { type: '@user/SET_INFO', payload: { info } };
}

export function setOrder(order) {
  return { type: '@user/SET_ORDER', payload: { order } };
}

export function viewOrder() {
  return { type: '@user/VIEW_ORDER' };
}

export function resetOrder() {
  return { type: '@user/RESET_ORDER' };
}

export function resetTrigger() {
  return { type: '@user/RESET_TRIGGER' };
}

export function setProduct(id) {
  return { type: '@user/SET_PRODUCT', payload: { id } };
}

export function setCategory(id) {
  return { type: '@user/SET_CATEGORY', payload: { id } };
}

export function setUrlActive(url) {
  return { type: '@user/SET_URL_ACTIVE', payload: { url } };
}
