import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { CookiesProvider } from 'react-cookie';

import Routes from '~/routes';
import Helmet from '~/components/Helmet';

import { store, persistor } from '~/store';

export default function App() {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Helmet />
            <Routes />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </CookiesProvider>
  );
}
