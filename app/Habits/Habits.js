/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { PropTypes } = React;

var Habit = require('../Habit/Habit');

var Habits = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  render(): any {
    var habits = this.props.user.get('habits').map(habit => (
      <Habit key={habit.get('key')}
        habit={habit}
      />
    )).toArray();

    return (
      <div>
        {habits}
      </div>
    );
  }
});

module.exports = Habits;
