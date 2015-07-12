/* @flow */

import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

export type RawHabit = {
  name: string;
  streak: number;
  last: string;
  best: {
    last: string;
    streak: number;
  };
};

export type Habit = {
  name: string;
  streak: number;
  last: string;
  best: {
    last: string;
    streak: number;
  };
  id: string;
};

export var habitPropTypes = ImmutablePropTypes.shape({
  name: React.PropTypes.string.isRequired,
  streak: React.PropTypes.number.isRequired,
  last: React.PropTypes.string.isRequired,
  best: ImmutablePropTypes.shape({
    last: React.PropTypes.string.isRequired,
    streak: React.PropTypes.number.isRequired
  }).isRequired,
  id: React.PropTypes.string.isRequired
});

export var habitsContainerPropTypes = ImmutablePropTypes.shape({
  habits: ImmutablePropTypes.listOf(habitPropTypes),
  newHabitName: React.PropTypes.string.isRequired
});

