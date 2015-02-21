'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;

require('./OutsideHeader.less');

var OutsideHeader = React.createClass({
  mixins: [PureRenderMixin],

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

module.exports = OutsideHeader;
