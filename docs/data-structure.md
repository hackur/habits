``` javascript
{
  "uid1": {
    "habits": {
      "pushedid1": {
        bestStreak: {
          streak: 35,
          last: "20150103"
        },
        streak: 32,
        last: "20150203",
        name: "Brush teeth"
      },

      "pushedid2": {
        streak: 0,
        last: "20150201",
        name: "Eat vegetables"
      },
      ...
    },

    "data": {
      "pushedid1": {
        days: {
          20150201: {
            ts: 135235235
          },
          20150202: {
            ts: 135235241
          },
          ...
        },
        start: "20150201"
      },
      ...
    },

    meta: {
      active: true,
      displayName: "Something"
    }

  },

  "uid2": {
    ...
  }
}
```
