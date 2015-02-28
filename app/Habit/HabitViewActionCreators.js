/**
 * @flow
 */

'use strict';

var HabitAPIUtils = require('./HabitAPIUtils');

function completeHabit(habit: Object) {
  HabitAPIUtils.completeHabit(habit.toJS());
}

module.exports = {
  completeHabit
};
