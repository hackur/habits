/**
 * @flow
 */

var firebaseUtils = require('../shared/firebaseUtils');

function authorizeWithFacebook() {
  firebaseUtils.authorizeWithFacebook().then(function(authData) {
    if (__DEV__) {
      console.log('Successful Facebook auth:', authData);
    }
  }, function(error) {
    if (__DEV__) {
      console.log('Failed Facebook auth:', error);
    }
  });
}

function authorizeWithTwitter() {
  firebaseUtils.authorizeWithTwitter().then(function(authData) {
    if (__DEV__) {
      console.log('Successful Twitter auth:', authData);
    }
  }, function(error) {
    if (__DEV__) {
      console.log('Failed Twitter auth:', error);
    }
  });
}

module.exports = {
  authorizeWithFacebook,
  authorizeWithTwitter
};
