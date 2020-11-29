import React from 'react';
import PropTypes from 'prop-types';
import Container from './styles';

import alert from '~/assets/alert-circle.svg';

export default function EmptyCartContainer({ message }) {
  return (
    <Container>
      <img src={alert} alt="Alert" />
      <strong>{message}</strong>
    </Container>
  );
}

EmptyCartContainer.propTypes = {
  message: PropTypes.string.isRequired,
};
