import React from 'react';
import { useMediaQuery } from 'react-responsive';

import { Container } from './styles';

import search from '~/assets/search_white.svg';

export default function SearchInput(props) {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  return (
    <Container isDesktop={isDesktop}>
      <input type="text" placeholder="O que tu procuras?" {...props} />
      <img src={search} alt="" />
    </Container>
  );
}
