import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';

import { Title, Button, SecureLogin, GoBack } from '~/components/LoginModal';

import Input from '~/components/Input';
import Toast from '~/components/Toast';

import lock from '~/assets/lock.svg';

import backend from '~/services/api';

import { mailIsValid } from '~/utils/validation';
import { onlyValues } from '~/utils/onlyValues';

export default function ForgotPassword({ setPage }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [failedToastVisible, setFailedToastVisible] = useState(false);

  const handleForgotPassword = useCallback(async () => {
    try {
      setLoading(true);
      const userEmail = new FormData();

      userEmail.append('email', email);
      await backend.post('auth/reset-password', userEmail);

      setLoading(false);
      setToastVisible(true);

      setTimeout(() => {
        setToastVisible(false);
      }, 2800);
    } catch (error) {
      setFailedToastVisible(true);
      setLoading(false);

      setTimeout(() => {
        setFailedToastVisible(false);
      }, 2800);
    }
  }, [email]);

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
        onClick={handleForgotPassword}
        color="#1DC167"
        shadowColor="#17A75B"
        style={{ marginTop: 48 }}
      >
        {loading ? (
          <FaSpinner color="#fff" size={20} />
        ) : (
          'Recuperar Palavra-passe'
        )}
      </Button>
      <GoBack onClick={() => setPage('main')}>Ou voltar</GoBack>
      <SecureLogin style={{ marginTop: 139 }}>
        Secure <img src={lock} alt="Lock" /> Login
      </SecureLogin>
      {toastVisible && (
        <Toast
          status="Enviamos um link de redefinição de senha para seu e-mail!"
          color="#1DC167"
        />
      )}
      {failedToastVisible && (
        <Toast
          status="O e-mail informado não pertence a nenhum usuário. Tente novamente"
          color="#f56060"
        />
      )}
    </>
  );
}

ForgotPassword.propTypes = {
  setPage: PropTypes.func.isRequired,
};
