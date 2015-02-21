/**
 * @flow
 */

'use strict';

var UserAPIUtils = require('./UserAPIUtils');

function listenToUserMeta(user: Object, auth: Object) {
  return UserAPIUtils.listenToUserMeta(user.toJS(), auth.toJS());
}

function stopListeningToUserMeta(user: Object) {
  return UserAPIUtils.stopListeningToUserMeta(user.toJS());
}

module.exports = {
  listenToUserMeta,
  stopListeningToUserMeta
};
