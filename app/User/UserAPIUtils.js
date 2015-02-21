/**
 * @flow
 */

'use strict';

var firebaseUtils = require('../shared/firebaseUtils');
var UserServerActionCreators = require('./UserServerActionCreators');
var UserUtils = require('./UserUtils');

function listenToUserMeta(user: User, auth: Auth) {
  return firebaseUtils.listenToValue(user.dataUrl + '/meta', function(metaSnapshot?) {
    if (metaSnapshot && metaSnapshot.value !== null) {
      UserServerActionCreators.receiveUserMeta(metaSnapshot.value);
    } else {
      // Create new user
      var data = UserUtils.getNewUserData(user, auth);
      return firebaseUtils.set(user.dataUrl, data);
    }
  });
}

function stopListeningToUserMeta(user: User) {
  return firebaseUtils.stopListeningToValue(user.dataUrl + '/meta');
}

module.exports = {
  listenToUserMeta,
  stopListeningToUserMeta
};
