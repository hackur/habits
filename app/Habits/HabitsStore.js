/**
 * Create a new habit
 *
 * @flow
 */

const Immutable = require('immutable');
const assign = require('lodash/object/assign');

const Store = require('../Store');
const ActionTypes = require('../ActionTypes');

let _habits = Immutable.Map({
  newHabit: ''
});

function changeNewHabit(action: {newHabit: string}) {
  _habits = _habits.merge({newHabit: action.newHabit});
}

function submitNewHabit() {
  _habits = _habits.merge({newHabit: ''});
}

const actions = {
  [ActionTypes.CHANGE_NEW_HABIT]: changeNewHabit,
  [ActionTypes.SUBMIT_NEW_HABIT]: submitNewHabit
};

module.exports = assign(new Store(actions), {
  initialize() {
  },

  get() {
    return _habits;
  }
});

