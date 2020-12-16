import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import Layout from '~/pages/Account';

// import Toast from '~/components/Toast';

export default function CustomRoute({
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

  return (
    <Route
      {...rest}
      render={props => (
        <>
          <Layout>
            <Component {...props} />
          </Layout>
          {/* <Toast status="O item foi adicionado ao cesto de compras!" /> */}
        </>
      )}
    />
  );
}

CustomRoute.propTypes = {
  component: PropTypes.element.isRequired,
};
