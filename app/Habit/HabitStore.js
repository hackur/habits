/**
 * A single habit that has data such as each day.
 *
 * @flow
 */

const Immutable = require('immutable');
const Store = require('../Store');
const ActionTypes = require('../ActionTypes');
const UserStore = require('../User/UserStore');

let _habit = Immutable.Map({
  habit: Immutable.Map(),
  days: Immutable.OrderedMap()
});

const actions = {};

class HabitStore extends Store {
  initialize() {
  }

  get() {
    return _habit;
  }
}

module.exports = new HabitStore(actions);
