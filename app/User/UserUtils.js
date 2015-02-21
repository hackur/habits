/**
 * @flow
 */

'use strict';

/**
 * Facebook and Twitter give us display name
 */
function getDisplayNameFromAuth(auth: Auth): string {
  return auth[auth.provider].displayName || '';
}

module.exports = {
  getUserFromRawAuth: function(rawAuth: Auth): User {
    return {
      dataUrl: '/' + rawAuth.uid,
      userId: rawAuth.uid,
      meta: null
    };
  },

  getNewUserData: function(user: User, auth: Auth): {meta: UserMeta} {
    return {
      meta: {
        share: false,
        active: true,
        displayName: getDisplayNameFromAuth(auth)
      }
    };
  }
};
