/* @flow */

import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

export type RawAuth = {
  uid: string;
  twitter?: {
    displayName: string;
  };
  facebook?: {
    displayName: string;
  };
};

export type UserMeta = {
    active: boolean;
    displayName: string;
};

export type User = {
  hasAuthStatus: boolean;
  auth: ?RawAuth;
  dataUrl: string;
  userId: string;
  meta: ?UserMeta;
};

export type NewUserData = {
  meta: UserMeta;
};

export var userPropTypes = ImmutablePropTypes.shape({
  hasAuthStatus: React.PropTypes.bool.isRequired,
  auth: React.PropTypes.object,
  dataUrl: React.PropTypes.string,
  userId: React.PropTypes.string,
  meta: ImmutablePropTypes.shape({
    active: React.PropTypes.bool.isRequired,
    displayName: React.PropTypes.string.isRequired
  })
});
