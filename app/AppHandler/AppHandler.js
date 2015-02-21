/**
 * @flow
 */

'use strict';

var React = require('react/addons');
var { PureRenderMixin } = React.addons;
var { RouteHandler, Navigation, State } = require('react-router');

var AppHandlerViewActionCreators = require('./AppHandlerViewActionCreators');
var UserStore = require('../User/UserStore');
var StoresMixin = require('../StoresMixin');
var Inside = require('../Inside/Inside');
var Outside = require('../Outside/Outside');

require('normalize-css/normalize.css');
require('./AppHandler.less');

var AppHandler = React.createClass({
  statics: {
    willTransitionTo(transition, params, query, callback) {
      UserStore.initialize();
      AppHandlerViewActionCreators.loadApp();
      callback();
    }
  },

  stores: [UserStore],

  mixins: [
    StoresMixin,
    Navigation,
    State,
    PureRenderMixin
  ],

  getStateFromStores(): Object {
    return {
      user: UserStore.get()
    };
  },

  render(): any {
    var insideHandler = this.state.user.get('user') ?
      <RouteHandler user={this.state.user} key='inside' /> : null;

    var content = this.state.user.get('auth') ?
      <Inside user={this.state.user}>
        {insideHandler}
      </Inside> :
      <Outside user={this.state.user}>
        <RouteHandler key='outside' />
      </Outside>;

    return (
      <div className="app-handler">
        {content}
      </div>
    );
  }
});

module.exports = AppHandler;
