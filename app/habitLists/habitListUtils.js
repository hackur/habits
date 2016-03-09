/* @flow */

import type {
  RawHabitListItem,
  HabitListItem,
  HabitListItems
} from './habitListTypes'

function convertRawHabitListItem(raw: RawHabitListItem, key: string): HabitListItem {
  return {
    ...raw,
    key
  }
}

export function convertRawHabitListItems(raw: {[key: string]: RawHabitListItem}): HabitListItems {
  return Object.keys(raw).reduce((acc, key) => {
    acc[key] = convertRawHabitListItem(raw[key], key)
    return acc
  }, {})
}

export function buildNewHabitListItem(name: string): RawHabitListItem {
  return {
    name,
    streak: null,
    last: null,
    bestStreak: null,
    bestStreakLast: null
  }
}
