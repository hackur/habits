/* @flow */

import { createStore, applyMiddleware, compose } from 'redux'
import { thunkMiddleware, promiseMiddleware } from './storeMiddleware'
import rootReducer from './reducers'
import DevTools from './DevTools'

export default function configureStore(initialState: any): any {

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware, promiseMiddleware),
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
