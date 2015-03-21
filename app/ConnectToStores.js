/**
 * @flow
 */

const React = require('react/addons');
const each = require('lodash/collection/each');

const { Component } = React;

/*::
type Stores = Array<Object>;
*/

const ConnectToStores: (
	x: Component,
	y: Stores,
	z: Function
) => Component = (ComposedComponent, stores, getStateFromStores) => {
	class Enhanced extends Component {
		constructor() {
			this.state = getStateFromStores();
			this._onChange = this._onChange.bind(this);
		}

		componentDidMount() {
			each(stores, store => store.addChangeListener(this._onChange));
		}

		componentWillUnmount() {
			each(stores, store => store.removeChangeListener(this._onChange));
		}

		_onChange() {
			this.setState(getStateFromStores());
		}

		render() {
			return <ComposedComponent {...this.props} data={this.state} />;
		}
	}

	return Enhanced;
};

module.exports = ConnectToStores;


