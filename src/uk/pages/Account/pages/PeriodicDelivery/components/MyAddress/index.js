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
          <strong>My Address</strong>
          <small>1 address saved.</small>
        </Content>
        <button type="button">
          <img src={chevron} alt="Abrir menu" />
        </button>
      </InfoContainer>

      <AddressInfo>
        <small>MAIN ADDRESS</small>
        <strong>
          <b>Isabella Oliveira</b>
        </strong>
        <br />
        <strong>Rua 23 de Março, RC</strong>
        <br />
        <strong>2740-198, Porto Salvo</strong>
        <br />
        <strong>Lisboa. Portugal</strong>
      </AddressInfo>
    </Container>
  );
}
