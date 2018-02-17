import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'

import rootReducer from 'src/reducers';
import DevTools from 'src/containers/dev-tools';


const enhancer = compose(
  applyMiddleware(thunk, createLogger()),
  DevTools.instrument(),
  persistState(getDebugSessionKey())
);

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
    );
  }

  return store;
}
