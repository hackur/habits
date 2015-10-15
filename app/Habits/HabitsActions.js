/* @flow */

import type { RawHabitsItem } from './HabitsTypes';
import type { User } from '../User/UserTypes';

import Immutable from 'immutable';

import * as HabitsUtils from './HabitsUtils';
import ActionTypes from '../ActionTypes';
import * as firebaseUtils from 'shared/firebaseUtils';
import * as dateUtils from 'shared/dateUtils';
import { Action } from 'shared/sharedTypes';

/**
 * How to get initial data to know if empty or not:
 * http://stackoverflow.com/a/27995609/4278451
 *
 * Example implementation

function receiveChildAdded() {
  return {
    type: 'update_containers',
    payload: {
      update: state => state.set('isLoading', false),
      entities
    },
    ...
  }
}

function receiveInitialLoad() {
  return {
    type: 'update_containers',
    payload: {
      update: state => state.set('isLoading', false),
      entities
    },
    ...
  }
}

function mountHabitsV2(user: User): (x: Function) => void {
  let isLoaded = false;
  return dispatch => {
    firebaseUtils.listenTo('child_added')(`${user.dataUrl}/habits`, child => {
      if (!isLoaded) { return; }
      dispatch(receiveChildAdded(child))
    });

    firebaseUtils.once(`${user.dataUrl}/habits`).then(children => {
      dispatch(receiveInitialLoad(children));
    });
  };
}

 */

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
    dispatch({
      type: ActionTypes.UPDATE_HABITS_CONTAINER,
      description: 'Submitted new habit',
      update: container => container.set('newHabitName', '')
    });

    var key = firebaseUtils.push(
      `${user.dataUrl}/habits`,
      HabitsUtils.buildNewHabitsItem(name));

    firebaseUtils.set(
      `${user.dataUrl}/data/${key}`,
      {start: dateUtils.getTodayString()});
  };
}
