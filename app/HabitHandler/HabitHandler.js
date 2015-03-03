/**
 * @flow
 */

const React = require('react/addons');
const { PureRenderMixin } = React.addons;
const { PropTypes } = React;
const StoresMixin = require('../StoresMixin');

const Habit = require('../Habit/Habit');
const HabitStore = require('../Habit/HabitStore');

const HabitHandler = React.createClass({
  propTypes: {
    user: PropTypes.object
  },

  mixins: [StoresMixin, PureRenderMixin],

  stores: [HabitStore],

  getStateFromStores(): Object {
    return {
      habit: HabitStore.get()
    };
  },

  render(): any {
    if (!this.props.user) { return null; }

    return (
      <div>
        <Habit habit={this.state.habit} />
      </div>
    );
  }
});

module.exports = HabitHandler;
