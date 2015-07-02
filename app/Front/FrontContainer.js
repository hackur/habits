/* @flow */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'redux/react';

import Front from './Front';
import * as UserActions from '../User/UserActions';

class FrontContainer extends React.Component {
  render() {
    return <Front {...bindActionCreators(UserActions, this.props.dispatch)} />;
  }
}

export default connect(() => ({}))(FrontContainer);
