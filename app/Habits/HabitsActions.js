/* @flow */

import type { RawHabit } from './HabitsTypes';
import type { User } from '../User/UserTypes';

import Immutable from 'immutable';

import * as HabitsUtils from './HabitsUtils';
import ActionTypes from '../ActionTypes';
import * as firebaseUtils from 'shared/firebaseUtils';
import { Action } from 'shared/sharedTypes';

export function mountHabits(user: User, callback: Function): () => void {
  return () => {
    firebaseUtils.listenTo('child_added')(`${user.dataUrl}/habits`, callback);
  };
}

export function unmountHabits(user: User): Action {
  firebaseUtils.stopListeningTo('child_added')(`${user.dataUrl}/habits`);
  return {
    type: ActionTypes.UPDATE_HABITS_CONTAINER,
    description: 'Unmount habits',
    update: container => container.merge({
      habits: [],
      newHabitName: ''
    })
  };
}

export function receiveHabitsChildAdded(child: {key: string; value: RawHabit}): Action {
  return {
    type: ActionTypes.UPDATE_HABITS_CONTAINER,
    description: 'Receive habits child added',
    update: container => container.update(
      'habits',
      habits => habits.push(
        Immutable.fromJS(
          HabitsUtils.convertRawHabit(child.value, child.key))))
  };
}

export function changeNewHabitName(name: string): Action {
  return {
    type: ActionTypes.UPDATE_HABITS_CONTAINER,
    description: 'Change new habit name',
    update: container => container.set('newHabitName', name)
  };
}

export function submitNewHabit(user: User, name: string): Action {
  firebaseUtils.push(`${user.dataUrl}/habits`, HabitsUtils.buildNewHabit(name));
  return {
    type: ActionTypes.UPDATE_HABITS_CONTAINER,
    description: 'Submit new habit -- clear input',
    update: container => container.set('newHabitName', '')
  };
}
