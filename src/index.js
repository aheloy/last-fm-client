import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Root from './containers/root';
import configureStore from './store/configure-store';


const store = configureStore();

ReactDOM.render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('app')
);
