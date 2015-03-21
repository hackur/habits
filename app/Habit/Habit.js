/**
 * @flow
 */

const React = require('react/addons');
const { PropTypes } = React;

const PureRender = require('../PureRender');

const Habit = React.createClass({
  propTypes: {
    habit: PropTypes.object.isRequired
  },

  render(): any {
    return (
      <div>
        Habit!
      </div>
    );
  }
});

module.exports = PureRender(Habit);
