/* @flow */

import React from 'react';
import { connect } from 'redux/react';

import User from './User';
import { userPropTypes } from './UserTypes';

class UserContainer extends React.Component {
  render() {
    return <User user={this.props.user}
      dispatch={this.props.dispatch} />;
  }
}

UserContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  user: userPropTypes.isRequired
};

export default connect(state => ({
  user: state.app.get('user')
}))(UserContainer);
