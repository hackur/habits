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

export const isUsernamePrivateSelector = createSelector(
  (_, ownProps) => ownProps.params,
  state => state.isPrivateUsers,
  (params, isPrivateUsers) => ({
    isUsernamePrivate: isPrivateUsers[params.username]
  })
)

export const usernameUidSelector = createSelector(
  (_, ownProps) => ownProps.params,
  state => state.usernameUids,
  (params, usernameUids) => ({
    usernameUid: usernameUids[params.username]
  })
)
