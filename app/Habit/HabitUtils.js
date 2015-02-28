/**
 * @flow
 */

'use strict';

var Immutable = require('immutable');
var compose = require('lodash/function/compose');
var {
  getCurrentDayKey,
  parseDayKey,
  getCurrentMoment,
  isSameDay
} = require('../shared/dateUtils');

function checkLastIsPreviousDay(last: ?string): boolean {
  if (!last) {
    return false;
  }

  var dayAfterLastDay = parseDayKey(last).add(1, 'd');
  return compose(isSameDay(dayAfterLastDay), getCurrentMoment)();
}

function checkLastIsToday(last: ?string): boolean {
  if (!last) {
    return false;
  }

  return compose(isSameDay(parseDayKey(last)), getCurrentMoment)();
}

function isOnStreak(last: ?string): boolean {
  if (!last) {
    return 0;
  }

  return checkLastIsPreviousDay(last) || checkLastIsToday(last);
}

function convertRawHabit(rawHabit: RawHabit, user: Immutable.Map): Immutable.Map {
  var habitsDataUrl = user.get('dataUrl') + '/habits/' + rawHabit.key;
  var dataDataUrl = user.get('dataUrl') + '/data/' + rawHabit.key;

  var displayStreak = rawHabit.value.last && isOnStreak(rawHabit.value.last) ? rawHabit.value.streak : 0;
  var lastIsToday = checkLastIsToday(rawHabit.value.last);

  return Immutable.Map({
    key: rawHabit.key,
    name: rawHabit.value.name,
    streak: displayStreak,
    last: rawHabit.value.last,
    lastIsToday,
    habitsDataUrl,
    dataDataUrl
  });
}

function getStreak(habit: Habit): number {
  if (!habit.last) {
    return 1;
  }

  return checkLastIsPreviousDay(habit.last) ? habit.streak + 1 : 1;
}

/**
 * Data for when user completes a habit for the current day.
 */
function getCompleteHabitData(habit: Habit): Object {
  var streak = getStreak(habit);

  return {
    last: getCurrentDayKey(),
    streak
  };
}

module.exports = {
  convertRawHabit,
  getCompleteHabitData
};
