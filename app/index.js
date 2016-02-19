/**
 * Straight from:
 * https://github.com/reactjs/redux/tree/master/examples/real-world
 *
 * @flow
 */

// $FlowFixMe
import 'babel-polyfill'

import 'normalize.css'
import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import RootComponent from './Root'
import configureStore from './configureStore'

// To appease flow
const Root: any = RootComponent

// $FlowFixMe
const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

render(
  <Root
    store={store}
    history={history}
  />,
  document.getElementById('root')
)
