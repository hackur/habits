/**
 * Some convenience functions for firebase.
 *
 * @flow
 */

const Firebase = require('firebase');
const firebaseUrl = __FIREBASE__;
const RSVP = require('rsvp');
const curry = require('lodash/function/curry');

function createAuthWithPopup(type: string): Promise {
  const ref = new Firebase(firebaseUrl);
  const promise = new RSVP.Promise(function(resolve, reject) {
    ref.authWithOAuthPopup(type, function(error, authData) {
      if (error) {
        reject(error);
      } else {
        resolve(authData);
      }
    });
  });

  return promise;
}

/**
 * Make sure to add trailing slash to path.
 */
function createRef(path: ?string) {
  return new Firebase(firebaseUrl + (path || ''));
}

function authorizeWithFacebook(): Promise {
  return createAuthWithPopup('facebook');
}

function authorizeWithTwitter(): Promise {
  return createAuthWithPopup('twitter');
}

function unauth() {
  const ref = new Firebase(firebaseUrl);
  ref.unauth();
}

function listenToAuthStatus(loggedInCallback: Function, loggedOutCallback: Function) {
  const ref = new Firebase(firebaseUrl);
  ref.onAuth(function(authData) {
    if (authData) {
      loggedInCallback(authData);
    } else {
      loggedOutCallback();
    }
  });
}

// Receive data

const listenToType = curry(function(type, path, callback) {
  const ref = new Firebase(firebaseUrl + path);

  ref.on(type, function(snapshot) {
    callback({key: snapshot.key(), value: snapshot.val()});
  });
});

const stopListeningToType = curry(function(type, path) {
  const ref = new Firebase(firebaseUrl + path);
  ref.off(type);
});

const listenToValue = listenToType('value');
const stopListeningToValue = stopListeningToType('value');
const listenToChildAdded = listenToType('child_added');
const stopListeningToChildAdded = stopListeningToType('child_added');
const listenToChildRemoved = listenToType('child_removed');
const stopListeningToChildRemoved = stopListeningToType('child_removed');
const listenToChildChanged = listenToType('child_changed');
const stopListeningToChildChanged = stopListeningToType('child_changed');

function stopListeningToChildren(path: string) {
  stopListeningToChildAdded(path);
  stopListeningToChildRemoved(path);
  stopListeningToChildChanged(path);
}

// Write data

function setAtPath(path: string, value: Object|string|boolean): Promise {
  const ref = new Firebase(firebaseUrl + path);

  const promise = new RSVP.Promise(function(resolve, reject) {
    ref.set(value, function(error) {
      if (error) {
        reject();
      } else {
        resolve(value);
      }
    });
  });

  return promise;
}

/**
 * Value has to be an object or this does nothing.
 */
function update(path: string, value: Object): Promise {
  const ref = new Firebase(firebaseUrl + path);

  const promise = new RSVP.Promise(function(resolve, reject) {
    ref.update(value, function(error) {
      if (error) {
        reject();
      } else {
        resolve(value);
      }
    });
  });

  return promise;
}

function remove(path: string): Promise {
  const ref = new Firebase(firebaseUrl + path);

  const promise = new RSVP.Promise(function(resolve, reject) {
    ref.remove(function(error) {
      if (error) {
        reject();
      } else {
        resolve();
      }
    });
  });

  return promise;
}

function push(path: string, value: Object|string): string {
  const ref = new Firebase(firebaseUrl + path);
  const pushed = ref.push(value);
  return pushed.key();
}

module.exports = {
  createRef,
  authorizeWithFacebook,
  authorizeWithTwitter,
  unauth,
  listenToAuthStatus,

  listenToValue,
  stopListeningToValue,
  listenToChildAdded,
  stopListeningToChildAdded,
  listenToChildRemoved,
  stopListeningToChildRemoved,
  listenToChildChanged,
  stopListeningToChildChanged,

  stopListeningToChildren,

  // Needed an alternate fn name or it broke
  set: setAtPath,
  update,
  remove,
  push
};
