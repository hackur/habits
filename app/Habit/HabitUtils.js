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

/*:: type CheckLastIsPreviousDay = (last: ?string) => boolean */
const checkLastIsPreviousDay: CheckLastIsPreviousDay = last => {
  if (!last) {
    return false;
  }

  var dayAfterLastDay = parseDayKey(last).add(1, 'd');
  return compose(isSameDay(dayAfterLastDay), getCurrentMoment)();
};

/*:: type CheckLastIsToday = (last: ?string) => boolean */
const checkLastIsToday: CheckLastIsToday = last =>
  last ? compose(isSameDay(parseDayKey(last)), getCurrentMoment)() : false;

/*:: type IsOnStreak = (last: ?string) => boolean */
const isOnStreak: IsOnStreak = last =>
  last ? checkLastIsPreviousDay(last) || checkLastIsToday(last) : false;

/*:: type ConvertRawHabit = (rawHabit: RawHabit, user: Immutable.Map) => Immutable.Map; */
const convertRawHabit: ConvertRawHabit = (rawHabit, user) => {
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

/*:: type GetStreak = (habit: Habit) => number */
const getStreak: GetStreak = habit =>
  habit.last && checkLastIsPreviousDay(habit.last) ? habit.streak + 1 : 1;

/*:: type HasNewBestStreak = (streak: number, habit: Habit) => boolean */
const hasNewBestStreak: HasNewBestStreak = (streak, habit) =>
  !habit.last || !habit.bestStreak || streak >= habit.bestStreak;

/**
 * Data for when user completes a habit for the current day.
 */
/*:: type GetCompleteHabitData = (habit: Habit) => Object */
const getCompleteHabitData: GetCompleteHabitData = (habit) => {
  const streak = getStreak(habit);

  const completeData: {
    last: string;
    streak: number;
    best?: Object;
  } = {
    last: getCurrentDayKey(),
    streak
  };

  if (hasNewBestStreak(streak, habit)) {
    completeData.best = {
      streak,
      last: getCurrentDayKey()
    };
  }

  return completeData;
};

module.exports = {
  convertRawHabit,
  getCompleteHabitData
};
