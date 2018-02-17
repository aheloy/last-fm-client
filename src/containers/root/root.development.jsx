import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';

import DevTools from 'src/containers/dev-tools';
import SearchPage from 'src/containers/search-page';


const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      123
      <Route path="/" component={SearchPage} />
      <DevTools />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root;
