/* @flow */

import React from 'react'

export type RouterLocation = {
  pathname: string
}

export const routerLocationPropTypes = React.PropTypes.shape({
  pathname: React.PropTypes.string.isRequired
})
