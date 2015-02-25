/**
 * Some convenience functions for firebase.
 *
 * @flow
 */

'use strict';

var Firebase = require('firebase');
var firebaseUrl = __FIREBASE__;
var RSVP = require('rsvp');
var curry = require('lodash/function/curry');

function createAuthWithPopup(type: string): Promise {
  var ref = new Firebase(firebaseUrl);
  var promise = new RSVP.Promise(function(resolve, reject) {
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
  var ref = new Firebase(firebaseUrl);
  ref.unauth();
}

function listenToAuthStatus(loggedInCallback: Function, loggedOutCallback: Function) {
  var ref = new Firebase(firebaseUrl);
  ref.onAuth(function(authData) {
    if (authData) {
      loggedInCallback(authData);
    } else {
      loggedOutCallback();
    }
  });
}

// Receive data

var listenToType = curry(function(type, path, callback) {
  var ref = new Firebase(firebaseUrl + path);

  ref.on(type, function(snapshot) {
    callback({key: snapshot.key(), value: snapshot.val()});
  });
});

var stopListeningToType = curry(function(type, path) {
  var ref = new Firebase(firebaseUrl + path);
  ref.off(type);
});

var listenToValue = listenToType('value');
var stopListeningToValue = stopListeningToType('value');
var listenToChildAdded = listenToType('child_added');
var stopListeningToChildAdded = stopListeningToType('child_added');
var listenToChildRemoved = listenToType('child_removed');
var stopListeningToChildRemoved = stopListeningToType('child_removed');
var listenToChildChanged = listenToType('child_changed');
var stopListeningToChildChanged = stopListeningToType('child_changed');

function stopListeningToChildren(path: string) {
  stopListeningToChildAdded(path);
  stopListeningToChildRemoved(path);
  stopListeningToChildChanged(path);
}

// Write data

function setAtPath(path: string, value: Object|string): Promise {
  var ref = new Firebase(firebaseUrl + path);

  var promise = new RSVP.Promise(function(resolve, reject) {
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
  var ref = new Firebase(firebaseUrl + path);

  var promise = new RSVP.Promise(function(resolve, reject) {
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
  var ref = new Firebase(firebaseUrl + path);

  var promise = new RSVP.Promise(function(resolve, reject) {
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
  var ref = new Firebase(firebaseUrl + path);
  var pushed = ref.push(value);
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
