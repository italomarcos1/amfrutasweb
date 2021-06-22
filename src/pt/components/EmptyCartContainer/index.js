import React from 'react';
import PropTypes from 'prop-types';
import Container from './styles';

import alert from '~/assets/alert-circle.svg';

export default function EmptyCartContainer({ message, isDesktop }) {
  return (
    <Container isDesktop={isDesktop}>
      <img src={alert} alt="Alert" />
      <strong>{message}</strong>
    </Container>
  );
}

EmptyCartContainer.propTypes = {
  message: PropTypes.string.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};
