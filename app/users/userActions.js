/* @flow */

import type { RawAuth, User } from './userTypes'
import type { Action } from 'shared/reduxTypes'
import * as userUtils from './userUtils'
import { LOGGED_OUT_UID } from './userConstants'
import * as firebaseUtils from 'shared/firebaseUtils'

export function receiveLoggedIn(auth: RawAuth): Action {

  const users = {
    [auth.uid]: userUtils.convertRawAuth(auth)
  }

  const entities = {users}

  return {
    type: 'CURRENT_USER.RECEIVE_LOGGED_IN',
    payload: {
      uid: auth.uid,
      entities
    }
  }

}

export function receiveLoggedOut(): Action {
  return {
    type: 'CURRENT_USER.RECEIVE_LOGGED_OUT',
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
    type: 'USERS.UPDATE_USERS',
    payload: {
      update: users => ({...users, [uid]: update(users[uid])})
    }
  }
}

export function onUser(user: User, onUserValue: Function) {
  firebaseUtils.on('value', user.dataUrl, onUserValue)
}

export function createNewUser(user: User) {
  firebaseUtils.set(user.dataUrl, userUtils.buildNewUser(user))
}

export function offUser(uid: string, originalCallback: Function) {
  firebaseUtils.off('value', `users/${uid}`, originalCallback)
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

export async function fetchIsPrivateUser(username: string): Promise<Action> {
  const { value } = await firebaseUtils.once('value', `isPrivateUsers/${username}`)
  const entities = {
    isPrivateUsers: {
      [username]: value
    }
  }
  return {
    type: 'USERS.RECEIVE_IS_PRIVATE_USER',
    payload: {
      entities
    }
  }
}

export async function setIsPrivateUser(username: string, isPrivate: boolean): Promise<Action> {
  await firebaseUtils.set(`isPrivateUsers/${username}`, isPrivate)
  const entities = {
    isPrivateUsers: {
      [username]: isPrivate
    }
  }
  return {
    type: 'USERS.SET_IS_PRIVATE_USER',
    payload: {
      entities
    }
  }
}

export async function fetchUsernameUid(username: string): Promise<Action> {
  const { value } = await firebaseUtils.once('value', `usernames/${username}`)
  const entities = {
    usernameUids: {
      [username]: value
    }
  }
  return {
    type: 'USERS.RECEIVE_USERNAME_UID',
    payload: {
      entities
    }
  }
}
