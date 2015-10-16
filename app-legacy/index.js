/**
 * Base from https://github.com/emmenko/redux-react-router-async-example
 *
 * @flow
 */

require('normalize.css');

import React from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import Root from './Root';

var history = new BrowserHistory();

export default React.render(
  <Root history={history} />,
  document.getElementById('content'));
