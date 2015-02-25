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
    habits: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  handleChangeNewHabit(e/*: Object*/) {
    HabitsViewActionCreators.changeNewHabit(e.target.value);
  },

  handleKeyDownNewHabit() {
  },

  render()/*: any*/ {
    return (
      <div>
        List of habits
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
