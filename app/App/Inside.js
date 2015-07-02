/* @flow */

import React from 'react';

import { userPropTypes } from '../User/UserTypes';

class Inside extends React.Component {
  render(): React.Element {
    return <div>
      <div>Inside!</div>
      {this.props.children}
      <a onClick={this.props.logOut}>Log out</a>
    </div>;
  }
}

Inside.propTypes = {
  user: userPropTypes.isRequired,
  logOut: React.PropTypes.func.isRequired
};

export default Inside;
