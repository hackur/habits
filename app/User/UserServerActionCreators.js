/**
 * @flow
 */

'use strict';

var ActionTypes = require('../ActionTypes');
var Dispatcher = require('../Dispatcher');

function receiveUserMeta(meta: UserMeta) {
  Dispatcher.handleAction({
    type: ActionTypes.RECEIVE_USER_META,
    meta
  });
}

function receiveAuth(authData?: Auth) {
  Dispatcher.handleAction({
    type: ActionTypes.RECEIVE_AUTH,
    auth: authData || null
  });
}

function receiveLoggedOut() {
  Dispatcher.handleAction({
    type: ActionTypes.RECEIVE_LOGGED_OUT
  });
}

module.exports = {
  receiveUserMeta,
  receiveAuth,
  receiveLoggedOut
};
