import createSagaMiddleware from 'redux-saga';
// import { persistStore } from 'redux-persist';

import createStore from '~/store/createStore';
// import persistReducers from '~/store/persistReducers';

import rootReducer from '~/store/modules/rootReducer';
import rootSaga from '~/store/modules/rootSaga';

// const __DEV__ = true;

// const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const sagaMonitor = null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

// const store = createStore(persistReducers(rootReducer), middlewares);
const store = createStore(rootReducer, middlewares);
// const store = createStore(rootReducer);
// const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

// export { store, persistor };
export default store;
