/**
 * A single habit that has data such as each day.
 *
 * @flow
 */

const Immutable = require('immutable');
const assign = require('lodash/object/assign');

const Store = require('../Store');
const ActionTypes = require('../ActionTypes');

const UserStore = require('../User/UserStore');

let _habit = Immutable.Map({
  habit: Immutable.Map(),
  days: Immutable.OrderedMap()
});

const actions = {};

module.exports = assign(new Store(actions), {
  initialize() {
  },

  get() {
    return _habit;
  }
});

