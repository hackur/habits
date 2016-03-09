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
import { createSelector } from 'reselect'
import * as userActions from './userActions'
import {
  currentUserSelector,
  isUsernamePrivateSelector,
  usernameUidSelector
} from './userSelectors'
import { userPropTypes } from './userTypes'

class UserContainer extends React.Component {

  state: {
    didCheckIsPrivate: boolean
  };

  props: {
    currentUser: ?User,
    isUsernamePrivate: ?boolean,
    usernameUid: ?string,
    params: {
      username: string
    },
    dispatch: Function,
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

  componentDidUpdate() {
    this.redirect()
  }

  async checkIsPrivate() {
    if (this.props.usernameUid === undefined) {
      await this.props.dispatch(userActions.fetchUsernameUid(this.props.params.username))
    }
    if (this.props.isUsernamePrivate === undefined) {
      await this.props.dispatch(userActions.fetchIsPrivateUser(this.props.params.username))
    }
    this.redirect()
  }

  /**
   * - Redirect if logged in and not on your own username and the username
   * is private
   * - Don't redirect if logged out and user has specified that their page
   * is not private
   */
  async redirect() {

    if (this.props.isUsernamePrivate === undefined) {
      return
    }

    if (this.props.isUsernamePrivate === null) {
      try {
        await userActions.setIsPrivateUser(this.props.params.username, true)
      } catch(e) {
        if (__DEV__) {
          console.warn('No permission') // eslint-disable-line
        }
      }
    }

    const shouldRedirect =
      (this.props.isUsernamePrivate || this.props.isUsernamePrivate === null) &&
      (!this.props.currentUser || this.props.currentUser.username !== this.props.params.username)

    if (shouldRedirect) {
      browserHistory.push('/')
      return
    }

    if (!this.state.didCheckIsPrivate) {
      this.setState({didCheckIsPrivate: true})
    }

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
  isUsernamePrivate: React.PropTypes.bool,
  usernameUid: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired
}

export default connect(createSelector(
  currentUserSelector,
  isUsernamePrivateSelector,
  usernameUidSelector,
  ({ currentUser }, { isUsernamePrivate }, { usernameUid }) => ({
    currentUser,
    isUsernamePrivate,
    usernameUid
  })
))(UserContainer)
