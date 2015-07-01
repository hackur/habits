/* @flow */

import Immutable from 'immutable';
import ActionTypes from './ActionTypes';

var initialState = Immutable.Map({
  counter: 0
});

export default function(state = initialState, action: Object) {
  switch (action.type) {
    case ActionTypes.INCREMENT:
      return state.update('counter', x => x + 1);

    default:
      return state;
  }
}
