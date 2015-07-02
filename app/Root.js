/* @flow */

// import styles from './Root.less';

import React from 'react';
import { createRedux, bindActionCreators } from 'redux';
import { Provider, Connector } from 'redux/react';
import { Router, Route } from 'react-router';

import AppContainer from './App/AppContainer';
import AppStore from './AppStore';
import * as UserActions from './User/UserActions';
import { userPropTypes } from './User/UserTypes';

// class ApplicationContainer extends React.Component {
//   render() {
//     return <Connector select={state => ({user: state.app.get('user')})}>
//       {({ user, dispatch }) =>
//         <Application user={user}
//           {...bindActionCreators(UserActions, dispatch)}>
//           {this.props.children}
//         </Application>
//       }
//     </Connector>;
//   }
// }

// var Application = React.createClass({
//   mixins: [Navigation],

//   componentDidMount() {
//     this.props.loadApp(
//       this.props.receiveLoggedIn,
//       this.props.receiveLoggedOut);
//   },

//   componentDidUpdate(prevProps) {
//     if (!prevProps.user.get('isLoggedIn') && this.props.user.get('isLoggedIn')) {
//       this.replaceWith('habits');
//     } else if (prevProps.user.get('isLoggedIn') && !this.props.user.get('isLoggedIn')) {
//       this.replaceWith('/');
//     }
//   },

//   render() {
//     return <div>
//       {this.props.user.get('hasAuthStatus') ? this.props.children : 'Loading...'}
//     </div>;
//   }
// });

// Application.propTypes = {
//   user: userPropTypes.isRequired,
//   loadApp: React.PropTypes.func.isRequired,
//   receiveLoggedIn: React.PropTypes.func.isRequired,
//   receiveLoggedOut: React.PropTypes.func.isRequired
// };

class InsideContainer extends React.Component {
  render() {
    return <Connector select={state => ({user: state.app.get('user')})}>
      {({ user, dispatch }) =>
        <Inside user={user} logOut={(...args) => dispatch(UserActions.logOut(...args))} />
      }
    </Connector>;
  }
}

class Inside extends React.Component {
  render() {
    return <div>
      Inside!
      <a onClick={this.props.logOut}>Log out</a>
    </div>;
  }
}

Inside.propTypes = {
  user: userPropTypes.isRequired,
  logOut: React.PropTypes.func.isRequired
};

class OutsideContainer extends React.Component {
  render() {
    return <Connector select={state => ({user: state.app.get('user')})}>
      {({ user, dispatch }) =>
        <Outside user={user} {...bindActionCreators(UserActions, dispatch)} />
      }
    </Connector>;
  }
}

class Outside extends React.Component {
  render() {
    return <div>
      Outside!
      <a onClick={this.props.authenticateWithTwitter}>
        Twitter
      </a>
    </div>;
  }
}

Outside.propTypes = {
  user: userPropTypes.isRequired,
  authenticateWithTwitter: React.PropTypes.func.isRequired
};

var redux = createRedux({app: AppStore});

class Root extends React.Component {
  render(): React.Element {
    return <Provider redux={redux}>
      {() =>
        <Router history={this.props.history}>
          <Route component={AppContainer}>
            <Route component={OutsideContainer} path="/" />
            <Route component={InsideContainer} path="habits" />
          </Route>
        </Router>
      }
    </Provider>;
  }
}

Root.PropTypes = {
  history: React.PropTypes.object.isRequired
};

export default Root;
