/**
 * @flow
 */

const React = require('react/addons');

const PureRender = require('../PureRender');
const InsideViewActionCreators = require('./InsideViewActionCreators');

const { PropTypes } = React;

require('./InsideFooter.less');

const InsideFooter = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  handleClickLogOut(e: Object) {
    e.preventDefault();
    InsideViewActionCreators.logOut();
  },

  render(): any {
    return (
      <div className="inside-footer">
        {this.props.user.getIn(['user', 'meta', 'displayName'])}
        <div>
          <a href="#" onClick={this.handleClickLogOut}>
            Log out
          </a>
        </div>
      </div>
    );
  }
});

module.exports = PureRender(InsideFooter);
