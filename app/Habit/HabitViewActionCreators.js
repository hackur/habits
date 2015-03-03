/**
 * @flow
 */

var HabitAPIUtils = require('./HabitAPIUtils');

function completeHabit(habit: Object) {
  HabitAPIUtils.completeHabit(habit.toJS());
}

/**
 * Listen to value of specific habit
 */
function loadHabit(habit: Object) {
  HabitAPIUtils.listenToHabit(habit.toJS());
}

function unloadHabit(habit: Object) {
  HabitAPIUtils.stopListeningToHabit(habit.toJS());
}

module.exports = {
  completeHabit,
  loadHabit,
  unloadHabit
};
