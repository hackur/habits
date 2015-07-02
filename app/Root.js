/* @flow */

import React from 'react';
import { createRedux } from 'redux';
import { Provider } from 'redux/react';
import { Router, Route } from 'react-router';

import AppContainer from './App/AppContainer';
import HabitsContainer from './Habits/HabitsContainer';
import FrontContainer from './Front/FrontContainer';

import AppStore from './AppStore';

var redux = createRedux({app: AppStore});

class Root extends React.Component {
  render(): React.Element {
    return <Provider redux={redux}>
      {() =>
        <Router history={this.props.history}>
          <Route component={AppContainer}>
            <Route component={FrontContainer} path="/" />
            <Route component={HabitsContainer} path="habits" />
          </Route>
        </Router>
      }
    </Provider>;
  }
}

Root.PropTypes = {
  history: React.PropTypes.object.isRequired
};

export default Root;
