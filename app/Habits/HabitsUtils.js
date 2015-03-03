/**
 * @flow
 */

function getNewHabitData(newHabit: string): Object {
  return {
    name: newHabit,
    streak: 0,
    last: null
  };
}

module.exports = {
  getNewHabitData
};
