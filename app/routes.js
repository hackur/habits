/**
 * @flow
 */

var React = require('react/addons');
var { Route, DefaultRoute } = require('react-router');

var AppHandler = require('./AppHandler/AppHandler');

var routes = (
  <Route path="/" handler={AppHandler}>
  </Route>
);

module.exports = routes;
