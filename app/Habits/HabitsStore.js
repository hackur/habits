/**
 * Create a new habit
 *
 * @flow
 */

const Immutable = require('immutable');
const Store = require('../Store');
const ActionTypes = require('../ActionTypes');

let _habits = Immutable.Map({
  newHabit: ''
});

const changeNewHabit = (action: {newHabit: string}) =>
  _habits = _habits.merge({newHabit: action.newHabit});

const submitNewHabit = () =>
  _habits = _habits.merge({newHabit: ''});

const actions = {
  [ActionTypes.CHANGE_NEW_HABIT]: changeNewHabit,
  [ActionTypes.SUBMIT_NEW_HABIT]: submitNewHabit
};

class HabitsStore extends Store {
  initialize() {
  }

  get() {
    return _habits;
  }
}

module.exports = new HabitsStore(actions);
