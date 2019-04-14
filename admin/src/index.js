import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './configureStore.js';

import Layout from './views/Layout.jsx';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

const updateOnlineStatus = () => console.log(`Page is ${navigator.onLine ? 'online' : 'offline'}`); // eslint-disable-line no-console
window.addEventListener('load', () => {
  updateOnlineStatus();
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
});

render(
  <Provider store={store}>
    <Layout />
  </Provider>,
  document.querySelector('#root')
);
