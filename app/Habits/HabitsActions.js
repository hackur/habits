/* @flow */

import type { RawHabit } from './HabitsTypes';
import type { User } from '../User/UserTypes';

import Immutable from 'immutable';

import * as HabitsUtils from './HabitsUtils';
import ActionTypes from '../ActionTypes';
import * as firebaseUtils from 'shared/firebaseUtils';
import { Action } from 'shared/sharedTypes';

export function listenToHabitsChildAdded(user: User, callback: Function): () => void {
  return () => {
    firebaseUtils.listenTo('child_added')(`${user.dataUrl}/habits`, callback);
  };
}

export function stopListeningToHabitsChildAdded(user: User): () => void {
  return () => {
    firebaseUtils.stopListeningTo('child_added')(`${user.dataUrl}/habits`);
  };
}

export function receiveHabitsChildAdded(child: {key: string; value: RawHabit}): Action {
  return {
    type: ActionTypes.UPDATE_HABITS,
    description: 'Receive habits child added',
    update: habits => habits.push(
      Immutable.fromJS(
        HabitsUtils.convertRawHabit(child.value, child.key)))
  };
}
