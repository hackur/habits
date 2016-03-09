/* @flow */

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import AppContainer from './AppContainer'
import LoginContainer from './LoginContainer'
import LoggingInContainer from './LoggingInContainer'
import ChooseUsernameContainer from './ChooseUsernameContainer'
import InsideContainer from './InsideContainer'
import UserContainer from './users/UserContainer'
import HabitListContainer from './habitLists/HabitListContainer'

export default (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={LoginContainer} />
    <Route component={InsideContainer}>
      <Route path="logging-in" component={LoggingInContainer} />
      <Route path="choose-username" component={ChooseUsernameContainer} />
      <Route path=":username" component={UserContainer}>
        <IndexRoute component={HabitListContainer} />
      </Route>
    </Route>
  </Route>
)
