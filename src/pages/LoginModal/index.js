import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Background,
  Container,
  LoginDetails,
  ShopDetails,
  Header,
  HeaderButton,
  CloseButton,
} from './styles';

import close from '~/assets/close.svg';
import logo from '~/assets/amfrutas-white.svg';

import Main from './pages/Main';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';

export default function LoginModal({ closeModal }) {
  const [active, setActive] = useState('login');
  const [page, setPage] = useState('main');

  return (
    <Background>
      <Container onSubmit={() => {}}>
        <ShopDetails>
          <img src={logo} alt="" width={190} />
          <p style={{ marginTop: 40 }}>
            VARIEDADE DE PRODUTOS E <br /> MARCAS
          </p>
          <p>SEMPRE PREÇOS BAIXOS</p>
          <p>
            ECONOMIZA COM CADA <br /> COMPRA
          </p>
          <p>
            OFERTAS EXCLUSIVAS PARA <br />
            CLIENTES REGISTADOS
          </p>
          <p>
            RECEBE EUROS DE CRÉDITO <br />
            POR CADA COMPRA
          </p>
        </ShopDetails>
        <LoginDetails>
          <Header>
            <HeaderButton
              onClick={() => {
                setActive('login');
                setPage('main');
              }}
              active={active === 'login'}
            >
              Iniciar sessão
            </HeaderButton>
            <HeaderButton
              onClick={() => {
                setActive('signUp');
                setPage('register');
              }}
              active={active === 'signUp'}
            >
              Criar conta
            </HeaderButton>
            <CloseButton onClick={closeModal}>
              <img src={close} alt="Close panel" />
            </CloseButton>
          </Header>
          {page === 'main' ? (
            <Main setPage={value => setPage(value)} />
          ) : page === 'login' ? (
            <Login closeModal={closeModal} setPage={value => setPage(value)} />
          ) : page === 'forgot' ? (
            <ForgotPassword setPage={value => setPage(value)} />
          ) : (
            <Register setPage={value => setPage(value)} />
          )}
        </LoginDetails>
      </Container>
    </Background>
  );
}

LoginModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
