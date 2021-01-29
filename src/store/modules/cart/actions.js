export function addToCartRequest(product, qty) {
  return {
    type: '@cart/ADD_TO_CART_REQUEST',
    payload: { product, qty },
  };
}

export function addToCartSuccess(product) {
  return {
    type: '@cart/ADD_TO_CART_SUCCESS',
    payload: { product },
  };
}

export function addToCartFailure() {
  return { type: '@cart/ADD_TO_CART_FAILURE' };
}

export function pushToCart(products) {
  return {
    type: '@cart/PUSH_TO_CART',
    payload: { products },
  };
}

export function updatePages(pages) {
  return {
    type: '@cart/SET_PAGES',
    payload: { pages },
  };
}

export function removeFromCartRequest(id) {
  return {
    type: '@cart/REMOVE_FROM_CART_REQUEST',
    payload: { id },
  };
}

export function removeFromCartSuccess(id) {
  return {
    type: '@cart/REMOVE_FROM_CART_SUCCESS',
    payload: { id },
  };
}

export function removeFromCartFailure() {
  return { type: '@cart/REMOVE_FROM_CART_FAILURE' };
}

export function cleanCart() {
  return {
    type: '@cart/CLEAN_CART',
  };
}

export function addFavorites(favorites) {
  return {
    type: '@cart/ADD_FAVORITES',
    payload: { favorites },
  };
}

// export function addToFavoritesRequest(id) {
//   return {
//     type: '@cart/ADD_TO_FAVORITES_REQUEST',
//     payload: { id },
//   };
// }
export function addToFavoritesRequest(product) {
  return {
    type: '@cart/ADD_TO_FAVORITES_REQUEST',
    payload: { product },
  };
}

export function addToFavoritesSuccess(product) {
  return {
    type: '@cart/ADD_TO_FAVORITES_SUCCESS',
    payload: { product },
  };
}

export function removeFromFavoritesRequest(id) {
  return {
    type: '@cart/REMOVE_FROM_FAVORITES_REQUEST',
    payload: { id },
  };
}

export function removeFromFavoritesSuccess(id) {
  return {
    type: '@cart/REMOVE_FROM_FAVORITES_SUCCESS',
    payload: { id },
  };
}

export function updateAmountRequest(id, qty) {
  return {
    type: '@cart/UPDATE_AMOUNT_REQUEST',
    payload: { id, qty },
  };
}

export function updateAmountSuccess(id, qty) {
  return {
    type: '@cart/UPDATE_AMOUNT_SUCCESS',
    payload: { id, qty },
  };
}

export function updateAmountFailure() {
  return {
    type: '@cart/UPDATE_AMOUNT_FAILURE',
  };
}

export function processOrder(value) {
  return { type: '@cart/PROCESS_ORDER', payload: { value } };
}

export function finishOrderRequest(order) {
  return { type: '@cart/FINISH_ORDER', payload: { order } };
}

export function finishOrderFailure() {
  return { type: '@cart/FINISH_ORDER_FAILURE' };
}

export function orderFinished() {
  return { type: '@cart/ORDER_FINISHED' };
}
