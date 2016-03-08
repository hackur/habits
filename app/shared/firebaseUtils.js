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

export function off(type: string, path: string, originalCallback?: Function) {
  const ref = new Firebase(`${__FIREBASE__}${path}`)
  if (originalCallback) {
    ref.off(type, originalCallback)
  } else {
    ref.off(type)
  }
}

export async function once(type: string, path: string): Promise<{key: any, value: any}> {
  const snapshot = await new Firebase(`${__FIREBASE__}${path}`).once(type)
  return {key: snapshot.key(), value: snapshot.val()}
}

export function set(path: string, value: any): Promise {
  return new Firebase(`${__FIREBASE__}${path}`).set(value)
}

export function update(path: string, value: any): Promise {
  return new Firebase(`${__FIREBASE__}${path}`).update(value)
}

export function push(path: string, value: any) {
  new Firebase(`${__FIREBASE__}${path}`).push(value)
}

/**
 * http://stackoverflow.com/questions/27978078/how-to-separate-initial-data-load-from-incremental-children-with-firebase
 */
export async function listenToAndFetch(
  path: string,
  onChildAdded: Function,
  onChildRemoved: Function
): Promise<{key: any, value: any}> {
  const ref = new Firebase(`${__FIREBASE__}${path}`)
  ref.on('child_added', onChildAdded)
  ref.on('child_removed', onChildRemoved)
  const initialSnapshot = await ref.once('value')
  return {key: initialSnapshot.key(), value: initialSnapshot.val()}
}
