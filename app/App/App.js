/* @flow */

import React from 'react';
import { Navigation } from 'react-router';
import { userPropTypes } from '../User/UserTypes';

var App = React.createClass({
  propTypes: {
    user: userPropTypes.isRequired,
    loadApp: React.PropTypes.func.isRequired,
    receiveLoggedIn: React.PropTypes.func.isRequired,
    receiveLoggedOut: React.PropTypes.func.isRequired
  },

  mixins: [Navigation],

  componentDidMount() {
    this.props.loadApp(
      this.props.receiveLoggedIn,
      this.props.receiveLoggedOut);
  },

  componentDidUpdate(prevProps: Object) {
    if (!prevProps.user.get('isLoggedIn') && this.props.user.get('isLoggedIn')) {
      this.replaceWith('habits');
    } else if (prevProps.user.get('isLoggedIn') && !this.props.user.get('isLoggedIn')) {
      this.replaceWith('/');
    }
  },

  render(): React.Element {
    return <div>
      {this.props.user.get('hasAuthStatus') ? this.props.children : 'Loading...'}
    </div>;
  }
});

export default App;
