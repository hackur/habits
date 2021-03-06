/**
 * For redirecting to username URL
 *
 * @flow
 */

import type { User } from './users/userTypes'
import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { currentUserSelector } from './users/userSelectors'
import { userPropTypes } from './users/userTypes'

class LoggingInContainer extends React.Component {

  props: {
    currentUser: User
  };

  redirect() {
    if (this.props.currentUser && !!this.props.currentUser.username) {
      browserHistory.replace(`/${this.props.currentUser.username}`)
    }
  }

  componentWillMount() {
    this.redirect()
  }

  componentDidUpdate() {
    this.redirect()
  }

  render() {
    return (
      <div>
        Loading...
      </div>
    )
  }
}

LoggingInContainer.propTypes = {
  currentUser: userPropTypes
}

export default connect(currentUserSelector)(LoggingInContainer)
