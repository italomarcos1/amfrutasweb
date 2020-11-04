import React from 'react';
import PropTypes from 'prop-types';

import {
  Title,
  ForgotPassword,
  Button,
  SecureLogin,
  GoBack,
} from '~/components/LoginModal';

import Input from '~/components/Input';

import lock from '~/assets/lock.svg';

export default function Login({ setPage }) {
  return (
    <>
      <Title>
        INICIA A TUA SESSÃO
        <br />
        <b>COM E-MAIL E SEGURANÇA</b>
      </Title>
      <div>
        <Input
          name="email"
          title="E-mail"
          placeholder="Escreve o teu e-mail"
          customWidth={462}
          style={{ marginTop: 20 }}
        />
        <Input
          name="password"
          title="Palavra-passe"
          placeholder="Escolhe a tua palavra-passe"
          customWidth={462}
          style={{ marginTop: 20 }}
        />
        <ForgotPassword onClick={() => setPage('forgot')}>
          Não se recorda da palavra-passe?
        </ForgotPassword>
      </div>
      <Button onClick={() => {}} color="#1DC167" shadowColor="#17A75B">
        Iniciar sessão
      </Button>
      <GoBack onClick={() => setPage('main')}>Ou voltar</GoBack>
      <SecureLogin style={{ marginTop: 60 }}>
        Secure <img src={lock} alt="Lock" /> Login
      </SecureLogin>
    </>
  );
}

Login.propTypes = {
  setPage: PropTypes.func.isRequired,
};
