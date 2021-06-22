import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import { Container } from './styles';

export default function Product({ index }) {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  return (
    <>
      <Container isDesktop={isDesktop} id={`product${index}`} />
    </>
  );
}

Product.propTypes = {
  index: PropTypes.number.isRequired,
};
