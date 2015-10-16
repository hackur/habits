/* @flow */

import styles from './App.less';

import React from 'react';

import Inside from './Inside';
import Outside from './Outside';

import { userPropTypes } from '../User/UserTypes';
import * as UserActions from '../User/UserActions';

import addNavigation from 'shared/addNavigation';

class App extends React.Component {
  componentDidMount() {
    var { dispatch } = this.props;
    dispatch(UserActions.loadApp(
      (auth) => dispatch(UserActions.receiveLoggedIn(auth)),
      () => dispatch(UserActions.receiveLoggedOut())));
  }

  /**
   * This will guarantee you are redirected when your auth status changes but
   * also take care of the initial case where you don't have an auth status.
   */
  componentDidUpdate(prevProps: Object) {
    if (
      (!prevProps.user.get('hasAuthStatus') || !prevProps.user.get('auth')) &&
      this.props.user.get('auth')) {
      this.props.replaceWith('habits');
    } else if (
      (!prevProps.user.get('hasAuthStatus') || prevProps.user.get('auth')) &&
      !this.props.user.get('auth')) {
      this.props.replaceWith('/');
    }
  }

  render(): React.Element {
    if (!this.props.user.get('hasAuthStatus')) {
      if (__DEV__) {
        console.log('First load, no auth status');
      }
      return <div>Loading...</div>;
    }

    var { user, dispatch, children } = this.props;

    return <div className={styles.app}>
      {user.get('auth') ?
        <Inside user={user} dispatch={dispatch}>{children}</Inside> :
        <Outside>{children}</Outside>
      }
    </div>;
  }
}

App.propTypes = {
  user: userPropTypes.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  replaceWith: React.PropTypes.func.isRequired
};

export default addNavigation(App);
