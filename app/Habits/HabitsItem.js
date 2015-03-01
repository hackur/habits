/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { PropTypes } = React;
var { Link } = require('react-router');

var HabitViewActionCreators = require('../Habit/HabitViewActionCreators');

var HabitsItem = React.createClass({
  propTypes: {
    habit: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  handleComplete(e: Object) {
    e.preventDefault();
    HabitViewActionCreators.completeHabit(this.props.habit);
  },

  render(): any {
    var completeButton = this.props.habit.get('lastIsToday') ?
      null :
      <a href="#" onClick={this.handleComplete}>Complete</a>;

    var check = this.props.habit.get('lastIsToday') ?
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
