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
