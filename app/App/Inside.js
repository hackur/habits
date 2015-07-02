/* @flow */

import React from 'react';

import { userPropTypes } from '../User/UserTypes';

class Inside extends React.Component {
  componentWillMount() {
    this.props.listenToUserMeta(
      this.props.user.toJS(),
      this.props.receiveUserMeta);
  }

  componentWillUnmount() {
    this.props.stopListeningToUserMeta(this.props.user.toJS());
  }

  render(): React.Element {
    var { children, logOut, user } = this.props;

    return <div>
      <div>Inside!</div>
      {children}
      {user.get('meta') ?
        `Logged in as ${user.getIn(['meta', 'displayName'])}` :
        `Loading...`
      }
      <a href="#" onClick={e => {
        e.preventDefault();
        logOut();
      }}>Log out</a>
    </div>;
  }
}

Inside.propTypes = {
  user: userPropTypes.isRequired,
  logOut: React.PropTypes.func.isRequired,
  listenToUserMeta: React.PropTypes.func.isRequired,
  stopListeningToUserMeta: React.PropTypes.func.isRequired,
  receiveUserMeta: React.PropTypes.func.isRequired
};

export default Inside;
