/**
 * @flow
 */

const React = require('react/addons');
const HabitsItem = require('./HabitsItem');

const { PureRenderMixin } = React.addons;
const { PropTypes } = React;

const Habits = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

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

module.exports = Habits;
