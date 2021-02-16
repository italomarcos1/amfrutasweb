import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import { FaSpinner } from 'react-icons/fa';

import {
  Background,
  Container,
  LoginDetails,
  LoginLoading,
  ShopDetails,
  Header,
  HeaderButton,
  CloseButton,
} from './styles';

import { closeModalState } from '~/store/modules/auth/actions';

import close from '~/assets/close.svg';
import logo from '~/assets/amfrutas-white.svg';

import Main from './pages/Main';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';

export default function LoginModal({ closeModal }) {
  const [active, setActive] = useState('login');
  const [page, setPage] = useState('main');
  const [customHeight, setCustomHeight] = useState(566);
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const loginLoading = useSelector(s => s.auth.loading);

  const dispatch = useDispatch();

  const [loginLoadingWidth, setLoginLoadingWidth] = useState(500);

  useEffect(() => {
    const el = document.getElementById('loginDetails');

    setLoginLoadingWidth(el.offsetWidth);
  }, []);

  const handleCloseModal = useCallback(() => {
    closeModal();
    dispatch(closeModalState());
  }, [dispatch, closeModal]);

  // useEffect(() => {
  //   if (page === 'register' && !isDesktop) {
  //     setCustomHeight(666);
  //   } else setCustomHeight(566);
  // }, [page, isDesktop]);

  useEffect(() => {
    console.log(page);
  }, [page]);

  return (
    <Background>
      <Container isDesktop={isDesktop} page={page}>
        {isDesktop && (
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
        )}

        <LoginDetails
          isDesktop={isDesktop}
          id="loginDetails"
          // style={{ height: customHeight }}
        >
          {loginLoading && (
            <LoginLoading width={loginLoadingWidth}>
              <FaSpinner color="#666" size={38} />
            </LoginLoading>
          )}
          <Header isDesktop={isDesktop}>
            <HeaderButton
              onClick={() => {
                setActive('login');
                setPage('main');
              }}
              active={active === 'login'}
              isDesktop={isDesktop}
            >
              Iniciar sessão
            </HeaderButton>
            <HeaderButton
              onClick={() => {
                setActive('signUp');
                setPage('forgot');
                console.log('abc');
              }}
              active={active === 'signUp'}
              isDesktop={isDesktop}
            >
              Criar conta
            </HeaderButton>
            <CloseButton onClick={handleCloseModal} isDesktop={isDesktop}>
              <img src={close} alt="Close panel" />
            </CloseButton>
          </Header>
          {page === 'main' ? (
            <Main setPage={value => setPage(value)} isDesktop={isDesktop} />
          ) : page === 'login' ? (
            <Login
              closeModal={closeModal}
              setPage={value => {
                console.log(value);
                setPage(value);
              }}
              isDesktop={isDesktop}
            />
          ) : page === 'forgot' ? (
            <ForgotPassword
              setPage={value => setPage(value)}
              isDesktop={isDesktop}
            />
          ) : (
            <Register
              closeModal={closeModal}
              setPage={value => setPage(value)}
              isDesktop={isDesktop}
            />
          )}
        </LoginDetails>
      </Container>
    </Background>
  );
}

LoginModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
