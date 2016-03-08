/* @flow */

import type { User, NewUser, RawAuth } from './userTypes'

export function buildNewUser(user: User): NewUser {
  return {
    displayName: user.auth.twitter.displayName
  }
}

export function convertRawAuth(auth: RawAuth): User {
  return {
    uid: auth.uid,
    auth: auth,
    displayName: null,
    username: null,
    dataUrl: `users/${auth.uid}`
  }
}
