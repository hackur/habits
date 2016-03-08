/**
 * For when you are at /:username
 *
 * Also will do things like check permissions for the current user or fill in
 * the isPrivate for a user if doesn't exist
 *
 * @flow
 */

import type { User } from './userTypes'
import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as userActions from './userActions'
import { currentUserSelector } from './userSelectors'
import { userPropTypes } from './userTypes'

class UserContainer extends React.Component {

  state: {
    didCheckIsPrivate: boolean
  };

  props: {
    currentUser: ?User,
    params: {
      username: string
    },
    children: ?any
  };

  constructor() {
    super()
    this.state = {
      didCheckIsPrivate: false
    }
  }

  componentWillMount() {
    this.checkIsPrivate()
  }

  /**
   * - Redirect if logged in and not on your own username and the username
   * is private
   * - Don't redirect if logged out and user has specified that their page
   * is not private
   */
  async checkIsPrivate() {

    const { value } = await userActions.fetchIsPrivateUser(this.props.params.username)

    if (value === null) { // Value doesn't exist!
      try {
        await userActions.setIsPrivateUser(this.props.params.username, true)
      } catch(e) {
        if (__DEV__) {
          console.warn('No permission') // eslint-disable-line
        }
      }
    }

    const shouldRedirect =
      (value || value === null) &&
      (!this.props.currentUser || this.props.currentUser.username !== this.props.params.username)

    if (shouldRedirect) {
      browserHistory.push('/')
      return
    }

    this.setState({didCheckIsPrivate: true})

  }

  render() {
    return this.state.didCheckIsPrivate ?
      <div>
        {this.props.children}
      </div> :
      <div>
        Loading...
      </div>
  }

}

UserContainer.propTypes = {
  currentUser: userPropTypes,
  params: React.PropTypes.object.isRequired
}

export default connect(currentUserSelector)(UserContainer)
