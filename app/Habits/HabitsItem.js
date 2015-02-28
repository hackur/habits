/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { PropTypes } = React;

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

  handleGoTo(e: Object) {
    e.preventDefault();
  },

  render(): any {
    var completeButton = this.props.habit.get('lastIsToday') ?
      null :
      <a href="#" onClick={this.handleComplete}>Complete</a>;

    return (
      <div>
        {this.props.habit.get('name')}
        <div>
          {completeButton}
          <a href="#" onClick={this.handleGoTo}>More</a>
        </div>
      </div>
    );
  }
});

module.exports = HabitsItem;
