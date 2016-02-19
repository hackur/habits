/**
 * For when you are at /:username
 *
 * @flow
 */

import React from 'react'

export default class UserContainer extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
