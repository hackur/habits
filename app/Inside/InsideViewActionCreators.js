/**
 * @flow
 */

var firebaseUtils = require('../shared/firebaseUtils');

function logOut() {
  firebaseUtils.unauth();
}

module.exports = {
  logOut
};
