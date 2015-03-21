/**
 * @flow
 */

const React = require('react/addons');

require('./OutsideHeader.less');

const PureRender = require('../PureRender');

const OutsideHeader = React.createClass({
  render(): any {
    return (
      <div className="outside-header">
        <h1 className="outside-header__title">
          Habits
        </h1>
      </div>
    );
  }
});

module.exports = PureRender(OutsideHeader);
