import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Stock from './containers/Stock'

const store = configureStore();
const rootElement = document.getElementById('root');
// Render the React application to the DOM
ReactDOM.render(
  <Provider store={store}>
    <Stock/>
  </Provider>,
  rootElement
);
