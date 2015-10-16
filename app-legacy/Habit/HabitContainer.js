/* @flow */

import React from 'react';
import { connect } from 'redux/react';
import Habit from './Habit';

class HabitContainer extends React.Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return <Habit dispatch={this.props.dispatch} />;
  }
}

HabitContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  params: React.PropTypes.shape({
    habitId: React.PropTypes.string.isRequired
  }).isRequired
};

export default connect(state => ({
  user: state.app.get('user')
}))(HabitContainer);
