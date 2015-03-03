/**
 * @flow
 */

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { Link } = require('react-router');

require('./InsideHeader.less');

var InsideHeader = React.createClass({
  mixins: [PureRenderMixin],

  render(): any {
    return (
      <div className="inside-header">
        <Link to="habits">
          Habits
        </Link>
      </div>
    );
  }
});

module.exports = InsideHeader;
