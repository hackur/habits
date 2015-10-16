/* @flow */

import React from 'react';
import { Link } from 'react-router';

class Habit extends React.Component {
  render(): React.Element {
    return <div>
      Habit!

      <div>
        <Link to="/habits">
          Back
        </Link>
      </div>
    </div>;
  }
}

Habit.propTypes = {

};

export default Habit;
