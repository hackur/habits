/**
 * @flow
 */

const firebaseUtils = require('../shared/firebaseUtils');

const logOut = () => {
  firebaseUtils.unauth();
};

module.exports = {
  logOut
};
