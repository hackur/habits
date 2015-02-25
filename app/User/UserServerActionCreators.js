/**
 * @flow
 */

'use strict';

var ActionTypes = require('../ActionTypes');
var Dispatcher = require('../Dispatcher');
var curry = require('lodash/function/curry');

function receiveUserMeta(meta: UserMeta) {
  Dispatcher.handleAction({
    type: ActionTypes.RECEIVE_USER_META,
    meta
  });
}

function receiveAuth(authData?: Auth) {
  Dispatcher.handleAction({
    type: ActionTypes.RECEIVE_AUTH,
    auth: authData || null
  });
}

function receiveLoggedOut() {
  Dispatcher.handleAction({
    type: ActionTypes.RECEIVE_LOGGED_OUT
  });
}

function receiveHabitDef(type: string, rawHabit: RawHabit) {
  Dispatcher.handleAction({
    type,
    rawHabit
  });
}

var receiveHabit = curry(receiveHabitDef);

module.exports = {
  receiveUserMeta,
  receiveAuth,
  receiveLoggedOut,
  receiveAddedHabit: receiveHabit(ActionTypes.RECEIVE_ADDED_HABIT),
  receiveRemovedHabit: receiveHabit(ActionTypes.RECEIVE_REMOVED_HABIT),
  receiveChangedHabit: receiveHabit(ActionTypes.RECEIVE_CHANGED_HABIT)
};
