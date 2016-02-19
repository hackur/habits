/* @flow */

import type { HabitListItem } from './habitListTypes'
import type { Action } from 'shared/reduxTypes'
import * as firebaseUtils from 'shared/firebaseUtils'

export function receiveHabitListItem(uid: string, key: string, item: HabitListItem): Action {
  const habitListItems = {[key]: item}
  const userHabits = {[uid]: key}
  const entities = {habitListItems, userHabits}
  return {
    type: 'HABIT_LIST.RECEIVE_HABIT_LIST_ITEM',
    payload: {
      entities
    }
  }
}

/**
 * @TODO Not sure what the data format is here
 */
export function receiveHabitListInitialItems(uid: string, items: {[key: string]: HabitListItem}): Action {
  const habitListItems = items
  const userHabits = {
    [uid]: Object.keys(items)
  }
  const entities = {habitListItems, userHabits}
  return {
    type: 'HABIT_LIST.RECEIVE_HABIT_LIST_INITIAL_ITEMS',
    payload: {
      entities
    }
  }
}

export function onHabitListItemChildAdded(
  uid: string,
  callback: Function
) {
  firebaseUtils.on('child_added', `habits/${uid}`, callback)
}

export async function fetchInitialHabitList(uid: string): Promise {
  return await firebaseUtils.once('value', `habits/${uid}`)
}
