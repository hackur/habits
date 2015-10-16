/* @flow */

import React from 'react';
import { connect } from 'redux/react';

import App from './App';
import { userPropTypes } from '../User/UserTypes';

class AppContainer extends React.Component {
  render() {
    return <App user={this.props.user}
      dispatch={this.props.dispatch}>
      {this.props.children}
    </App>;
  }
}

AppContainer.propTypes = {
  user: userPropTypes.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

export default connect(state => ({user: state.app.get('user')}))(AppContainer);
