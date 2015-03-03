/**
 * @flow
 */

const React = require('react/addons');
const FrontHandlerViewActionCreators = require('./FrontHandlerViewActionCreators');

require('./FrontHandler.less');

const FrontHandler = React.createClass({
  handleClickFacebookRegister(e: Object) {
    e.preventDefault();
    FrontHandlerViewActionCreators.authorizeWithFacebook();
  },

  handleClickTwitterRegister(e: Object) {
    e.preventDefault();
    FrontHandlerViewActionCreators.authorizeWithTwitter();
  },

  render(): any {
    return (
      <div className="front-handler">
        <p className="front-handler__intro">
          Think of what you want to do every day. Now do them every day.
        </p>
        <div className="front-handler__auth-title">
          Log in / Create an account
        </div>
        <div className="front-handler__providers">
          <a href="#"
            onClick={this.handleClickFacebookRegister}
            className="front-handler__provider">
            {' '}
            Facebook
          </a>
          <a href="#" onClick={this.handleClickTwitterRegister}
            className="front-handler__provider">
            {' '}
            Twitter
          </a>
        </div>
      </div>
    );
  }
});

module.exports = FrontHandler;
