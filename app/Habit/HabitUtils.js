/**
 * @flow
 */

const Immutable = require('immutable');
const compose = require('lodash/function/compose');
const {
  getCurrentDayKey,
  parseDayKey,
  getCurrentMoment,
  isSameDay
} = require('../shared/dateUtils');

const checkLastIsPreviousDay: (last: ?string) => boolean = last => {
  if (!last) {
    return false;
  }

  var dayAfterLastDay = parseDayKey(last).add(1, 'd');
  return compose(isSameDay(dayAfterLastDay), getCurrentMoment)();
};

const checkLastIsToday: (last: ?string) => boolean = last =>
  last ? compose(isSameDay(parseDayKey(last)), getCurrentMoment)() : false;

const isOnStreak: (x: ?string) => boolean = last =>
  last ? checkLastIsPreviousDay(last) || checkLastIsToday(last) : false;

const convertRawHabit: (x: RawHabit, y: Immutable.Map) => Immutable.Map = (rawHabit, user) => {
  const habitsDataUrl = user.get('dataUrl') + '/habits/' + rawHabit.key;
  const dataDataUrl = user.get('dataUrl') + '/data/' + rawHabit.key;

  const displayStreak = rawHabit.value.last && isOnStreak(rawHabit.value.last) ? rawHabit.value.streak : 0;
  const lastIsToday = checkLastIsToday(rawHabit.value.last);

  return Immutable.Map({
    key: rawHabit.key,
    name: rawHabit.value.name,
    streak: displayStreak,
    last: rawHabit.value.last,
    bestStreak: rawHabit.value.best ? rawHabit.value.best.streak : null,
    bestStreakLast: rawHabit.value.best ? rawHabit.value.best.last : null,
    lastIsToday,
    habitsDataUrl,
    dataDataUrl
  });
};

const getStreak: (x: Habit) => number = habit =>
  habit.last && checkLastIsPreviousDay(habit.last) ? habit.streak + 1 : 1;

const hasNewBestStreak: (x: number, y: Habit) => boolean = (streak, habit) =>
  !habit.last || !habit.bestStreak || streak >= habit.bestStreak;

/**
 * Data for when user completes a habit for the current day.
 */
const getCompleteHabitData: (x: Habit) => Object = habit => {
  const streak = getStreak(habit);
  const best = hasNewBestStreak(streak, habit) ? {
    streak,
    last: getCurrentDayKey()
  } : null;

  return {
    last: getCurrentDayKey(),
    streak,
    best
  };
};

module.exports = {
  convertRawHabit,
  getCompleteHabitData
};
