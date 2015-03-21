/**
 * @flow
 */

const React = require('react/addons');
const Immutable = require('immutable');
const { Link } = require('react-router');
const compose = require('lodash/function/compose');

const Habits = require('../Habits/Habits');
const HabitsStore = require('../Habits/HabitsStore');
const PureRender = require('../PureRender');
const ConnectToStores = require('../ConnectToStores');

const { formatMoment, getCurrentMoment } = require('../shared/dateUtils');

const { PropTypes } = React;

const stores = [HabitsStore];

const getStateFromStores = () => ({
  habits: HabitsStore.get()
});

const HabitsHandler = React.createClass({
  propTypes: {
    user: PropTypes.instanceOf(Immutable.Map).isRequired,
    data: PropTypes.shape({
      habits: PropTypes.instanceOf(Immutable.Map).isRequired
    }).isRequired
  },

  render(): any {
    if (!this.props.user) { return null; }

    const todayDisplay = compose(formatMoment('ll'), getCurrentMoment)();

    return (
      <div>
        <div>
          {todayDisplay}
        </div>
        <Habits habits={this.props.data.habits}
          user={this.props.user}
        />
        <Link to="new">New habit</Link>
      </div>
    );
  }
});

module.exports = compose(
  ConnectToStores(stores, getStateFromStores),
  PureRender
)(HabitsHandler);
