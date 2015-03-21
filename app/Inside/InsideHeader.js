/**
 * @flow
 */

const React = require('react/addons');
const { Link } = require('react-router');

require('./InsideHeader.less');

const PureRender = require('../PureRender');

const InsideHeader = React.createClass({
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

module.exports = PureRender(InsideHeader);
