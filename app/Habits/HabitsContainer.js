/* @flow */

import React from 'react';
import { connect } from 'redux/react';

import Habits from './Habits';

class HabitsContainer extends React.Component {
  render() {
    return <Habits />;
  }
}

export default connect(() => ({}))(HabitsContainer);
