import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import { App } from './App';
import { store } from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
