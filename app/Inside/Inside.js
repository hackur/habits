/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var InsideHeader = require('./InsideHeader');
var InsideFooter = require('./InsideFooter');
var UserViewActionCreators = require('../User/UserViewActionCreators');

require('./Inside.less');

var Inside = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  componentWillMount() {
    UserViewActionCreators.listenToUserMeta(
      this.props.user.get('user'),
      this.props.user.get('auth')
    );
  },

  componentWillUnmount() {
    UserViewActionCreators.stopListeningToUserMeta(this.props.user.get('user'));
  },

  render(): any {
    return (
      <div className="inside">
        <InsideHeader />

        {this.props.children}

        <InsideFooter user={this.props.user} />
      </div>
    );
  }
});

module.exports = Inside;
