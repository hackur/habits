/* @flow */

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
