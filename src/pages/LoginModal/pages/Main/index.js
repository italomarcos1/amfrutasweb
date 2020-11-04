import React from 'react';
import PropTypes from 'prop-types';

import { Button, SecureLogin, Title } from '~/components/LoginModal';

import lock from '~/assets/lock.svg';

export default function Main({ setPage }) {
  return (
    <>
      <Title>
        INICIA SESSÃO PARA UMA
        <br />
        <b>EXPERIÊNCIA PERSONALIZADA</b>
      </Title>
      <Button
        onClick={() => setPage('login')}
        style={{ marginTop: 40 }}
        color="#2CBDD3"
        shadowColor="#26A5BB"
      >
        Iniciar sessão com&nbsp;<b>E-mail</b>
      </Button>
      <Button onClick={() => {}} color="#4267b2" shadowColor="#32549d">
        Iniciar sessão com&nbsp;<b>Facebook</b>
      </Button>
      <Button onClick={() => {}} color="#f03f39" shadowColor="#d02b21">
        Iniciar sessão com&nbsp;<b>Google</b>
      </Button>
      <Button onClick={() => {}} color="#000" shadowColor="#9c9c9c">
        Iniciar sessão com&nbsp;<b>Apple</b>
      </Button>
      <SecureLogin>
        Secure <img src={lock} alt="Lock" /> Login
      </SecureLogin>
    </>
  );
}

Main.propTypes = {
  setPage: PropTypes.func.isRequired,
};
