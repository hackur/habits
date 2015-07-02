/* @flow */

import Immutable from 'immutable';

import type { RawAuth, User, UserMeta } from './UserTypes';

import * as UserUtils from './UserUtils';
import * as UserAPI from './UserAPI';

import ActionTypes from '../ActionTypes';

import * as firebaseUtils from 'shared/firebaseUtils';
import { Action } from 'shared/sharedTypes';

export function receiveLoggedIn(auth: RawAuth): Action {
  if (__DEV__) {
    console.log('Logged in with data: ', auth);
  }

  return {
    type: ActionTypes.UPDATE_USER,
    description: 'Became logged in',
    update: user => user.merge(UserUtils.getUserFromRawAuth(auth))
  };
}

export function receiveLoggedOut(): Action {
  if (__DEV__) {
    console.log('Logged out');
  }

  return {
    type: ActionTypes.UPDATE_USER,
    description: 'Became logged out',
    update: user => user.merge({
      hasAuthStatus: true,
      auth: null
    })
  };
}

export function loadApp(loggedInCallback: () => Action, loggedOutCallback: () => Action): () => void {
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

export function listenToUserMeta(user: User, callback: Function): Function {
  return () => {
    UserAPI.listenToUserMeta(user, callback);
  };
}

export function stopListeningToUserMeta(user: User): Function {
  return () => {
    UserAPI.stopListeningToUserMeta(user);
  };
}
