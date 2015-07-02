/* @flow */

import React from 'react';
import { connect } from 'redux/react';
import { bindActionCreators } from 'redux';

import App from './App';
import * as UserActions from '../User/UserActions';
import { userPropTypes } from '../User/UserTypes';

class AppContainer extends React.Component {
  render() {
    return <App user={this.props.user}
      {...bindActionCreators(UserActions, this.props.dispatch)}>
      {this.props.children}
    </App>;
  }
}

AppContainer.propTypes = {
  user: userPropTypes.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

export default connect(state => ({user: state.app.get('user')}))(AppContainer);
