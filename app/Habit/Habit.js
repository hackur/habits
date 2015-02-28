/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { PropTypes } = React;

var Habit = React.createClass({
  propTypes: {
    habit: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  render(): any {
    return (
      <div>
        {this.props.habit.get('name')}
      </div>
    );
  }
});

module.exports = Habit;
