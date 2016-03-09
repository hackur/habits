/* @flow */

import type { HabitListItem } from './habitListTypes'
import type { Action } from 'shared/reduxTypes'

export function habitLists(
  state: {[key: string]: Array<string>} = {},
  action: Action
): any {

  if (
    action.payload &&
    action.payload.entities &&
    action.payload.entities.habitLists
  ) {
    return {...state, ...action.payload.entities.habitLists}
  }

  if (action.type === 'HABIT_LISTS.UPDATE_HABIT_LISTS' && action.payload.update) {
    return action.payload.update(state)
  }

  return state

}

export function habitListItems(
  state: {[key: string]: HabitListItem} = {},
  action: Action
): any {

  if (
    action.payload &&
    action.payload.entities &&
    action.payload.entities.habitListItems
  ) {
    return {...state, ...action.payload.entities.habitListItems}
  }

  if (action.type === 'HABIT_LISTS.UPDATE_HABIT_LIST_ITEMS' && action.payload.update) {
    return action.payload.update(state)
  }

  return state

}
