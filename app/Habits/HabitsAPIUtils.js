/**
 * @flow
 */

'use strict';

var firebaseUtils = require('../shared/firebaseUtils');
var dateUtils = require('../shared/dateUtils');

function createHabit(user/*: User*/, newHabit/*: string*/) {
  var key = firebaseUtils.push(user.dataUrl + '/habits', {
    name: newHabit,
    streak: 0
  });

  return firebaseUtils.set(user.dataUrl + '/data/' + key, {
    start: dateUtils.getCurrentDayKey()
  });
}

module.exports = {
  createHabit
};
