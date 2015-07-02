/* @flow */

import React from 'react';
import { Connector } from 'redux/react';

import Habits from './Habits';

class HabitsContainer extends React.Component {
  render() {
    return <Connector select={state => ({})}>
      {({ dispatch }) =>
        <Habits />
      }
    </Connector>;
  }
}

export default HabitsContainer;
