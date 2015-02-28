/**
 * @flow
 */

'use strict';

var Immutable = require('immutable');
var compose = require('lodash/function/compose');
var dateUtils = require('../shared/dateUtils');

function convertRawHabit(rawHabit: RawHabit, user: Immutable.Map): Immutable.Map {
  var habitsDataUrl = user.get('dataUrl') + '/habits/' + rawHabit.key;
  var dataDataUrl = user.get('dataUrl') + '/data/' + rawHabit.key;

  return Immutable.Map({
    key: rawHabit.key,
    name: rawHabit.value.name,
    streak: rawHabit.value.streak,
    habitsDataUrl,
    dataDataUrl
  });
}

function getStreak(habit: Habit): number {
  if (!habit.last) {
    return 1;
  }

  var { parseDayKey, getCurrentMoment, isSameDay } = dateUtils;
  var dayAfterLastDay = parseDayKey(habit.last).add(1, 'd');
  var isStreak = compose(isSameDay(dayAfterLastDay), getCurrentMoment);
  return isStreak() ? habit.streak + 1 : 1;
}

/**
 * Data for when user completes a habit for the current day.
 */
function getCompleteHabitData(habit: Habit): Object {
  var streak = getStreak(habit);

  return {
    last: dateUtils.getCurrentDayKey(),
    streak
  };
}

module.exports = {
  convertRawHabit,
  getCompleteHabitData
};
