/**
 * Create a new habit
 *
 * @flow
 */

'use strict';

var Immutable = require('immutable');
var assign = require('lodash/object/assign');

var Store = require('../Store');
var ActionTypes = require('../ActionTypes');

var _habits = Immutable.Map({
  newHabit: ''
});

function changeNewHabit(action/*: {newHabit: string}*/) {
  _habits = _habits.merge({newHabit: action.newHabit});
}

function submitNewHabit() {
  _habits = _habits.merge({newHabit: ''});
}

var actions = {};
actions[ActionTypes.CHANGE_NEW_HABIT] = changeNewHabit;
actions[ActionTypes.SUBMIT_NEW_HABIT] = submitNewHabit;

module.exports = assign(new Store(actions), {
  initialize() {
  },

  get() {
    return _habits;
  }
});

