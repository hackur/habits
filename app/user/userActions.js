/* @flow */

import type { RawAuth, User } from './userTypes'
import * as userUtils from './userUtils'
import { LOGGED_OUT_UID } from './userConstants'
import * as firebaseUtils from 'shared/firebaseUtils'
import { Action } from 'shared/reduxTypes'

export function receiveLoggedIn(auth: RawAuth): Action {

  const users = {
    [auth.uid]: userUtils.convertRawUser(auth)
  }

  const entities = {users}

  return {
    type: 'USER.RECEIVE_LOGGED_IN',
    payload: {
      uid: auth.uid,
      entities
    }
  }

}

export function receiveLoggedOut(): Action {
  return {
    type: 'USER.RECEIVE_LOGGED_OUT',
    payload: {
      uid: LOGGED_OUT_UID
    }
  }
}

export function initApp(onLoggedIn: Function, onLoggedOut: Function) {
  firebaseUtils.onAuth(onLoggedIn, onLoggedOut)
}

export function updateUser(uid: string, update: (x: User) => User): Action {
  return {
    type: 'USER.UPDATE_USERS',
    payload: {
      update: users => ({...users, [uid]: update(users[uid])})
    }
  }
}

/**
 * Will create user if doesn't exist yet
 */
export function onUser(user: User, onUserExists: Function) {
  firebaseUtils.on('value', user.dataUrl, snapshot => {
    if (snapshot && snapshot.value) {
      onUserExists(snapshot.value)
    } else {
      // Creates new user
      firebaseUtils.set(user.dataUrl, userUtils.buildNewUser(user))
    }
  })
}

export function offUser(uid: string) {
  firebaseUtils.off('value', `users/${uid}`)
}

export function setUsername(user: User, username: string): Promise {
  return firebaseUtils.set(`${user.dataUrl}/username`, username)
}

export function addToListOfTakenUsernames(user: User, username: string): Promise {
  return firebaseUtils.set(`usernames/${username}`, user.uid)
}

export async function authWithTwitter(): Promise {
  try {
    const authData = await firebaseUtils.authWithOauthPopup('twitter')
    if (__DEV__) {
      console.log('Successful log in with Twitter:', authData) // eslint-disable-line
    }
  } catch(e) {
    if (__DEV__) {
      console.log('Error with log in with Twitter:', e) // eslint-disable-line
    }
  }
}

export function logOut() {
  firebaseUtils.logOut()
}
