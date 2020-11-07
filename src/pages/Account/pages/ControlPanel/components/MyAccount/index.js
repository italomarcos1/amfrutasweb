import React from 'react';

import {
  Container,
  InfoContainer,
  IconAndDataContainer,
  Content,
  UserInfoContainer,
  UserInfo,
} from './styles';

import myAccount from '~/assets/myAccount/minha-conta.svg';
import chevron from '~/assets/chevron-right.svg';

export default function MyAccount() {
  return (
    <Container>
      <InfoContainer>
        <IconAndDataContainer>
          <img src={myAccount} alt="Minha conta" />
          <Content>
            <strong>Minha conta</strong>
            <small>Você é um cliente desde 12/10/2020</small>
          </Content>
        </IconAndDataContainer>

        <button type="button">
          <img src={chevron} alt="Abrir menu" />
        </button>
      </InfoContainer>
      <UserInfoContainer>
        <UserInfo>
          <strong>Nome</strong>
          <small>Isabella</small>
        </UserInfo>
        <UserInfo>
          <strong>Apelido</strong>
          <small>Oliveira</small>
        </UserInfo>
        <UserInfo>
          <strong>Email</strong>
          <small>isabella.oliveira@me.com</small>
        </UserInfo>
        <UserInfo>
          <strong>Contra-senha</strong>
          <small>******</small>
        </UserInfo>
      </UserInfoContainer>
    </Container>
  );
}
