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
  console.log('Action: ', action);
  switch (action.type) {
    case ActionTypes.UPDATE_USER:
      return state.update('user', action.update);

    default:
      return state;
  }
}
