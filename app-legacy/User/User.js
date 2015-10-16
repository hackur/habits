/* @flow */

import React from 'react';

import { userPropTypes } from './UserTypes';
import * as UserActions from './UserActions';

class User extends React.Component {
  render(): React.Element {
    var { dispatch, user } = this.props;
    return <div>
      Display name:
      <input value={user.getIn(['meta', 'displayName'])}
        onChange={e => dispatch(UserActions.changeDisplayName(e.target.value))} />
      <a href="#" onClick={e => {
        e.preventDefault();
      }}>Save</a>
    </div>;
  }
}

User.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  user: userPropTypes.isRequired
};

export default User;
