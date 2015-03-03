/**
 * @flow
 */

const React = require('react/addons');
const { RouteHandler, Navigation, State } = require('react-router');
const isEmpty = require('lodash/lang/isEmpty');
const reduce = require('lodash/collection/reduce');

const AppHandlerViewActionCreators = require('./AppHandlerViewActionCreators');
const UserStore = require('../User/UserStore');
const StoresMixin = require('../StoresMixin');
const Inside = require('../Inside/Inside');
const Outside = require('../Outside/Outside');

require('normalize-css/normalize.css');
require('./AppHandler.less');

const AppHandler = React.createClass({
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
    State
  ],

  getStateFromStores(): Object {
    return {
      user: UserStore.get()
    };
  },

  componentDidMount() {
    const params = this.getParams();
    const pathname = this.getPathname();
    const insidePaths = [
      'habits',
      'new'
    ];

    const isInside = reduce(
      insidePaths,
      (inside, path) => inside || pathname.indexOf(path) > -1,
      false
    );

    if (!isInside && isEmpty(params) && this.state.user.get('auth')) {
      this.replaceWith('habits');
    } else if ((isInside || !isEmpty(params)) && !this.state.user.get('auth')) {
      this.replaceWith('front');
    }
  },

  componentDidUpdate(prevProps: any, prevState: any) {
    if (!prevState.user.get('auth') && this.state.user.get('auth')) {
      this.replaceWith('habits');
    } else if (prevState.user.get('auth') && !this.state.user.get('auth')) {
      this.replaceWith('front');
    }
  },

  render(): any {
    const insideHandler = this.state.user.get('user') ?
      <RouteHandler user={this.state.user} key="inside" /> : null;

    const content = this.state.user.get('auth') ?
      <Inside user={this.state.user}>
        {insideHandler}
      </Inside> :
      <Outside user={this.state.user}>
        <RouteHandler key="outside" />
      </Outside>;

    return (
      <div className="app-handler">
        {content}
      </div>
    );
  }
});

module.exports = AppHandler;
