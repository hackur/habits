/**
 * @flow
 */

'use strict';

var Dispatcher = require('../Dispatcher');
var ActionTypes = require('../ActionTypes');

function changeNewHabit(newHabit/*: string*/) {
  Dispatcher.handleAction({
    type: ActionTypes.CHANGE_NEW_HABIT,
    newHabit
  });
}

module.exports = {
  changeNewHabit
};
