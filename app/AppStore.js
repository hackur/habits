/* @flow */

import Immutable from 'immutable';
import ActionTypes from './ActionTypes';

var initialState = Immutable.fromJS({
  user: {
    hasAuthStatus: false,
    isLoggedIn: false
  }
});

export default function(state = initialState, action: Object) {
  if (__DEV__) {
    console.log(
      'Action: ',
      action.description || 'No description: ',
      !action.description ? action : '');
  }

  switch (action.type) {
    case ActionTypes.UPDATE_USER:
      return state.update('user', action.update);

    default:
      return state;
  }
}
