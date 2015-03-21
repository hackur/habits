/**
 * @flow
 */

const React = require('react/addons');
const Router = require('react-router');
const routes = require('./routes');

module.exports = Router.run(routes, Router.HistoryLocation, Handler => {
  React.render(<Handler />, document.getElementById('content'));
});
