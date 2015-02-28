/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { PropTypes } = React;

var Habits = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  render(): any {
    var habits = this.props.user.get('habits').map(habit => (
      <div key={habit.key}>
        {habit.name}
      </div>
    )).toArray();

    return (
      <div>
        List of habits
        {habits}
      </div>
    );
  }
});

module.exports = Habits;
