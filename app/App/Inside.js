/* @flow */

import React from 'react';

import { userPropTypes } from '../User/UserTypes';
import * as UserActions from '../User/UserActions';

class Inside extends React.Component {
  componentWillMount() {
    var { dispatch, user } = this.props;
    dispatch(
      UserActions.listenToUserMeta(
        user.toJS(),
        (meta) => dispatch(UserActions.receiveUserMeta(meta))));
  }

  componentWillUnmount() {
    this.props.dispatch(UserActions.stopListeningToUserMeta(
      this.props.user.toJS()));
  }

  render(): React.Element {
    var { children, user, dispatch } = this.props;

    return <div>
      <div>Inside!</div>
      {children}
      {user.get('meta') ?
        `Logged in as ${user.getIn(['meta', 'displayName'])}` :
        `Loading...`
      }
      <a href="#" onClick={e => {
        e.preventDefault();
        dispatch(UserActions.logOut());
      }}>Log out</a>
    </div>;
  }
}

Inside.propTypes = {
  user: userPropTypes.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

export default Inside;
