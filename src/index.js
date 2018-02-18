import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { RouterToUrlQuery } from 'react-url-query';

import Root from './containers/root';
import configureStore from './store/configure-store';
import './config/axios';


const store = configureStore();

ReactDOM.render(
  <Router>
    <RouterToUrlQuery>
      <Root store={store} />
    </RouterToUrlQuery>
  </Router>,
  document.getElementById('app')
);
