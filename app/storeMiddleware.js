/**
 * http://redux.js.org/docs/advanced/Middleware.html
 *
 * @flow weak
 */

export function promiseMiddleware(store) {
  return next => action => {
    if (typeof action.then !== 'function') {
      return next(action)
    }
    return Promise.resolve(action).then(store.dispatch)
  }
}

export function thunkMiddleware(store) {
  return next => action => {
    return typeof action === 'function' ?
      action(store.dispatch, store.getState) :
      next(action)
  }
}
