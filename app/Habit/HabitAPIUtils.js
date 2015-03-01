/**
 * @flow
 */

'use strict';

var HabitUtils = require('./HabitUtils');
var firebaseUtils = require('../shared/firebaseUtils');
var dateUtils = require('../shared/dateUtils');

function completeHabit(habit: Habit) {
  var data = HabitUtils.getCompleteHabitData(habit);
  var currentDayKey = dateUtils.getCurrentDayKey();
  firebaseUtils.update(habit.habitsDataUrl, data).then(() => firebaseUtils.set(
    habit.dataDataUrl + '/days/' + currentDayKey, {ts: new Date().getTime()}
  ));
}

module.exports = {
  completeHabit
};
