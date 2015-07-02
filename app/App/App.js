/* @flow */

import styles from './App.less';

import React from 'react';
import { Navigation } from 'react-router';

import Inside from './Inside';
import Outside from './Outside';

import { userPropTypes } from '../User/UserTypes';

var App = React.createClass({
  propTypes: {
    user: userPropTypes.isRequired,
    loadApp: React.PropTypes.func.isRequired,
    receiveLoggedIn: React.PropTypes.func.isRequired,
    receiveLoggedOut: React.PropTypes.func.isRequired,
    logOut: React.PropTypes.func.isRequired,
    listenToUserMeta: React.PropTypes.func.isRequired,
    stopListeningToUserMeta: React.PropTypes.func.isRequired
  },

  mixins: [Navigation],

  componentDidMount() {
    this.props.loadApp(
      this.props.receiveLoggedIn,
      this.props.receiveLoggedOut);
  },

  /**
   * This will guarantee you are redirected when your auth status changes but
   * also take care of the initial case where you don't have an auth status.
   */
  componentDidUpdate(prevProps: Object) {
    if (
      (!prevProps.user.get('hasAuthStatus') || !prevProps.user.get('auth')) &&
      this.props.user.get('auth')) {
      this.replaceWith('habits');
    } else if (
      (!prevProps.user.get('hasAuthStatus') || prevProps.user.get('auth')) &&
      !this.props.user.get('auth')) {
      this.replaceWith('/');
    }
  },

  render(): React.Element {
    if (!this.props.user.get('hasAuthStatus')) {
      return <div>Loading...</div>;
    }

    var { user, ...actions } = this.props;

    return <div className={styles.app}>
      {user.get('auth') ?
        <Inside user={user} {...actions}>
          {this.props.children}
        </Inside> :
        <Outside>
          {this.props.children}
        </Outside>
      }
    </div>;
  }
});

export default App;
