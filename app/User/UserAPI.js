/* @flow */

import type { User } from './UserTypes';

import * as UserUtils from './UserUtils';
import * as firebaseUtils from 'shared/firebaseUtils';

/**
 * We'll consider user created if they have meta data saved. If they don't it
 * will create a new user and loop back around to this because we have a
 * listener set for this value.
 */
export function listenToUserMeta(user: User, callback: Function) {
  firebaseUtils.listenTo('value')(`${user.dataUrl}/meta`, metaSnapshot => {
    if (metaSnapshot && metaSnapshot.value) {
      callback(metaSnapshot.value);
    } else {
      return firebaseUtils.set(user.dataUrl, UserUtils.getNewUserData(user));
    }
  });
}

export function stopListeningToUserMeta(user: User) {
  firebaseUtils.stopListeningTo('value')(`${user.dataUrl}/meta`);
}
