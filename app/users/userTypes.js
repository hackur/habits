/* @flow */

import React from 'react'

export type RawAuth = {
  uid: string,
  twitter: {
    displayName: string
  }
}

export type User = {
  uid: string,
  auth: RawAuth,
  displayName: ?string,
  username: ?string,
  dataUrl: string,
}

export type NewUser = {
  displayName: string
}

export const userPropTypes = React.PropTypes.shape({
  uid: React.PropTypes.string.isRequired,
  auth: React.PropTypes.object.isRequired,
  displayName: React.PropTypes.string,
  username: React.PropTypes.string,
  dataUrl: React.PropTypes.string.isRequired
})
