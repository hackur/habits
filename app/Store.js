/**
 * @flow
 */

var uniqueId = require('lodash/utility/uniqueId');
var Dispatcher = require('./Dispatcher');
var { EventEmitter } = require('events');

class Store extends EventEmitter {
  constructor(dispatchTypes: {[key:string]: Function}) {
    this.setMaxListeners(0);
    this.changeEvent = uniqueId('store_');
    this.dispatchToken = Dispatcher.register(payload => {
      const action = payload.action;
      if (dispatchTypes[action.type]) {
        const emitChange = dispatchTypes[action.type](action);
        if (emitChange !== false) {
          this.emitChange();
        }
      }
    });
  }

  emitChange() {
    this.emit(this.changeEvent);
  }

  addChangeListener(callback: Function) {
    this.on(this.changeEvent, callback);
  }

  removeChangeListener(callback: Function) {
    this.removeListener(this.changeEvent, callback);
  }
}

module.exports = Store;
