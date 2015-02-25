/**
 * @flow
 */

var React = require('react/addons');
var { Route, DefaultRoute } = require('react-router');

var AppHandler = require('./AppHandler/AppHandler');
var FrontHandler = require('./FrontHandler/FrontHandler');
var HabitsHandler = require('./HabitsHandler/HabitsHandler');

module.exports = (
  <Route path="/" handler={AppHandler}>
    <DefaultRoute name="front" handler={FrontHandler} />
    <Route name="habits" handler={HabitsHandler} />
  </Route>
);
