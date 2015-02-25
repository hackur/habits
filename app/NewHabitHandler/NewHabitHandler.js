/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { PropTypes } = React;
var { Navigation } = require('react-router');

var HabitsStore = require('../Habits/HabitsStore');
var HabitsViewActionCreators = require('../Habits/HabitsViewActionCreators');
var StoresMixin = require('../StoresMixin');

var NewHabitHandler = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  mixins: [StoresMixin, PureRenderMixin, Navigation],

  stores: [HabitsStore],

  getStateFromStores()/*: Object*/ {
    return {
      habits: HabitsStore.get()
    };
  },

  handleChangeNewHabit(e/*: Object*/) {
    HabitsViewActionCreators.changeNewHabit(e.target.value);
  },

  handleKeyDownNewHabit(e/*: Object*/) {
    if (e.keyCode === 13 && (e.metaKey || e.ctrlKey)) {
      HabitsViewActionCreators.submitNewHabit(
        this.props.user.get('user'),
        this.state.habits.get('newHabit')
      );

      this.transitionTo('habits');
    }
  },

  render()/*: any*/ {
    return (
      <div>
        <input value={this.state.habits.get('newHabit')}
          onChange={this.handleChangeNewHabit}
          onKeyDown={this.handleKeyDownNewHabit}
        />
      </div>
    );
  }
});

module.exports = NewHabitHandler;
