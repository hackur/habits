``` json
{
  "usernames": {
    "$username": "$uid"
  },
  "users": {
    "$uid": {
      "username": "$username",
      "displayName": "$displayName"
    }
  },
  "habits": {
    "$uid": {
      "$pushedHabitId": {
        "name": "Habit name",
        "last": "2016-02-01",
        "streak": 123,
        "bestStreak": 13,
        "bestStreakLast": "2016-01-01"
      }
    }
  },
  "habitData": {
    "$pushedHabitId": {
      "uid": "$uid",
      "days": {
        "2016-02-01": {
          "ts": 135235241
        }
      },
      "start": "2016-02-01"
    }
  }
}
``` 
