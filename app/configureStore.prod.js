/* @flow */

import { createStore, applyMiddleware } from 'redux'
import { thunkMiddleware, promiseMiddleware } from './storeMiddleware'
import rootReducer from './reducers'

export default function configureStore(initialState: any): any {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware, promiseMiddleware)
  )
}
