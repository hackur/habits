/**
 * @flow
 */

const HabitAPIUtils = require('./HabitAPIUtils');

const completeHabit = (habit: Object) => {
  HabitAPIUtils.completeHabit(habit.toJS());
};

/**
 * Listen to value of specific habit
 */
const loadHabit = (habit: Object) => {
  HabitAPIUtils.listenToHabit(habit.toJS());
};

const unloadHabit = (habit: Object) => {
  HabitAPIUtils.stopListeningToHabit(habit.toJS());
};

module.exports = {
  completeHabit,
  loadHabit,
  unloadHabit
};
