import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './stores/index';
import Experiment from './experiment';
import FunctionGraph from './experiment/graph/component';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Experiment />

    </Provider>,
    document.body.appendChild(document.createElement('div')),
  );
});
