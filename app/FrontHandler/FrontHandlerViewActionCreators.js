/**
 * @flow
 */

const firebaseUtils = require('../shared/firebaseUtils');

const authorizeWithFacebook = () => firebaseUtils.authorizeWithFacebook().then(authData => {
  if (__DEV__) {
    console.log('Successful Facebook auth:', authData);
  }
}, error => {
  if (__DEV__) {
    console.log('Failed Facebook auth:', error);
  }
});

const authorizeWithTwitter = () => firebaseUtils.authorizeWithTwitter().then(authData => {
  if (__DEV__) {
    console.log('Successful Twitter auth:', authData);
  }
}, error => {
  if (__DEV__) {
    console.log('Failed Twitter auth:', error);
  }
});

module.exports = {
  authorizeWithFacebook,
  authorizeWithTwitter
};
