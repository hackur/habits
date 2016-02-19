/* @flow */

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import DevTools from './DevTools'

export default function configureStore(initialState: any): any {

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      DevTools.instrument()
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store

}
