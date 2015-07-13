/* @flow */

import styles from './HabitsItem.less';

import React from 'react';
import { Link } from 'react-router';

import { habitsItemPropTypes } from './HabitsTypes';

class HabitsItem extends React.Component {
  render(): React.Element {
    var { habit } = this.props;
    return <div className={styles.item}>
      <Link to={`habits/${habit.get('id')}`}>
        {habit.get('name')}
      </Link>
      <div>
        Streak: {habit.get('streak')}
      </div>
      <div>
        <a href="#" onClick={e => {
          e.preventDefault();
        }}>
          DONE
        </a>
      </div>
    </div>;
  }
}

HabitsItem.propTypes = {
  habit: habitsItemPropTypes.isRequired
};

export default HabitsItem;
