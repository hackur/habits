/* @flow */

import Immutable from 'immutable';
import ActionTypes from './ActionTypes';

var initialState = Immutable.fromJS({
  user: {
    hasAuthStatus: false,
    auth: null
  },

  habitsContainer: {
    habits: [],
    newHabitName: ''
  },

  habit: {}
});

export default function(state = initialState, action: Object) {
  if (!action) {
    if (__DEV__) {
      console.log(
        'Action undefined. You need to return an object. ' +
        'Will not modify state.');
    }

    return state;
  }

  if (__DEV__) {
    console.log(
      'Action: ',
      action && action.description || 'No description: ',
      action && !action.description ? action : '');
  }

  switch (action.type) {
    case ActionTypes.UPDATE_USER:
      return state.update('user', action.update);

    case ActionTypes.UPDATE_HABITS_CONTAINER:
      return state.update('habitsContainer', action.update);

    case ActionTypes.UPDATE_HABIT:
      return state.update('habit', action.update);

    default:
      return state;
  }
}
