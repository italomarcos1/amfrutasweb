import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Title, Button, SecureLogin, GoBack } from '~/components/LoginModal';

import Input from '~/components/Input';

import lock from '~/assets/lock.svg';

import { mailIsValid } from '~/utils/validation';
import { onlyValues } from '~/utils/onlyValues';

export default function ForgotPassword({ setPage }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

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
        setError={value => setEmailError(!mailIsValid(value))}
        value={email}
        onChange={({ target: { value } }) => onlyValues(value, setEmail)}
        error={emailError}
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
