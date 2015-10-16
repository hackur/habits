/* @flow */

import React from 'react';

class Outside extends React.Component {
  render(): React.Element {
    return <div>
      Outside!
      {this.props.children}
    </div>;
  }
}

export default Outside;
