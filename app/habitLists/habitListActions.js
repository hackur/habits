/* @flow */

import type { HabitListItem } from './habitListTypes'
import type { Action } from 'shared/reduxTypes'
import * as habitListUtils from './habitListUtils'
import * as firebaseUtils from 'shared/firebaseUtils'

function updateHabitList(uid: string, update: Function): Action {
  return {
    type: 'HABIT_LISTS.UPDATE_HABIT_LISTS',
    payload: {
      update: habitLists => {
        return {
          ...habitLists,
          [uid]: update(habitLists[uid])
        }
      }
    }
  }
}

export function receiveHabitListChildAdded(
  uid: string,
  key: string,
  value: HabitListItem
): Function {
  const entities = {
    habitListItems: habitListUtils.convertRawHabitListItems({[key]: value})
  }
  return dispatch => {
    dispatch({
      type: 'HABIT_LISTS.RECEIVE_HABIT_LIST_CHILD_ADDED',
      payload: {
        entities
      }
    })
    dispatch(updateHabitList(
      uid,
      habitList => [...habitList, key]
    ))
  }
}

export function receiveHabitListChildRemoved(uid: string, key: string): Action {
  return updateHabitList(
    uid,
    habitLists => {
      const index = habitLists[uid].indexOf(habitId => habitId === key)
      return {
        ...habitLists,
        [uid]: habitLists[uid].slice().splice(index, 1)
      }
    }
  )
}

export async function listenToAndFetchHabitList(
  uid: string,
  onHabitListChildAdded: Function,
  onHabitListChildRemoved: Function
): Promise<Action> {

  const { value } = await firebaseUtils.listenToAndFetch(
    `habitLists/${uid}`,
    onHabitListChildAdded,
    onHabitListChildRemoved
  )

  const habitLists = {
    [uid]: value ? Object.keys(value) : []
  }

  const habitListItems = value ?
    habitListUtils.convertRawHabitListItems(value) :
    {}

  const entities = {
    habitLists,
    habitListItems
  }

  return {
    type: 'HABIT_LISTS.RECEIVE_INITIAL_HABIT_LIST_SNAPSHOT',
    payload: {
      entities
    }
  }

}

export function offHabitList(
  uid: string,
  onHabitListChildAdded: Function,
  onHabitListChildRemoved: Function
) {
  const path = `habitLists/${uid}`
  firebaseUtils.off('child_added', path, onHabitListChildAdded)
  firebaseUtils.off('child_removed', path, onHabitListChildRemoved)
}

export function createHabitListItem(
  uid: string,
  name: string
) {
  const newHabitListItem = habitListUtils.buildNewHabitListItem(name)
  firebaseUtils.push(`habitLists/${uid}`, newHabitListItem)
}
