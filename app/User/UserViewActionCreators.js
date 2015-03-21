/**
 * @flow
 */

const UserAPIUtils = require('./UserAPIUtils');

function listenToUserMeta(user: Object, auth: Object) {
  return UserAPIUtils.listenToUserMeta(user.toJS(), auth.toJS());
}

function stopListeningToUserMeta(user: Object) {
  return UserAPIUtils.stopListeningToUserMeta(user.toJS());
}

function listenToHabits(user: Object) {
  return UserAPIUtils.listenToHabits(user.toJS());
}

function stopListeningToHabits(user: Object) {
  return UserAPIUtils.stopListeningToHabits(user.toJS());
}

module.exports = {
  listenToUserMeta,
  stopListeningToUserMeta,
  listenToHabits,
  stopListeningToHabits
};
