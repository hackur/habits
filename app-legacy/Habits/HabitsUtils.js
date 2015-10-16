/* @flow */

import type { RawHabitsItem, HabitsItem } from './HabitsTypes';

export function convertRawHabitsItem(raw: RawHabitsItem, key: string): HabitsItem {
  return {
    name: raw.name,
    streak: raw.streak,
    last: raw.last,
    best: raw.best,
    id: key
  };
}

export function buildNewHabitsItem(name: string): RawHabitsItem {
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
