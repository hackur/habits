/* @flow */

export type RawHabitListItem = {
  name: string,
  streak: ?number,
  last: ?string,
  bestStreak: ?number,
  bestStreakLast: ?string
}

export type HabitListItem = {
  key: string,
  name: string,
  streak: ?number,
  last: ?string,
  bestStreak: ?number,
  bestStreakLast: ?string
}

export type HabitListItems = {[key: string]: HabitListItem}
