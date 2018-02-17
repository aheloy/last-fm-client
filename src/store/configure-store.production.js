import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from 'src/reducers';
import DevTools from 'src/containers/dev-tools';


// const enhancer = compose();

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
    );
  }

  return store;
}
