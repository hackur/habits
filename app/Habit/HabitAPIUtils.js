/**
 * @flow
 */

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

/**
 * Listen to value of one spot and children of another
 */
function listenToHabit(habit: Habit) {

}

function stopListeningToHabit(habit: Habit) {

}

module.exports = {
  completeHabit,
  listenToHabit,
  stopListeningToHabit
};
