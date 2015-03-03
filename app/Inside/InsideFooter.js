/**
 * @flow
 */

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;

var InsideViewActionCreators = require('./InsideViewActionCreators');

require('./InsideFooter.less');

var InsideFooter = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

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

module.exports = InsideFooter;
