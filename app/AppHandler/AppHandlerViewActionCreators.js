/**
 * Some actions for when the app loads.
 *
 * @flow
 */

'use strict';

var firebaseUtils = require('../shared/firebaseUtils');
var { receiveAuth, receiveLoggedOut } = require('../User/UserServerActionCreators');

/**
 * When App component loads we'll start listening for auth status.
 */
function loadApp() {
  firebaseUtils.listenToAuthStatus(receiveAuth, receiveLoggedOut);
}

module.exports = {
  loadApp
};
