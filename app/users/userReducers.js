/* @flow */

import type { User } from './userTypes'
import type { Action } from 'shared/reduxTypes'

export function uid(state: ?string = null, action: Action): ?string {
  if (
    action.payload &&
    action.payload.uid
  ) {
    return action.payload.uid
  }
  return state
}

export function users(state: {[key: string]: User} = {}, action: Action): {[key: string]: User} {

  if (
    action.payload &&
    action.payload.entities &&
    action.payload.entities.users
  ) {
    return {...state, ...action.payload.entities.users}
  }

  if (action.type === 'USERS.UPDATE_USERS' && action.payload.update) {
    return action.payload.update(state)
  }

  return state

}

export function usernameUids(state: {[key: string]: string} = {}, action: Action): {[key: string]: string} {

  if (
    action.payload &&
    action.payload.entities &&
    action.payload.entities.usernameUids
  ) {
    return {...state, ...action.payload.entities.usernameUids}
  }

  return state

}

export function isPrivateUsers(state: {[key: string]: string} = {}, action: Action): {[key: string]: string} {

  if (
    action.payload &&
    action.payload.entities &&
    action.payload.entities.isPrivateUsers
  ) {
    return {...state, ...action.payload.entities.isPrivateUsers}
  }

  return state

}
