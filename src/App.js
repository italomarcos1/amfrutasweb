import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { persistWithLocalStorage } from 'react-query/persist-localstorage-experimental';
import { Translator } from 'react-auto-translate';

import Routes from '~/routes';
import Helmet from '~/uk/components/Helmet';

import { store, persistor } from '~/store';

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime: 1000 * 60 * 60 * 12, // 12 hours
      },
    },
  });

  persistWithLocalStorage(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Translator
            from="pt"
            to="en"
            googleApiKey="AIzaSyDy695bfPR_WVGe1GITrxfsSKmrflMUFc4"
          >
            <BrowserRouter>
              <Helmet />
              <Routes />
            </BrowserRouter>
          </Translator>
        </PersistGate>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
