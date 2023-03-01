/**
 * Author : Ryan
 * Date : 2023-02-25
 * Desc : index
 */

import React from 'react';
import logger from 'redux-logger';
import ReactDOM from 'react-dom/client';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import { composeWithDevTools } from 'redux-devtools-extension';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { GlobalStyle } from '@styles/global';
import theme from '@styles/theme';
import modules from '@libs/redux/modules';
import App from './App';
import reportWebVitals from './reportWebVitals';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  modules.rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger)),
);

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
  sagaMiddleware.run(modules.rootSaga);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') || (document.createElement('div') as HTMLElement),
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <HelmetProvider>
          <GlobalStyle />
          <App />
        </HelmetProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);

reportWebVitals();
