/* @flow */

import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import {
  uid,
  users
} from './user/userReducers'
import {
  userHabits,
  habitListItems
} from './habitList/habitListReducers'

const rootReducer = combineReducers({
  uid,
  users,
  userHabits,
  habitListItems,
  routing
})

export default rootReducer
