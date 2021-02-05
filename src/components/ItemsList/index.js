import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import { Container, List } from './styles';

export default function ItemsList({ children, length, breakpoint, style }) {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  return (
    <Container
      length={length}
      style={style}
      breakpoint={breakpoint}
      isDesktop={isDesktop}
    >
      <List isDesktop={isDesktop} style={{ width: '100%' }}>
        {children}
      </List>
    </Container>
  );
}

ItemsList.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  breakpoint: PropTypes.number,
  length: PropTypes.number.isRequired,
};

ItemsList.defaultProps = {
  breakpoint: 12,
  style: {},
};
