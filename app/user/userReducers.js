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

export function users(state: {[key: string]: User} = {}, action: Action): any {

  if (
    action.payload &&
    action.payload.entities &&
    action.payload.entities.users
  ) {
    return {...state, ...action.payload.entities.users}
  }

  if (action.type === 'USER.UPDATE_USERS' && action.payload.update) {
    return action.payload.update(state)
  }

  return state

}
