/* @flow */

import React from 'react';
import { connect } from 'redux/react';

import Habits from './Habits';
import * as HabitsActions from './HabitsActions';
import { habitsContainerPropTypes } from './HabitsTypes';

import { userPropTypes } from '../User/UserTypes';

class HabitsContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(
      HabitsActions.mountHabits(
        this.props.user.toJS(),
        (child) => this.props.dispatch(HabitsActions.receiveHabitsChildAdded(child))));
  }

  componentWillUnmount() {
    this.props.dispatch(HabitsActions.unmountHabits(this.props.user.toJS()));
  }

  render() {
    return <Habits user={this.props.user}
      habitsContainer={this.props.habitsContainer}
      dispatch={this.props.dispatch} />;
  }
}

HabitsContainer.propTypes = {
  user: userPropTypes.isRequired,
  habitsContainer: habitsContainerPropTypes.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

export default connect(state => ({
  user: state.app.get('user'),
  habitsContainer: state.app.get('habitsContainer')
}))(HabitsContainer);
