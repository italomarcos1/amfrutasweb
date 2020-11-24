import React from 'react';

import { Container } from './styles';

import search from '~/assets/search_white.svg';

export default function SearchInput() {
  return (
    <Container>
      <input type="text" placeholder="O que tu procuras?" />
      <img src={search} alt="" />
    </Container>
  );
}
