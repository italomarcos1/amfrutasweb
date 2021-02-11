export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {
      token,
      user,
    },
  };
}

export function signUpRequest(data) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { data },
  };
}
export function cancelFirstLogin() {
  return {
    type: '@auth/CANCEL_FIRST_LOGIN',
  };
}

export function notSignedAddedToFavorites() {
  return { type: '@auth/NO_FAVORITE' };
}

export function closeModalState() {
  return { type: '@auth/CLOSE_MODAL' };
}

export function loginLoading() {
  return { type: '@auth/LOADING' };
}

export function loginLoadingError() {
  return { type: '@auth/LOADING_ERROR' };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signUpFailure() {
  return {
    type: '@auth/SIGN_UP_FAILURE',
  };
}

export function cleanLogin() {
  return {
    type: '@auth/CLEAN_LOGIN_ERROR',
  };
}

export function cleanRegister() {
  return {
    type: '@auth/CLEAN_REGISTER_ERROR',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}

export function generateUuid() {
  return { type: '@GENERATE_UUID' };
}
