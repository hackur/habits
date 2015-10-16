/**
 * This will add react-router's navigation methods as props using the
 * Navigation mixin.
 *
 * @flow
 */

import React from 'react';
import { Navigation } from 'react-router';

export default function addNavigation(DecoratedComponent: React.Element): React.Element {
  return React.createClass({
    displayName: `AddNavigation(${DecoratedComponent.name})`,

    mixins: [Navigation],

    render() {
      return <DecoratedComponent replaceWith={this.replaceWith}
        {...this.props} />;
    }
  });
}
