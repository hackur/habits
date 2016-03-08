If /users/$uid/private is true, don't allow access to any of the user's
pages. Otherwise check each habit's privacy setting to display in the
list + allow access to the specific habit page

When you change user private setting, show an option to change all of
the user's habits's private setting as well or keep as is.

@TODO Update the security rules to reflect the privacy settings

``` json
{
  "usernames": {
    "$username": "$uid"
  },
  "isPrivateUser": {
    "$username": true
  },
  "users": {
    "$uid": {
      "username": "$username",
      "displayName": "$displayName"
    }
  },
  "habits": {
    "$uid": {
      "$habitId": {
        "name": "Habit name",
        "last": "2016-02-01",
        "streak": 123,
        "bestStreak": 13,
        "bestStreakLast": "2016-01-01",
        "start": "2015-01-01"
      }
    }
  },
  "isPrivateHabit": {
    "$habitId": true
  },
  "habitData": {
    "$habitId": { 
      "2016-02-01": {
        "ts": 135235241,
        "note": "Some note for this day" // Not sure about this one yet
      },
      "2016-01-01": {
        "ts": 125234231
      }
    }
  }
}
``` 
