import React from 'react';

import { Container } from './styles';

export default function AppleLoginSuccessful(props) {
  console.log(props);

  return (
    <Container>
      <h1>Sucesso!</h1>
      <small>Redirecionando...</small>
    </Container>
  );
}
