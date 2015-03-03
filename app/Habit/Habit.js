/**
 * @flow
 */

const React = require('react/addons');
const { PureRenderMixin } = React.addons;
const { PropTypes } = React;

const Habit = React.createClass({
  propTypes: {
    habit: PropTypes.object.isRequired
  },

  mixins: [PureRenderMixin],

  render(): any {
    return (
      <div>
        Habit!
      </div>
    );
  }
});

module.exports = Habit;
