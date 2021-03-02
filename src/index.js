import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import CoreLayout from './common/layouts/CoreLayout';
import './styles/_main.scss';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import appReducers from './redux/reducers';

const reduxStore = createStore(appReducers);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <CoreLayout>
        <Routes />
      </CoreLayout>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
