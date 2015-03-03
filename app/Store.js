/**
 * @flow
 */

var assign = require('lodash/object/assign');
var uniqueId = require('lodash/utility/uniqueId');
var Dispatcher = require('./Dispatcher');
var { EventEmitter } = require('events');

var Store = function(dispatchTypes: {[key:string]: Function}) {
  this.setMaxListeners(0);
  this.changeEvent = uniqueId('store_');
  this.dispatchToken = Dispatcher.register(function(payload) {
    var action = payload.action;
    if (dispatchTypes[action.type]) {
      var emitChange = dispatchTypes[action.type](action);
      if (emitChange !== false) {
        this.emitChange();
      }
    }
  }.bind(this));
};

assign(Store.prototype, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(this.changeEvent);
  },

  addChangeListener: function(callback) {
    this.on(this.changeEvent, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(this.changeEvent, callback);
  }
});

module.exports = Store;
