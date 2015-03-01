/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { PropTypes } = React;
var StoresMixin = require('../StoresMixin');

var Habit = require('../Habit/Habit');

var HabitHandler = React.createClass({
  propTypes: {
    user: PropTypes.object
  },

  mixins: [StoresMixin, PureRenderMixin],

  stores: [],

  render(): any {
    if (!this.props.user) { return null; }

    return (
      <div>
        <Habit />
      </div>
    );
  }
});

module.exports = HabitHandler;
