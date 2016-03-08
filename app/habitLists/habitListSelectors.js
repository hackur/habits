/* @flow */

import { createSelector } from 'reselect'

export function habitListSelectorFromParams(uid: string): any {
  return createSelector(
    state => state.habitLists,
    state => state.habitListItems,
    (habitLists, habitListItems) => ({
      habitList: habitLists[uid].map(habitId => habitListItems[habitId])
    })
  )
}

