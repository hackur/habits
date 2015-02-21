'use strict';

module.exports = {
  getInitialState() {
    if (this.getStateFromStores) {
      return this.getStateFromStores();
    }

    return {};
  },

  componentDidMount() {
    this.stores.forEach(function(store) {
      store.addChangeListener(this._onChange);
    }.bind(this));
  },

  componentWillUnmount() {
    this.stores.forEach(function(store) {
      store.removeChangeListener(this._onChange);
    }.bind(this));
  },

  _onChange() {
    if (this.getStateFromStores) {
      this.setState(this.getStateFromStores());
    }
  }
};

