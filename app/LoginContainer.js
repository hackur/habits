/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as userActions from './users/userActions'
import { LOGGED_OUT_UID } from './users/userConstants'

class LoginContainer extends React.Component {

  props: {
    uid: ?string
  };

  componentWillMount() {
    if (this.props.uid !== LOGGED_OUT_UID) {
      browserHistory.push('/logging-in')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uid !== LOGGED_OUT_UID) {
      browserHistory.push('/logging-in')
    }
  }

  render() {
    return (
      <div>
        <a onClick={() => userActions.authWithTwitter()}>Login with twitter</a>
      </div>
    )
  }
}

LoginContainer.propTypes = {
  uid: React.PropTypes.string
}

export default connect(state => ({uid: state.uid}))(LoginContainer)
