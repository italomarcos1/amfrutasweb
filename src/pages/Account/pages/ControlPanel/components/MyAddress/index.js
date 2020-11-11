import React from 'react';

import { Container, Content, InfoContainer, AddressInfo } from './styles';

import location from '~/assets/myAccount/location.svg';
import chevron from '~/assets/chevron-right.svg';

export default function MyAddress() {
  return (
    <Container>
      <InfoContainer>
        <img src={location} alt="Seus endereços" />
        <Content>
          <strong>Meu endereço</strong>
          <small>1 endereço guardado</small>
        </Content>
        <button type="button">
          <img src={chevron} alt="Abrir menu" />
        </button>
      </InfoContainer>

      <AddressInfo>
        <small>ENDEREÇO PRINCIPAL</small>
        <strong>
          <b>Isabella Oliveira</b>
        </strong>
        <strong>Rua 23 de Março, RC</strong>
        <strong>2740-198, Porto Salvo</strong>
        <strong>Lisboa. Portugal</strong>
      </AddressInfo>
    </Container>
  );
}
