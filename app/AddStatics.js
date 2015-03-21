/**
 * @flow
 */

const React = require('react/addons');
const curry = require('lodash/function/curry');

const AddStatics: (
  x: Object,
  y: React.Component
) => React.Component = (statics, ComposedComponent) => {
  const Enhanced = React.createClass({
    statics,
    render() {
      return <ComposedComponent {...this.props} />;
    }
  });

  return Enhanced;
};

module.exports = curry(AddStatics);

