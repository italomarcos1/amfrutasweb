import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

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
  const history = useHistory();
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const { name, last_name, email } = useSelector(state => state.user.profile);

  return (
    <Container onClick={() => history.push('/conta')} isDesktop={isDesktop}>
      <InfoContainer isDesktop={isDesktop}>
        <IconAndDataContainer
          style={
            isDesktop
              ? {}
              : { width: '100%', alignItems: 'center', backgroundColor: '#c30' }
          }
        >
          <img src={myAccount} alt="Minha conta" />
          <Content
            isDesktop={isDesktop}
            style={isDesktop ? {} : { width: '100%', backgroundColor: '#390' }}
          >
            <strong>Minha conta</strong>
            <small
              style={
                isDesktop ? {} : { width: '100%', backgroundColor: '#f90' }
              }
            >
              Você é um cliente desde 12/10/2020
            </small>
          </Content>
        </IconAndDataContainer>

        <button type="button">
          <img src={chevron} alt="Abrir menu" />
        </button>
      </InfoContainer>
      <UserInfoContainer isDesktop={isDesktop}>
        <UserInfo style={isDesktop ? {} : { marginLeft: 20, width: '100%' }}>
          <strong>Nome</strong>
          <small>{name}</small>
        </UserInfo>
        <UserInfo style={isDesktop ? {} : { marginLeft: 20, width: '100%' }}>
          <strong>Apelido</strong>
          <small>{last_name}</small>
        </UserInfo>
        <UserInfo style={isDesktop ? {} : { marginLeft: 20, width: '100%' }}>
          <strong>Email</strong>
          <small>{email}</small>
        </UserInfo>
        <UserInfo style={isDesktop ? {} : { marginLeft: 20, width: '100%' }}>
          <strong>Contra-senha</strong>
          <small>******</small>
        </UserInfo>
      </UserInfoContainer>
    </Container>
  );
}
