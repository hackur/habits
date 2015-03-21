/**
 * @flow
 */

const React = require('react/addons');
const { PureRenderMixin } = React.addons;

const PureRender: (x: React.Component) => React.Component = ComposedComponent => {
  const Enhanced = React.createClass({
    mixins: [PureRenderMixin],
    render() {
      return <ComposedComponent {...this.props} />;
    }
  });

  return Enhanced;
};

module.exports = PureRender;

