/**
 * @flow
 */

const React = require('react/addons');
const { Route, DefaultRoute } = require('react-router');

const AppHandler = require('./AppHandler/AppHandler');

const FrontHandler = require('./FrontHandler/FrontHandler');

const HabitsHandler = require('./HabitsHandler/HabitsHandler');
const NewHabitHandler = require('./NewHabitHandler/NewHabitHandler');
const HabitHandler = require('./HabitHandler/HabitHandler');

const routes = (
  <Route path="/" handler={AppHandler}>
    <DefaultRoute name="front" handler={FrontHandler} />
    <Route name="habit" path="/habits/:habitId" handler={HabitHandler} />
    <Route name="habits" handler={HabitsHandler} />
    <Route name="new" handler={NewHabitHandler} />
  </Route>
);

module.exports = routes;
