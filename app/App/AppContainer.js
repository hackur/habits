/* @flow */

import React from 'react';
import { Connector } from 'redux/react';
import { bindActionCreators } from 'redux';

import App from './App';
import * as UserActions from '../User/UserActions';

export default class ApplicationContainer extends React.Component {
  render() {
    return <Connector select={state => ({user: state.app.get('user')})}>
      {({ user, dispatch }) =>
        <App user={user}
          {...bindActionCreators(UserActions, dispatch)}>
          {this.props.children}
        </App>
      }
    </Connector>;
  }
}

