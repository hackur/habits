/**
 * @flow
 */

const React = require('react/addons');
const { Navigation } = require('react-router');

require('./Outside.less');

const OutsideHeader = require('./OutsideHeader');
const PureRender = require('../PureRender');

const { PropTypes } = React;

const Outside = React.createClass({
  propTypes: {
    user: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired
  },

  mixins: [Navigation],

  render(): any {
    return (
      <div className="outside">
        <OutsideHeader />
        {this.props.children}
      </div>
    );
  }
});

module.exports = PureRender(Outside);
