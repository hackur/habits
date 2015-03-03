/**
 * Some actions for when the app loads.
 *
 * @flow
 */

const firebaseUtils = require('../shared/firebaseUtils');
const { receiveAuth, receiveLoggedOut } = require('../User/UserServerActionCreators');

/**
 * When App component loads we'll start listening for auth status.
 */
const loadApp = () => firebaseUtils.listenToAuthStatus(receiveAuth, receiveLoggedOut);

module.exports = {
  loadApp
};
