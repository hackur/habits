/* @flow */

import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as userActions from './user/userActions'
import { LOGGED_OUT_UID } from './user/userConstants'
import { currentUserSelector } from './user/userSelectors'

class AppContainer extends React.Component {

  props: {
    children: Function,
    dispatch: Function,
    uid: ?string
  };

  /**
   * Handle auth for whole app
   */
  componentWillMount() {
    const { dispatch } = this.props
    userActions.initApp(
      authData => dispatch(userActions.receiveLoggedIn(authData)),
      () => dispatch(userActions.receiveLoggedOut())
    )
  }

  /**
   * Watcher for the whole app if user gets logged out at some point
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.uid !== null && this.props.uid !== LOGGED_OUT_UID && nextProps.uid === LOGGED_OUT_UID) {
      browserHistory.push('/login')
    }
  }

  /**
   * If uid is null then the app is doing initial load to get auth status so
   * we'll show a loading screen
   */
  render() {

    if (this.props.uid === null) {
      return <div>Loading...</div>
    }

    return (
      <div>
        {this.props.children}
      </div>
    )

  }

}

AppContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  uid: React.PropTypes.string
}

export default connect(currentUserSelector)(AppContainer)
