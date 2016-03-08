/* @flow */

import type { User } from './users/userTypes'
import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as userActions from './users/userActions'
import { userPropTypes } from './users/userTypes'
import { currentUserSelector } from './users/userSelectors'

class ChooseUsernameContainer extends React.Component {

  state: {
    username: string
  };

  props: {
    currentUser: User,
    dispatch: Function
  };

  constructor() {
    super()
    this.state = {
      username: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser && !!nextProps.currentUser.username) {
      browserHistory.push(`/${nextProps.currentUser.username}`)
    }
  }

  async submit() {
    await userActions.setUsername(
      this.props.currentUser,
      this.state.username
    )
    await userActions.addToListOfTakenUsernames(
      this.props.currentUser,
      this.state.username
    )
    this.props.dispatch(userActions.updateUser(
      this.props.currentUser.uid,
      user => ({
        ...user,
        username: this.state.username
      })
    ))
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.username}
          onChange={e => this.setState({username: e.target.value})}
        />
        {this.state.username !== '' &&
          <a onClick={() => this.submit()}>Submit</a>
        }
      </div>
    )
  }

}

ChooseUsernameContainer.propTypes = {
  currentUser: userPropTypes,
  dispatch: React.PropTypes.func.isRequired
}

export default connect(currentUserSelector)(ChooseUsernameContainer)
