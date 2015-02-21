/**
 * @flow
 */

var React = require('react/addons');
var { Route, DefaultRoute } = require('react-router');

var AppHandler = require('./AppHandler/AppHandler');
var FrontHandler = require('./FrontHandler/FrontHandler');

var routes = (
  <Route path="/" handler={AppHandler}>
    <DefaultRoute name="front" handler={FrontHandler} />
  </Route>
);

module.exports = routes;
