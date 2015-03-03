/**
 * @flow
 */

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { PropTypes } = React;
var StoresMixin = require('../StoresMixin');

var Habit = require('../Habit/Habit');
var HabitStore = require('../Habit/HabitStore');

var HabitHandler = React.createClass({
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
