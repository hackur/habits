/* @flow */

import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import {
  uid,
  users
} from './users/userReducers'
import {
  userHabits,
  habitListItems
} from './habitLists/habitListReducers'

const rootReducer = combineReducers({
  uid,
  users,
  userHabits,
  habitListItems,
  routing
})

export default rootReducer
