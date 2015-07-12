/* @flow */

import type { RawHabit, Habit } from './HabitsTypes';

export function convertRawHabit(raw: RawHabit, key: string): Habit {
  return {
    name: raw.name,
    streak: raw.streak,
    last: raw.last,
    best: raw.best,
    id: key
  };
}

export function buildNewHabit(name: string): RawHabit {
  return {
    name,
    streak: 0,
    last: '',
    best: {
      last: '',
      streak: 0
    }
  };
}
