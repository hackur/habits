/**
 * @flow
 */

const HabitsUtils = require('./HabitsUtils');
const firebaseUtils = require('../shared/firebaseUtils');
const dateUtils = require('../shared/dateUtils');

function createHabit(user: User, newHabit: string) {
  var key = firebaseUtils.push(
    user.dataUrl + '/habits',
    HabitsUtils.getNewHabitData(newHabit)
  );

  return firebaseUtils.set(user.dataUrl + '/data/' + key, {
    start: dateUtils.getCurrentDayKey()
  });
}

module.exports = {
  createHabit
};
