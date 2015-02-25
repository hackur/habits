/**
 * @flow
 */

'use strict';

function convertRawHabit(rawHabit/*: RawHabit*/)/*: Habit*/ {
  return {
    key: rawHabit.key,
    name: rawHabit.value.name,
    streak: rawHabit.value.streak
  };
}

module.exports = {
  convertRawHabit
};
