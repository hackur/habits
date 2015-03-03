/**
 * @flow
 */

const React = require('react/addons');
const { PureRenderMixin } = React.addons;
const { PropTypes } = React;
const { Link } = require('react-router');

const HabitViewActionCreators = require('../Habit/HabitViewActionCreators');

const HabitsItem = React.createClass({
  propTypes: {
    habit: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

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

module.exports = HabitsItem;
