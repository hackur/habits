/**
 * For redirecting to username URL
 *
 * @flow
 */

import type { User } from './user/userTypes'
import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { currentUserSelector } from './user/userSelectors'
import { userPropTypes } from './user/userTypes'

class LoggingInContainer extends React.Component {

  props: {
    currentUser: User
  };

  componentWillMount() {
    if (this.props.currentUser && !!this.props.currentUser.username) {
      browserHistory.replace(`/${this.props.currentUser.username}`)
    }
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

LoggingInContainer.propTypes = {
  currentUser: userPropTypes
}

export default connect(currentUserSelector)(LoggingInContainer)
