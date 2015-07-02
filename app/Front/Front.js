/* @flow */

import React from 'react';

class Front extends React.Component {
  render(): React.Element {
    return <div>
      Front!
      <a href="#" onClick={e => {
        e.preventDefault();
        this.props.authenticateWithTwitter();
      }}>
        Twitter
      </a>
    </div>;
  }
}

Front.propTypes = {
  authenticateWithTwitter: React.PropTypes.func.isRequired
};

export default Front;
