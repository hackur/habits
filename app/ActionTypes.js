/**
 * @flow
 */

var keyMirror = require('keymirror');

module.exports = keyMirror({
  RECEIVE_AUTH: null,
  RECEIVE_LOGGED_OUT: null,

  // user
  RECEIVE_USER_META: null,

  // habits
  CHANGE_NEW_HABIT: null,
  SUBMIT_NEW_HABIT: null
});
