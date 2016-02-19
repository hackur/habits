/* @flow */

import { createSelector } from 'reselect'

export function userHabitsSelectorFactory(uid: string): any {
  return createSelector(
    state => state.userHabits,
    state => state.habitListItems,
    (userHabits, habitListItems) => ({
      habitList: userHabits[uid].map(habitId => habitListItems[habitId])
    })
  )
}

