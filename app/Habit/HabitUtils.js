/**
 * @flow
 */

'use strict';

var Immutable = require('immutable');

function convertRawHabit(rawHabit/*: RawHabit*/)/*: Habit*/ {
  return Immutable.Map({
    key: rawHabit.key,
    name: rawHabit.value.name,
    streak: rawHabit.value.streak
  });
}

module.exports = {
  convertRawHabit
};
