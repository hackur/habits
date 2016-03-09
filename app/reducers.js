/* @flow */

import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import {
  uid,
  users,
  usernameUids,
  isPrivateUsers
} from './users/userReducers'
import {
  habitLists,
  habitListItems
} from './habitLists/habitListReducers'

const rootReducer = combineReducers({
  uid,
  users,
  usernameUids,
  isPrivateUsers,
  habitLists,
  habitListItems,
  routing
})

export default rootReducer
