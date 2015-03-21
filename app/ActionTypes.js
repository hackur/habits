/**
 * @flow
 */

const keyMirror = require('keymirror');

module.exports = keyMirror({
  RECEIVE_AUTH: null,
  RECEIVE_LOGGED_OUT: null,

  // user
  RECEIVE_USER_META: null,

  // habits
  RECEIVE_ADDED_HABIT: null,
  RECEIVE_CHANGED_HABIT: null,
  RECEIVE_REMOVED_HABIT: null,

  CHANGE_NEW_HABIT: null,
  SUBMIT_NEW_HABIT: null
});
