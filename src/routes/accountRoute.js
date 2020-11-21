import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Layout from '~/pages/Account';

import Toast from '~/components/Toast';

export default function CustomRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        <>
          <Layout>
            <Component {...props} />
          </Layout>
          <Toast status="O item foi adicionado ao cesto de compras!" />
        </>
      )}
    />
  );
}

CustomRoute.propTypes = {
  component: PropTypes.element.isRequired,
};
