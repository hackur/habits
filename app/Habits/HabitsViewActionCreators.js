/**
 * @flow
 */

'use strict';

var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../ActionTypes');

var HabitsAPIUtils = require('./HabitsAPIUtils');

function changeNewHabit(newHabit/*: string*/) {
  Dispatcher.handleAction({
    type: ActionTypes.CHANGE_NEW_HABIT,
    newHabit
  });
}

function submitNewHabit(user/*: Object*/, newHabit/*: string*/) {
  HabitsAPIUtils.createHabit(user.toJS(), newHabit);

  Dispatcher.handleAction({
    type: ActionTypes.SUBMIT_NEW_HABIT
  });
}

module.exports = {
  changeNewHabit,
  submitNewHabit
};
