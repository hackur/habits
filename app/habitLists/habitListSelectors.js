/* @flow */

import { createSelector } from 'reselect'

export const habitListSelectorFromUsernameUid = createSelector(
  (_, ownProps) => ownProps.usernameUid,
  state => state.habitLists,
  state => state.habitListItems,
  (usernameUid, habitLists, habitListItems) => {
    return {
      habitList: habitLists[usernameUid] ?
        habitLists[usernameUid].map(habitId => habitListItems[habitId]) :
        []
    }
  }
)

