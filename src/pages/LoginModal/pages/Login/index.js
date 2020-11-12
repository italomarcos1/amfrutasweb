import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';

import { useDispatch } from 'react-redux';

import {
  Title,
  ForgotPassword,
  Button,
  SecureLogin,
  GoBack,
} from '~/components/LoginModal';

import Input from '~/components/Input';

import { signInAlpha } from '~/store/modules/auth/actions';

import { mailIsValid, nameIsValid } from '~/utils/validation';
import { onlyValues } from '~/utils/onlyValues';

import lock from '~/assets/lock.svg';

export default function Login({ closeModal, setPage }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = useCallback(() => {
    setEmailError(false);
    setPasswordError(false);

    if (!mailIsValid(email)) setEmailError(!mailIsValid(email));

    if (nameIsValid(password)) setPasswordError(nameIsValid(password));

    if (emailError || passwordError) {
      return;
    }
    dispatch(signInAlpha());
    closeModal();
    history.push('/painel');
  }, [
    history,
    closeModal,
    dispatch,
    email,
    password,
    emailError,
    passwordError,
  ]);

  return (
    <>
      <Title>
        INICIA A TUA SESSÃO
        <br />
        <b>COM E-MAIL E SEGURANÇA</b>
      </Title>
      <Form onSubmit={handleSubmit}>
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
        <Input
          name="password"
          title="Palavra-passe"
          placeholder="Escolhe a tua palavra-passe"
          customWidth={462}
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          style={{ marginTop: 20 }}
          type="password"
          error={passwordError}
        />
        <ForgotPassword onClick={() => setPage('forgot')}>
          Não se recorda da palavra-passe?
        </ForgotPassword>
      </Form>
      <Button color="#1DC167" shadowColor="#17A75B" onClick={handleSubmit}>
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
  closeModal: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};
