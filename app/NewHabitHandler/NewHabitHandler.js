/**
 * @flow
 */

const React = require('react/addons');
const Immutable = require('immutable');
const { Navigation } = require('react-router');
const compose = require('lodash/function/compose');

const ConnectToStores = require('../ConnectToStores');
const PureRender = require('../PureRender');
const HabitsStore = require('../Habits/HabitsStore');
const HabitsViewActionCreators = require('../Habits/HabitsViewActionCreators');

const { PropTypes } = React;

const stores = [HabitsStore];

const getStateFromStores = () => ({
  habits: HabitsStore.get()
});

const NewHabitHandler = React.createClass({
  propTypes: {
    user: PropTypes.instanceOf(Immutable.Map).isRequired,
    data: PropTypes.shape({
      habits: PropTypes.instanceOf(Immutable.Map).isRequired
    }).isRequired
  },

  mixins: [Navigation],

  handleChangeNewHabit(e: Object) {
    HabitsViewActionCreators.changeNewHabit(e.target.value);
  },

  handleKeyDownNewHabit(e: Object) {
    if (e.keyCode === 13 && (e.metaKey || e.ctrlKey)) {
      HabitsViewActionCreators.submitNewHabit(
        this.props.user.get('user'),
        this.props.data.habits.get('newHabit')
      );

      this.transitionTo('habits');
    }
  },

  render(): any {
    return (
      <div>
        <input value={this.props.data.habits.get('newHabit')}
          onChange={this.handleChangeNewHabit}
          onKeyDown={this.handleKeyDownNewHabit}
        />
      </div>
    );
  }
});

module.exports = compose(
  ConnectToStores(stores, getStateFromStores),
  PureRender
)(NewHabitHandler);
