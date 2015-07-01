/* @flow */

import styles from './Root.less';

import React from 'react';
import { createRedux, bindActionCreators } from 'redux';
import { Provider, Connector } from 'redux/react';

import ActionTypes from './ActionTypes';
import AppStore from './AppStore';

function inc() {
  return {
    type: ActionTypes.INCREMENT
  };
}

var redux = createRedux({app: AppStore});

class InnerTest extends React.Component {
  render() {
    return <div>
      {this.props.counter}
      <a onClick={this.props.inc}>PLUS</a>
    </div>;
  }
}

class Test extends React.Component {
  render(): React.Element {
    return <Connector select={state => ({counter: state.app.get('counter')})}>
      {({ counter, dispatch }) =>
        <InnerTest counter={counter} {...bindActionCreators({inc}, dispatch)} />
      }
    </Connector>;
  }
}

export default class Root extends React.Component {
  render(): React.Element {
    return <Provider redux={redux}>
      {() =>
        <Test />
      }
    </Provider>;
  }
}
