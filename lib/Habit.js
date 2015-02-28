declare class RawHabit {
  key: string;
  value: {
    name: string;
    last: ?string;
    streak: number;
  }
}

declare class Habit {
  key: string;
  name: string;
  streak: number;
  last: ?string;
  habitsDataUrl: string;
  dataDataUrl: string;
}
