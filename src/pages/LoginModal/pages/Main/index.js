import React, { useCallback } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import PropTypes from 'prop-types';

import { Button, SecureLogin, Title } from '~/components/LoginModal';

import lock from '~/assets/lock.svg';

export default function Main({ setPage }) {
  const handleLogin = useCallback(response => {
    console.log(response);
  }, []);

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
      <FacebookLogin
        appId="314220626404166"
        callback={handleLogin}
        fields="name,email"
        render={({ onClick }) => (
          <Button onClick={onClick} color="#4267b2" shadowColor="#32549d">
            Iniciar sessão com&nbsp;<b>Facebook</b>
          </Button>
        )}
      />

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
