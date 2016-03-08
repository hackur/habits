/**
 * For after receiving user auth object
 *
 * @flow
 */

import type { User } from './users/userTypes'
import type { RouterLocation } from 'shared/routerTypes'
import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import * as userActions from './users/userActions'
import { currentUserSelector } from './users/userSelectors'
import { userPropTypes } from './users/userTypes'
import { routerLocationPropTypes } from 'shared/routerTypes'

class InsideContainer extends React.Component {

  props: {
    currentUser: ?User,
    uid: string,
    params: Object,
    location: RouterLocation,
    dispatch: Function,
    children: React.Element
  };

  state: {
    uid: string,
    isListening: boolean
  };

  handleUserValue: Function;

  /**
   * Need to keep uid in state so we can turn off the listener because when the
   * this component unmounts the currentUser data is already gone
   */
  constructor() {
    super()
    this.state = {
      uid: '',
      isListening: false
    }
    this.handleUserValue = this.handleUserValue.bind(this)
  }

  /**
   * Will create user if doesn't exist yet
   */
  handleUserValue(snapshot) {
    if (snapshot && snapshot.value) {
      const userData = snapshot.value
      this.props.dispatch(userActions.updateUser(
        this.props.uid,
        user => ({
          ...user,
          displayName: userData.displayName || null,
          username: userData.username || null
        })
      ))
    } else {
      // Creates new user in db
      if (this.props.currentUser) { // To appease flow
        userActions.createNewUser(this.props.currentUser)
      }
    }
  }

  loadUser() {

    if (this.props.uid && this.props.currentUser && !this.state.isListening) {

      userActions.onUser(this.props.currentUser, this.handleUserValue)

      this.setState({
        uid: this.props.uid,
        isListening: true
      })

    }

    if (
      this.state.isListening &&
      this.props.currentUser &&
      !!this.props.currentUser.displayName
    ) {

      // If we hit this condition it means we already kicked off the listening
      // to user. If username is not null then we have also have fetched the
      // user once and can know if we need to redirect to choose a username /
      // check if username in path is correct before allowing them inside the
      // app
      if (!this.props.currentUser.username && this.props.location.pathname !== '/choose-username') {
        browserHistory.replace('/choose-username')
        return
      }

    }

  }

  componentWillMount() {
    this.loadUser()
  }

  componentDidUpdate() {
    this.loadUser()
  }

  componentWillUnmount() {
    if (this.state.isListening) {
      userActions.offUser(this.state.uid, this.handleUserValue)
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }

}

InsideContainer.propTypes = {
  currentUser: userPropTypes,
  uid: React.PropTypes.string.isRequired,
  params: React.PropTypes.object.isRequired,
  location: routerLocationPropTypes.isRequired,
  dispatch: React.PropTypes.func.isRequired
}

export default connect(currentUserSelector)(InsideContainer)
