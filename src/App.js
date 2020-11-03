import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Routes from '~/routes';

import store from '~/store';

// import ValidationProvider from '~/context';

export default function App() {
  return (
    <Provider store={store}>
      {/* <ValidationProvider> */}
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      {/* </ValidationProvider> */}
    </Provider>
  );
}
