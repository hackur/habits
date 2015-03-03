/**
 * @flow
 */

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { PropTypes } = React;

var HabitsItem = require('./HabitsItem');

var Habits = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  render(): any {
    var habits = this.props.user.get('habits').map(habit => (
      <HabitsItem key={habit.get('key')}
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
