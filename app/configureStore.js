/* @flow */

import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import { devTools } from 'redux-devtools';
import createHistory from 'history/lib/createBrowserHistory';
import thunk from 'redux-thunk';
import routes from './routes';
import rootReducer from './reducers';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  reduxReactRouter({ routes, createHistory }),
  devTools()
)(createStore);

export default function configureStore(initialState: any) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
