/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { PropTypes } = React;

var HabitsViewActionCreators = require('./HabitsViewActionCreators');

var Habits = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
    habits: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  handleChangeNewHabit(e/*: Object*/) {
    HabitsViewActionCreators.changeNewHabit(e.target.value);
  },

  handleKeyDownNewHabit(e/*: Object*/) {
    if (e.keyCode === 13 && (e.metaKey || e.ctrlKey)) {
      HabitsViewActionCreators.submitNewHabit(
        this.props.user.get('user'),
        this.props.habits.get('newHabit')
      );
    }
  },

  render()/*: any*/ {
    var habits = this.props.user.get('habits').map(habit => (
      <div key={habit.key}>
        {habit.name}
      </div>
    )).toArray();

    return (
      <div>
        List of habits
        {habits}
        <div>
          <input value={this.props.habits.get('newHabit')}
            onChange={this.handleChangeNewHabit}
            onKeyDown={this.handleKeyDownNewHabit}
          />
        </div>
      </div>
    );
  }
});

module.exports = Habits;
