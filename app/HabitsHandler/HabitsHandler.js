/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { PropTypes } = React;

var Habits = require('../Habits/Habits');
var HabitsStore = require('../Habits/HabitsStore');
var StoresMixin = require('../StoresMixin');

var HabitsHandler = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  mixins: [StoresMixin, PureRenderMixin],

  stores: [HabitsStore],

  getStateFromStores()/*: Object*/ {
    return {
      habits: HabitsStore.get()
    };
  },

  render()/*: any*/ {
    return (
      <div>
        <Habits habits={this.state.habits}
          user={this.props.user}
        />
      </div>
    );
  }
});

module.exports = HabitsHandler;
