import React from 'react';

import { Container } from './styles';

import search from '~/assets/search_white.svg';

export default function SearchInput(props) {
  return (
    <Container>
      <input type="text" placeholder="O que tu procuras?" {...props} />
      <img src={search} alt="" />
    </Container>
  );
}
