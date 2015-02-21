'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;

require('./InsideHeader.less');

var InsideHeader = React.createClass({
  mixins: [PureRenderMixin],

  render(): any {
    return (
      <div className="inside-header">
        Inside header
      </div>
    );
  }
});

module.exports = InsideHeader;
