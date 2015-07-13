/* @flow */

import type { RawHabitsItem } from './HabitsTypes';
import type { User } from '../User/UserTypes';

import Immutable from 'immutable';

import * as HabitsUtils from './HabitsUtils';
import ActionTypes from '../ActionTypes';
import * as firebaseUtils from 'shared/firebaseUtils';
import * as dateUtils from 'shared/dateUtils';
import { Action } from 'shared/sharedTypes';

export function mountHabits(
  user: User,
  callback: (child: {key: string; value: RawHabitsItem}) => Action
): () => void {
  return () => {
    firebaseUtils.listenTo('child_added')(`${user.dataUrl}/habits`, callback);
  };
}

export function unmountHabits(user: User): Action {
  firebaseUtils.stopListeningTo('child_added')(`${user.dataUrl}/habits`);
  return {
    type: ActionTypes.UPDATE_HABITS_CONTAINER,
    description: 'Unmounted habits',
    update: container => container.merge({
      habits: [],
      newHabitName: ''
    })
  };
}

export function receiveHabitsChildAdded(child: {key: string; value: RawHabitsItem}): Action {
  return {
    type: ActionTypes.UPDATE_HABITS_CONTAINER,
    description: 'Received habits child added',
    update: container => container.update(
      'habits',
      habits => habits.push(
        Immutable.fromJS(
          HabitsUtils.convertRawHabitsItem(child.value, child.key))))
  };
}

export function changeNewHabitName(name: string): Action {
  return {
    type: ActionTypes.UPDATE_HABITS_CONTAINER,
    description: 'Changed new habit name',
    update: container => container.set('newHabitName', name)
  };
}

export function submitNewHabit(user: User, name: string): (x: Function) => void {
  return dispatch => {
    var key = firebaseUtils.push(`${user.dataUrl}/habits`, HabitsUtils.buildNewHabitsItem(name));
    firebaseUtils.set(`${user.dataUrl}/data/${key}`, {start: dateUtils.getTodayString()}).then(() => {
      dispatch({
        type: ActionTypes.UPDATE_HABITS_CONTAINER,
        description: 'Submitted new habit',
        update: container => container.set('newHabitName', '')
      });
    });
  };
}
