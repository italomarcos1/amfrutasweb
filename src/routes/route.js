import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { useSelector } from 'react-redux';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const signed = useSelector(state => state.auth.signed);

  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const { pathname } = useLocation();

  // if (!isDesktop && pathname !== '/updating') {
  //   return <Redirect to="/updating" />;
  // }

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
