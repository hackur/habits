/**
 * @flow
 */

const React = require('react/addons');
const each = require('lodash/collection/each');
const curry = require('lodash/function/curry');

/*::
type Stores = Array<Object>;
*/

const ConnectToStores: (
	x: Stores,
	y: Function,
	z: React.Component
) => React.Component = (stores, getStateFromStores, ComposedComponent) => {
	const Enhanced = React.createClass({
		getInitialState() {
			return getStateFromStores();
		},

		componentDidMount() {
			each(stores, store => store.addChangeListener(this._onChange));
		},

		componentWillUnmount() {
			each(stores, store => store.removeChangeListener(this._onChange));
		},

		_onChange() {
			this.setState(getStateFromStores());
		},

		render() {
			return <ComposedComponent {...this.props} data={this.state} />;
		}
	});

	return Enhanced;
};

module.exports = curry(ConnectToStores);
