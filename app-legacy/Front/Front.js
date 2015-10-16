/* @flow */

import React from 'react';

import * as UserActions from '../User/UserActions';

class Front extends React.Component {
  render(): React.Element {
    return <div>
      Front!
      <a href="#" onClick={e => {
        e.preventDefault();
        this.props.dispatch(UserActions.authenticateWithTwitter());
      }}>
        Twitter
      </a>
    </div>;
  }
}

Front.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

export default Front;
