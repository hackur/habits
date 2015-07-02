/* @flow */

import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

export type RawAuth = {
  auth: {
    uid: string;
  };
};

export type User = {
  hasAuthStatus: boolean;
  isLoggedIn: boolean;
}

export var userPropTypes = ImmutablePropTypes.shape({
  hasAuthStatus: React.PropTypes.bool.isRequired,
  isLoggedIn: React.PropTypes.bool.isRequired
});
