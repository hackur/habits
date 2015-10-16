/* @flow */

import React from 'react';
import { connect } from 'redux/react';

import Front from './Front';

class FrontContainer extends React.Component {
  render() {
    return <Front dispatch={this.props.dispatch} />;
  }
}

FrontContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

export default connect(() => ({}))(FrontContainer);
