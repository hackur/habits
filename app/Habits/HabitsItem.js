/**
 * @flow
 */

const React = require('react/addons');
const { Link } = require('react-router');

const PureRender = require('../PureRender');
const HabitViewActionCreators = require('../Habit/HabitViewActionCreators');

const { PropTypes } = React;

const HabitsItem = React.createClass({
  propTypes: {
    habit: PropTypes.object.isRequired
  },

  handleComplete(e: Object) {
    e.preventDefault();
    HabitViewActionCreators.completeHabit(this.props.habit);
  },

  render(): any {
    const completeButton = this.props.habit.get('lastIsToday') ?
      null :
      <a href="#" onClick={this.handleComplete}>Complete</a>;

    const check = this.props.habit.get('lastIsToday') ?
      <div>Done</div> : null;

    return (
      <div>
        {this.props.habit.get('name')}
        {check}
        <div>
          Streak:
          {' '}
          {this.props.habit.get('streak')}
        </div>
        <div>
          {completeButton}
          <Link to="habit"
            params={{habitId: this.props.habit.get('key')}}>
            More
          </Link>
        </div>
      </div>
    );
  }
});

module.exports = PureRender(HabitsItem);
