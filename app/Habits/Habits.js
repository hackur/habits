/**
 * @flow
 */

const React = require('react/addons');
const HabitsItem = require('./HabitsItem');
const PureRender = require('../PureRender');

const { PropTypes } = React;

const Habits = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  render(): any {
    const habits = this.props.user.get('habits').map(habit => (
      <HabitsItem
        key={habit.get('key')}
        habit={habit}
      />
    )).toArray();

    return (
      <div>
        {habits}
      </div>
    );
  }
});

module.exports = PureRender(Habits);
