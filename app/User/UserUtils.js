/* @flow */

import type { User, NewUserData, RawAuth } from './UserTypes';

/**
 * Facebook and Twitter give us display name
 */
function getDisplayNameFromAuth(user: User): string {
  var facebookName = user.auth && user.auth.facebook ?
    user.auth.facebook.displayName : null;
  var twitterName = user.auth && user.auth.twitter ?
    user.auth.twitter.displayName : null;
  return facebookName || twitterName || '';
}

export function getUserFromRawAuth(auth: RawAuth): User {
  return {
    hasAuthStatus: true,
    dataUrl: `/${auth.uid}`,
    userId: auth.uid,
    meta: null,
    auth
  };
}

export function getNewUserData(user: User): NewUserData {
  return {
    meta: {
      active: true,
      displayName: getDisplayNameFromAuth(user)
    }
  };
}
