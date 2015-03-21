/**
 * @flow
 */

const React = require('react/addons');
const Immutable = require('immutable');
const compose = require('lodash/function/compose');

const ConnectToStores = require('../ConnectToStores');
const PureRender = require('../PureRender');

const Habit = require('../Habit/Habit');
const HabitStore = require('../Habit/HabitStore');

const { PropTypes } = React;

const stores = [HabitStore];

const getStateFromStores = () => ({
  habit: HabitStore.get()
});

const HabitHandler = React.createClass({
  propTypes: {
    user: PropTypes.instanceOf(Immutable.Map).isRequired,
    data: PropTypes.shape({
      habit: PropTypes.instanceOf(Immutable.Map).isRequired
    }).isRequired
  },

  render(): any {
    if (!this.props.user) { return null; }

    return (
      <div>
        <Habit habit={this.props.data.habit} />
      </div>
    );
  }
});

module.exports = compose(
  ConnectToStores(stores, getStateFromStores),
  PureRender
)(HabitHandler);
