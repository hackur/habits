/* @flow */

import type { RawAuth, User, UserMeta } from './UserTypes';

import Immutable from 'immutable';

import * as UserUtils from './UserUtils';
import ActionTypes from '../ActionTypes';
import * as firebaseUtils from 'shared/firebaseUtils';
import { Action } from 'shared/sharedTypes';

export function receiveLoggedIn(auth: RawAuth): Action {
  return {
    type: ActionTypes.UPDATE_USER,
    description: {desc: 'Became logged in', data: auth},
    update: user => user.merge(UserUtils.getUserFromRawAuth(auth))
  };
}

export function receiveLoggedOut(): Action {
  return {
    type: ActionTypes.UPDATE_USER,
    description: 'Became logged out',
    update: user => user.merge({
      hasAuthStatus: true,
      auth: null
    })
  };
}

export function loadApp(loggedInCallback: (auth: RawAuth) => Action, loggedOutCallback: () => Action): () => void {
  return () => {
    firebaseUtils.listenToAuthStatus(loggedInCallback, loggedOutCallback);
  };
}

export function authenticateWithTwitter(): (x: Function) => Promise {
  return dispatch => {
    return firebaseUtils.createAuthWithPopup('twitter').then(() => {
      dispatch({
        type: ActionTypes.UPDATE_USER,
        description: 'Received successful Twitter authentication',
        update: user => user
      });
    });
  };
}

export function logOut(): () => void {
  return () => {
    firebaseUtils.unauth();
  };
}

export function receiveUserMeta(meta: UserMeta): Action {
  return {
    type: ActionTypes.UPDATE_USER,
    description: 'Received user meta',
    update: user => user.set('meta', Immutable.fromJS(meta))
  };
}

/**
 * We'll consider user created if they have meta data saved. If they don't it
 * will create a new user and loop back around to this because we have a
 * listener set for this value.
 */
export function listenToUserMeta(user: User, callback: Function): Function {
  return () => {
    firebaseUtils.listenTo('value')(`${user.dataUrl}/meta`, metaSnapshot => {
      if (metaSnapshot && metaSnapshot.value) {
        callback(metaSnapshot.value);
      } else {
        firebaseUtils.set(user.dataUrl, UserUtils.getNewUserData(user));
      }
    });
  };
}

export function stopListeningToUserMeta(user: User): Function {
  return () => {
    firebaseUtils.stopListeningTo('value')(`${user.dataUrl}/meta`);
  };
}

export function changeDisplayName(name: string): Action {
  return {
    type: ActionTypes.UPDATE_USER,
    description: 'Changed display name',
    update: user => user.setIn(['meta', 'displayName'], name)
  };
}
