/**
 * A single habit that has data such as each day.
 *
 * @flow
 */

'use strict';

var Immutable = require('immutable');
var assign = require('lodash/object/assign');

var Store = require('../Store');
var ActionTypes = require('../ActionTypes');

var _habit = Immutable.Map({
  habit: Immutable.Map(),
  days: Immutable.OrderedMap()
});

var actions = {};

module.exports = assign(new Store(actions), {
  initialize() {
  },

  get() {
    return _habit;
  }
});

