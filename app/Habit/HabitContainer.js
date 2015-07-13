/* @flow */

import React from 'react';
import { connect } from 'redux/react';

class HabitContainer extends React.Component {
  render() {
    return <div>
      Habit
    </div>;
  }
}

export default connect(state => ({
  user: state.app.get('user')
}))(HabitContainer);
