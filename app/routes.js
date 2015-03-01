/**
 * @flow
 */

var React = require('react/addons');
var { Route, DefaultRoute } = require('react-router');

var AppHandler = require('./AppHandler/AppHandler');

var FrontHandler = require('./FrontHandler/FrontHandler');

var HabitsHandler = require('./HabitsHandler/HabitsHandler');
var NewHabitHandler = require('./NewHabitHandler/NewHabitHandler');
var HabitHandler = require('./HabitHandler/HabitHandler');

var routes = (
  <Route path="/" handler={AppHandler}>
    <DefaultRoute name="front" handler={FrontHandler} />
    <Route name="habit" path="/habits/:habitId" handler={HabitHandler} />
    <Route name="habits" handler={HabitsHandler} />
    <Route name="new" handler={NewHabitHandler} />
  </Route>
);

module.exports = routes;
