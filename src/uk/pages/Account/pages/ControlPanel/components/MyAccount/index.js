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
    <Container onClick={() => history.push('/account')} isDesktop={isDesktop}>
      <InfoContainer isDesktop={isDesktop}>
        <IconAndDataContainer
          style={isDesktop ? {} : { width: '100%', alignItems: 'center' }}
        >
          <img src={myAccount} alt="Minha conta" />
          <Content
            isDesktop={isDesktop}
            style={isDesktop ? {} : { width: '100%' }}
          >
            <strong style={isDesktop ? {} : { fontSize: 20 }}>
              My Account
            </strong>
            <small style={isDesktop ? {} : { width: '100%', fontSize: 13 }}>
              Customer since 12/10/2020
            </small>
          </Content>
        </IconAndDataContainer>

        <button type="button">
          <img src={chevron} alt="Abrir menu" />
        </button>
      </InfoContainer>
      <UserInfoContainer isDesktop={isDesktop}>
        <UserInfo style={isDesktop ? {} : { marginLeft: 20, width: '100%' }}>
          <strong>Name</strong>
          <small>{name}</small>
        </UserInfo>
        <UserInfo style={isDesktop ? {} : { marginLeft: 20, width: '100%' }}>
          <strong>Last name</strong>
          <small>{last_name}</small>
        </UserInfo>
        <UserInfo style={isDesktop ? {} : { marginLeft: 20, width: '100%' }}>
          <strong>Email</strong>
          <small>{email}</small>
        </UserInfo>
        <UserInfo style={isDesktop ? {} : { marginLeft: 20, width: '100%' }}>
          <strong>Password</strong>
          <small>******</small>
        </UserInfo>
      </UserInfoContainer>
    </Container>
  );
}
