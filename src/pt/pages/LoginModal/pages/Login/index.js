import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import { FaSpinner } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';

import {
  Title,
  ForgotPasswordButton,
  Button,
  SecureLogin,
  GoBack,
} from '~/pt/components/LoginModal';

import Input from '~/pt/components/Input';
import Toast from '~/pt/components/Toast';

import { signInRequest, cleanLogin } from '~/store/modules/auth/actions';

import { mailIsValid, nameIsValid } from '~/utils/validation';
import { onlyValues } from '~/utils/onlyValues';

import lock from '~/assets/lock.svg';

export default function Login({ closeModal, setPage, isDesktop }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const dispatch = useDispatch();
  const loginError = useSelector(state => state.auth.loginError);
  const signed = useSelector(state => state.auth.signed);
  const loading = useSelector(state => state.auth.loading);

  useEffect(() => {
    if (loginError) {
      setToastVisible(true);

      const timer = setTimeout(() => {
        setToastVisible(false);
        dispatch(cleanLogin());
      }, 2800);

      return () => {
        dispatch(cleanLogin());
        clearTimeout(timer);
      };
    }
  }, [dispatch, loginError]);

  useEffect(() => {
    if (signed) closeModal();
  }, [closeModal, signed]);

  const handleSubmit = useCallback(() => {
    setEmailError(false);
    setPasswordError(false);
    setToastVisible(false);

    if (!mailIsValid(email)) setEmailError(!mailIsValid(email));

    if (nameIsValid(password)) setPasswordError(nameIsValid(password));

    if (emailError || passwordError) {
      setToastVisible(true);
      return;
    }
    dispatch(signInRequest(email, password));
  }, [dispatch, email, password, emailError, passwordError]);

  return (
    <>
      <Title isDesktop={isDesktop}>
        INICIA A TUA SESSÃO
        <br />
        <b>COM E-MAIL E SEGURANÇA</b>
      </Title>
      <Form onSubmit={handleSubmit} style={isDesktop ? {} : { width: '85%' }}>
        <Input
          name="email"
          title="E-mail"
          placeholder="Escreve o teu e-mail"
          customWidth={isDesktop ? 462 : '100%'}
          style={loading ? { marginTop: 20, opacity: 0.6 } : {}}
          setError={value => setEmailError(!mailIsValid(value))}
          value={email}
          onChange={({ target: { value } }) => onlyValues(value, setEmail)}
          error={emailError}
        />
        <Input
          name="password"
          title="Palavra-passe"
          placeholder="Escolhe a tua palavra-passe"
          type="password"
          customWidth={isDesktop ? 462 : '100%'}
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          style={
            loading && isDesktop
              ? { marginTop: isDesktop ? 20 : 10, opacity: 0.6 }
              : isDesktop
              ? { marginTop: 20 }
              : { marginTop: 10 }
          }
          error={passwordError}
        />
        <ForgotPasswordButton onClick={() => setPage('forgot')}>
          Não se recorda da palavra-passe?
        </ForgotPasswordButton>
      </Form>
      <Button
        color="#1DC167"
        shadowColor="#17A75B"
        onClick={handleSubmit}
        style={
          isDesktop
            ? {}
            : {
                width: '85%',
              }
        }
      >
        {loading ? <FaSpinner color="#fff" size={20} /> : 'Iniciar sessão'}
      </Button>
      <GoBack
        style={isDesktop ? { marginTop: 28 } : { marginTop: 14 }}
        onClick={() => setPage('main')}
      >
        Ou voltar
      </GoBack>
      <SecureLogin style={isDesktop ? { marginTop: 60 } : { marginTop: 19 }}>
        Secure <img src={lock} alt="Lock" /> Login
      </SecureLogin>
      {toastVisible && (
        <Toast
          status="Houve um erro no login. Confira seus dados e tente novamente."
          color="#f56060"
        />
      )}
    </>
  );
}

Login.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};
