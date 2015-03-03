/**
 * All user stuff, including auth information.
 *
 * @flow
 */

const Immutable = require('immutable');
const assign = require('lodash/object/assign');

const UserUtils = require('./UserUtils');
const HabitUtils = require('../Habit/HabitUtils');
const Store = require('../Store');
const ActionTypes = require('../ActionTypes');

let _user = Immutable.Map({
  user: null,
  auth: null,
  habits: Immutable.OrderedMap()
});

const receiveAuth = action => {
  const user = UserUtils.getUserFromRawAuth(action.auth);
  _user = _user.merge({auth: action.auth, user: user});
};

const receiveLoggedOut = () =>
  _user = _user.merge({auth: null, user: null});

const receiveUserMeta = action =>
  _user = _user.update('user', user => user.merge({meta: action.meta}));

const receiveAddedHabit = (action: {rawHabit: RawHabit}) => {
  const converted = HabitUtils.convertRawHabit(action.rawHabit, _user.get('user'));
  _user = _user.setIn(['habits', action.rawHabit.key], converted);
};

const actions = {
  [ActionTypes.RECEIVE_AUTH]: receiveAuth,
  [ActionTypes.RECEIVE_LOGGED_OUT]: receiveLoggedOut,
  [ActionTypes.RECEIVE_USER_META]: receiveUserMeta,
  [ActionTypes.RECEIVE_ADDED_HABIT]: receiveAddedHabit,
  [ActionTypes.RECEIVE_CHANGED_HABIT]: receiveAddedHabit
};

module.exports = assign(new Store(actions), {
  initialize() {
  },

  get() {
    return _user;
  }
});
