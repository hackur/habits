/**
 * @flow
 */

const HabitUtils = require('./HabitUtils');
const firebaseUtils = require('../shared/firebaseUtils');
const dateUtils = require('../shared/dateUtils');

const completeHabit = (habit: Habit) => {
  var data = HabitUtils.getCompleteHabitData(habit);
  var currentDayKey = dateUtils.getCurrentDayKey();
  firebaseUtils.update(habit.habitsDataUrl, data).then(() => firebaseUtils.set(
    habit.dataDataUrl + '/days/' + currentDayKey, {ts: new Date().getTime()}
  ));
};

/**
 * Listen to value of one spot and children of another
 */
const listenToHabit = (habit: Habit) => {

};

const stopListeningToHabit = (habit: Habit) => {

};

module.exports = {
  completeHabit,
  listenToHabit,
  stopListeningToHabit
};
