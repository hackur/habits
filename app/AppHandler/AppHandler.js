/**
 * @flow
 */

const React = require('react/addons');
const Immutable = require('immutable');
const { RouteHandler } = require('react-router');
const isEmpty = require('lodash/lang/isEmpty');
const reduce = require('lodash/collection/reduce');
const compose = require('lodash/function/compose');

const AppHandlerViewActionCreators = require('./AppHandlerViewActionCreators');
const ConnectToStores = require('../ConnectToStores');
const AddStatics = require('../AddStatics');
const UserStore = require('../User/UserStore');
const Inside = require('../Inside/Inside');
const Outside = require('../Outside/Outside');

require('normalize-css/normalize.css');
require('./AppHandler.less');

const { PropTypes } = React;

const stores = [UserStore];

const getStateFromStores = () => ({
      user: UserStore.get()
});

const statics = {
    willTransitionTo(transition, params, query, callback) {
      UserStore.initialize();
      AppHandlerViewActionCreators.loadApp();
      callback();
    }
};

const AppHandler = React.createClass({
  propTypes: {
    data: PropTypes.shape({
      user: PropTypes.instanceOf(Immutable.Map)
    })
  },

  contextTypes: {
    router: PropTypes.func.isRequired
  },

  componentDidMount() {
    const params = this.context.router.getCurrentParams();
    const pathname = this.context.router.getCurrentPathname();
    const insidePaths = [
      'habits',
      'new'
    ];

    const isInside = reduce(
      insidePaths,
      (inside, path) => inside || pathname.indexOf(path) > -1,
      false
    );

    if (!isInside && isEmpty(params) && this.props.data.user.get('auth')) {
      this.context.router.replaceWith('habits');
    } else if ((isInside || !isEmpty(params)) && !this.props.data.user.get('auth')) {
      this.context.router.replaceWith('front');
    }
  },

  componentDidUpdate(prevProps: any) {
    if (!prevProps.data.user.get('auth') && this.props.data.user.get('auth')) {
      this.context.router.replaceWith('habits');
    } else if (prevProps.data.user.get('auth') && !this.props.data.user.get('auth')) {
      this.context.router.replaceWith('front');
    }
  },

  render(): any {
    const insideHandler = this.props.data.user.get('user') ?
      <RouteHandler user={this.props.data.user} key="inside" /> : null;

    const content = this.props.data.user.get('auth') ?
      <Inside user={this.props.data.user}>
        {insideHandler}
      </Inside> :
      <Outside user={this.props.data.user}>
        <RouteHandler key="outside" />
      </Outside>;

    return (
      <div className="app-handler">
        {content}
      </div>
    );
  }
});

module.exports = compose(
  AddStatics(statics),
  ConnectToStores(stores, getStateFromStores)
)(AppHandler);
