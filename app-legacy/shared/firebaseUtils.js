/* @flow */

import Firebase from 'firebase';

export function createAuthWithPopup(type: string): Promise {
  return new Promise((resolve, reject) => {
    new Firebase(__FIREBASE__).authWithOAuthPopup(type, (error, authData) => {
      if (error) {
        reject(error);
      } else {
        resolve(authData);
      }
    });
  });
}

export function listenToAuthStatus(loggedInCallback: Function, loggedOutCallback: Function) {
  new Firebase(__FIREBASE__).onAuth(function(authData) {
    if (authData) {
      loggedInCallback(authData);
    } else {
      loggedOutCallback();
    }
  });
}

export function unauth() {
  new Firebase(__FIREBASE__).unauth();
}

export function listenTo(type: string): (x: string, y: Function) => void {
  return (path: string, callback: Function) => {
    new Firebase(`${__FIREBASE__}${path}`).on(type, snapshot => {
      callback({key: snapshot.key(), value: snapshot.val()});
    });
  };
}

export function stopListeningTo(type: string): (x: string) => void {
  return path => {
    new Firebase(`${__FIREBASE__}${path}`).off(type);
  };
}

export function set(path: string, value: mixed): Promise {
  return new Promise((resolve, reject) => {
    new Firebase(`${__FIREBASE__}${path}`).set(value, error => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  });
}

export function push(path: string, value: mixed): String {
  var pushRef = new Firebase(`${__FIREBASE__}${path}`).push(value);
  return pushRef.key();
}
