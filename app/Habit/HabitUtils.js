/**
 * @flow
 */

'use strict';

var Immutable = require('immutable');

function convertRawHabit(rawHabit: RawHabit, user: Immutable.Map): Immutable.Map {
  var habitsDataUrl = user.get('dataUrl') + '/habits/' + rawHabit.key;
  var dataDataUrl = user.get('dataUrl') + '/data/' + rawHabit.key;

  return Immutable.Map({
    key: rawHabit.key,
    name: rawHabit.value.name,
    streak: rawHabit.value.streak,
    habitsDataUrl,
    dataDataUrl
  });
}

module.exports = {
  convertRawHabit
};
