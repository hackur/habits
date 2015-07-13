/* @flow */

import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

type RawHabitDataDay = {
  ts: number;
};

export type RawHabitData = {
  days: {[key: string]: RawHabitDataDay};
  start: string;
};

type HabitDataDay = {
  timestamp: number;
};

export type Habit = {
  name: string;
  streak: number;
  last: string;
  best: {
    last: string;
    streak: number;
  };
  days: HabitDataDay[];
  start: string;
};

export var habitPropTypes = ImmutablePropTypes.shape({
  name: React.PropTypes.string.isRequired,
  streak: React.PropTypes.number.isRequired,
  last: React.PropTypes.string.isRequired,
  best: React.PropTypes.shape({
    last: React.PropTypes.string.isRequired,
    streak: React.PropTypes.number.isRequired
  }),
  days: ImmutablePropTypes.listOf(ImmutablePropTypes.shape({
    timestamp: React.PropTypes.number.isRequired
  })),
  start: React.PropTypes.string.isRequired
});
