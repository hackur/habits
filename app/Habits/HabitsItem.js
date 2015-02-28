/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { PropTypes } = React;

var HabitsItem = React.createClass({
  propTypes: {
    habit: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  handleComplete(e: Object) {
    e.preventDefault();
  },

  handleGoTo(e: Object) {
    e.preventDefault();
  },

  render(): any {
    return (
      <div>
        {this.props.habit.get('name')}
        <div>
          <a href="#" onClick={this.handleComplete}>Complete</a>
          <a href="#" onClick={this.handleGoTo}>More</a>
        </div>
      </div>
    );
  }
});

module.exports = HabitsItem;
