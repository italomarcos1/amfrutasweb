import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Layout from '~/pages/Account';

export default function CustomRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

CustomRoute.propTypes = {
  component: PropTypes.element.isRequired,
};
