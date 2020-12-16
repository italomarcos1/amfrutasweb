import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import Layout from '~/pages/Products';

export default function CustomRoute({ component: Component, ...rest }) {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const { pathname } = useLocation();

  // if (!isDesktop && pathname !== '/updating') {
  //   return <Redirect to="/updating" />;
  // }

  return (
    <Route
      {...rest}
      render={props => (
        <>
          <Layout>
            <Component {...props} />
          </Layout>
        </>
      )}
    />
  );
}

CustomRoute.propTypes = {
  component: PropTypes.element.isRequired,
};
