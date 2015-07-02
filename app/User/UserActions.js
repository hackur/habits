/* @flow */

import type { RawAuth } from './UserTypes';

import ActionTypes from '../ActionTypes';

import * as firebaseUtils from 'shared/firebaseUtils';
import { Action } from 'shared/sharedTypes';

export function receiveLoggedIn(authData: RawAuth): Action {
  if (__DEV__) {
    console.log('Logged in with data: ', authData);
  }

  return {
    type: ActionTypes.UPDATE_USER,
    description: 'Become logged in',
    update: user => user.merge({
      hasAuthStatus: true,
      isLoggedIn: true
    })
  };
}

export function receiveLoggedOut(): Action {
  if (__DEV__) {
    console.log('Logged out');
  }

  return {
    type: ActionTypes.UPDATE_USER,
    description: 'Become logged out',
    update: user => user.merge({
      hasAuthStatus: true,
      isLoggedIn: false
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
        description: 'Receive authentication success',
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
