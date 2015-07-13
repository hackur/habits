/* @flow */

import React from 'react';
import { Link } from 'react-router';

import { habitsContainerPropTypes } from './HabitsTypes';
import * as HabitsActions from './HabitsActions';

import { userPropTypes } from '../User/UserTypes';

class Habits extends React.Component {
  render(): React.Element {
    var { dispatch, habitsContainer } = this.props;
    return <div>
      {habitsContainer.get('habits').map(h => (
        <div key={h.get('id')}>
          <Link to={`habits/${h.get('id')}`}>
            {h.get('name')}
          </Link>
        </div>
      ))}
      <input type="text"
        value={habitsContainer.get('newHabitName')}
        onChange={e => dispatch(HabitsActions.changeNewHabitName(e.target.value))} />
      <a href="#" onClick={e => {
        e.preventDefault();
        dispatch(
          HabitsActions.submitNewHabit(
            this.props.user.toJS(),
            habitsContainer.get('newHabitName')));
      }}>
        New habit
      </a>
    </div>;
  }
}

Habits.propTypes = {
  user: userPropTypes.isRequired,
  habitsContainer: habitsContainerPropTypes.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

export default Habits;
