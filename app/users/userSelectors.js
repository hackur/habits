/* @flow */

import { createSelector } from 'reselect'

export const currentUserSelector = createSelector(
  state => state.uid,
  state => state.users,
  (uid, users) => ({
    currentUser: users[uid],
    uid
  })
)
