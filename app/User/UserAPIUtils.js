/**
 * @flow
 */

const firebaseUtils = require('../shared/firebaseUtils');
const UserServerActionCreators = require('./UserServerActionCreators');
const UserUtils = require('./UserUtils');

function listenToUserMeta(user: User, auth: Auth) {
  return firebaseUtils.listenToValue(user.dataUrl + '/meta', function(metaSnapshot?) {
    if (metaSnapshot && metaSnapshot.value !== null) {
      UserServerActionCreators.receiveUserMeta(metaSnapshot.value);
    } else {
      // Create new user
      const data = UserUtils.getNewUserData(user, auth);
      return firebaseUtils.set(user.dataUrl, data);
    }
  });
}

function stopListeningToUserMeta(user: User) {
  return firebaseUtils.stopListeningToValue(user.dataUrl + '/meta');
}

function listenToHabits(user: User) {
  const habitsUrl = user.dataUrl + '/habits';
  firebaseUtils.listenToChildAdded(habitsUrl, UserServerActionCreators.receiveAddedHabit);
  firebaseUtils.listenToChildRemoved(habitsUrl, UserServerActionCreators.receiveRemovedHabit);
  firebaseUtils.listenToChildChanged(habitsUrl, UserServerActionCreators.receiveChangedHabit);
}

function stopListeningToHabits(user: User) {
  firebaseUtils.stopListeningToChildren(user.dataUrl + '/habits');
}

module.exports = {
  listenToUserMeta,
  stopListeningToUserMeta,
  listenToHabits,
  stopListeningToHabits
};
