/* @flow */

import React from 'react';
import { bindActionCreators } from 'redux';
import { Connector } from 'redux/react';

import Front from './Front';
import * as UserActions from '../User/UserActions';

class FrontContainer extends React.Component {
  render() {
    return <Connector>
      {({ dispatch }) =>
        <Front {...bindActionCreators(UserActions, dispatch)} />
      }
    </Connector>;
  }
}

export default FrontContainer;
