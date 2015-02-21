/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { RouteHandler, Navigation, State } = require('react-router');

require('normalize-css/normalize.css');
require('./AppHandler.less');

var AppHandler = React.createClass({
  render(): any {
    return (
      <div className="app-handler">
        Habits
      </div>
    );
  }
});

module.exports = AppHandler;
