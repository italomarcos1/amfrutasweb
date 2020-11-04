import React from 'react';
import PropTypes from 'prop-types';

import { Title, Button, SecureLogin, GoBack } from '~/components/LoginModal';

import Input from '~/components/Input';

import lock from '~/assets/lock.svg';

export default function ForgotPassword({ setPage }) {
  return (
    <>
      <Title>
        ESCREVA O SEU E-MAIL E LHE
        <br />
        <b>ENVIAREMOS UMA NOVA PALAVRA-PASSE</b>
      </Title>
      <Input
        name="email"
        title="E-mail"
        placeholder="Escreve o teu e-mail"
        customWidth={462}
        style={{ marginTop: 20 }}
      />
      <Button
        onClick={() => {}}
        color="#1DC167"
        shadowColor="#17A75B"
        style={{ marginTop: 48 }}
      >
        Iniciar sessão
      </Button>
      <GoBack onClick={() => setPage('main')}>Ou voltar</GoBack>
      <SecureLogin style={{ marginTop: 139 }}>
        Secure <img src={lock} alt="Lock" /> Login
      </SecureLogin>
    </>
  );
}

ForgotPassword.propTypes = {
  setPage: PropTypes.func.isRequired,
};
