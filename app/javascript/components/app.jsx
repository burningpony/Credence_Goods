import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ActionCable from 'actioncable';
import store from './stores/index';
import Experiment from './experiment';
import 'bootstrap/dist/css/bootstrap.min.css';

//export const API_WS_ROOT = `wss://${window.location.hostname}/cable`;
export const API_WS_ROOT = `ws://localhost:3000/cable`;

export const cable = ActionCable.createConsumer(API_WS_ROOT);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Experiment />
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  );
});
