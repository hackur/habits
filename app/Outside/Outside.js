/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PropTypes } = React;
var { PureRenderMixin } = React.addons;
var { Navigation } = require('react-router');

var OutsideHeader = require('./OutsideHeader');

require('./Outside.less');

var Outside = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin, Navigation],

  render(): any {
    return (
      <div className="outside">
        <OutsideHeader />
        {this.props.children}
      </div>
    );
  }
});

module.exports = Outside;
