/* @flow */

import Firebase from 'firebase'

/**
 * https://www.firebase.com/docs/web/guide/user-auth.html#section-monitoring-authentication
 */
export function onAuth(onLoggedIn: Function, onLoggedOut: Function) {
  new Firebase(__FIREBASE__).onAuth(function(authData) {
    if (authData) {
      if (__DEV__) {
        console.log('Logged in') // eslint-disable-line
      }
      onLoggedIn(authData)
    } else {
      if (__DEV__) {
        console.log('Logged out') // eslint-disable-line
      }
      onLoggedOut()
    }
  })
}

export function authWithOauthPopup(type: string): Promise {
  return new Firebase(__FIREBASE__).authWithOAuthPopup(type)
}

export function logOut() {
  new Firebase(__FIREBASE__).unauth()
}

export function on(type: string, path: string, callback: Function) {
  new Firebase(`${__FIREBASE__}${path}`).on(type, snapshot => {
    callback({key: snapshot.key(), value: snapshot.val()})
  })
}

export function once(type: string, path: string): Promise {
  return new Firebase(`${__FIREBASE__}${path}`).once(type)
}

export function off(type: string, path: string){
  new Firebase(`${__FIREBASE__}${path}`).off(type)
}

export function set(path: string, value: any): Promise {
  return new Firebase(`${__FIREBASE__}${path}`).set(value)
}

export function push(path: string, value: any): Promise {
  const newRef = new Firebase(`${__FIREBASE__}${path}`).push()
  return newRef.set(value).then(() => newRef.key())
}
