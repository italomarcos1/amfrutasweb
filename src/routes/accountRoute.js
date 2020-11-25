import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Layout from '~/pages/Account';

// import Toast from '~/components/Toast';

export default function CustomRoute({
  component: Component,
  isPrivate,
  ...rest
}) {
  const signed = useSelector(state => state.auth.signed);

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
