/**
 * @flow
 */

const { Dispatcher } = require('flux');

class AppDispatcher extends Dispatcher {
  handleAction(action) {
    this.dispatch({action});
  }
}

module.exports = new AppDispatcher();
