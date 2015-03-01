declare class RawHabit {
  key: string;
  value: {
    name: string;
    last: ?string;
    streak: number;
    best: {
      streak: number;
      last: string;
    };
  }
}

declare class Habit {
  key: string;
  name: string;
  streak: number;
  last: ?string;
  lastIsToday: boolean;
  bestStreak: ?number;
  bestStreakLast: ?string;
  habitsDataUrl: string;
  dataDataUrl: string;
}

declare class RawHabitData {
  start: string;
  days: { [key:string]: { ts: number } };
}
