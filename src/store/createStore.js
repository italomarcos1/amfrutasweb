import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
  const __DEV__ = false;

  const enhancer = __DEV__
    ? compose(console.tron.createEnhancer(), applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares);

  // const enhancer = applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
