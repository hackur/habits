/**
 * @flow
 */

const React = require('react/addons');

const InsideHeader = require('./InsideHeader');
const InsideFooter = require('./InsideFooter');
const PureRender = require('../PureRender');
const UserViewActionCreators = require('../User/UserViewActionCreators');

const { PropTypes } = React;

require('./Inside.less');

const Inside = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  componentWillMount() {
    UserViewActionCreators.listenToUserMeta(
      this.props.user.get('user'),
      this.props.user.get('auth')
    );

    UserViewActionCreators.listenToHabits(this.props.user.get('user'));
  },

  componentWillUnmount() {
    UserViewActionCreators.stopListeningToUserMeta(this.props.user.get('user'));
    UserViewActionCreators.stopListeningToHabits(this.props.user.get('user'));
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

module.exports = PureRender(Inside);
