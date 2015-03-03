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

function checkLastIsToday(last: ?string): boolean {
  if (!last) {
    return false;
  }

  return compose(isSameDay(parseDayKey(last)), getCurrentMoment)();
}

function isOnStreak(last: ?string): boolean {
  if (!last) {
    return false;
  }

  return checkLastIsPreviousDay(last) || checkLastIsToday(last);
}

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

function getStreak(habit: Habit): number {
  if (!habit.last) {
    return 1;
  }

  return checkLastIsPreviousDay(habit.last) ? habit.streak + 1 : 1;
}

function hasNewBestStreak(streak: number, habit: Habit): boolean {
  if (!habit.last || !habit.bestStreak) {
    return true;
  }

  return streak >= habit.bestStreak;
}

/**
 * Data for when user completes a habit for the current day.
 */
function getCompleteHabitData(habit: Habit): Object {
  var streak = getStreak(habit);

  var completeData: {
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
}

module.exports = {
  convertRawHabit,
  getCompleteHabitData
};
