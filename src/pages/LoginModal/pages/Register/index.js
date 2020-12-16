import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';

import { FaSpinner } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';

import {
  Title,
  InputContainer,
  Button,
  SecureLogin,
} from '~/components/LoginModal';

import { onlyValues } from '~/utils/onlyValues';

import Input from '~/components/Input';
import InputMask from '~/components/InputMask';
import Toast from '~/components/Toast';
import { nameIsValid, mailIsValid, dateIsValid } from '~/utils/validation';

import { signUpRequest, cleanRegister } from '~/store/modules/auth/actions';

import lock from '~/assets/lock.svg';

export default function Register({ closeModal, isDesktop }) {
  const [name, setName] = useState('');
  const [invalidName, setInvalidName] = useState(false);
  const [lastName, setLastName] = useState('');
  const [invalidLastName, setInvalidLastName] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const [birthday, setBirthDate] = useState('');
  const [birthDateError, setBirthDateError] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const signed = useSelector(state => state.auth.signed);
  const loading = useSelector(state => state.auth.loading);
  const registerError = useSelector(state => state.auth.registerError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (signed) closeModal();
  }, [closeModal, signed]);

  useEffect(() => {
    if (registerError) {
      setToastVisible(true);

      const timer = setTimeout(() => {
        setToastVisible(false);
        dispatch(cleanRegister());
      }, 2800);

      return () => {
        dispatch(cleanRegister());
        clearTimeout(timer);
      };
    }
  }, [dispatch, registerError]);

  const handleSubmit = useCallback(() => {
    try {
      setInvalidName(false);
      setInvalidLastName(false);
      setEmailError(false);
      setBirthDateError(false);
      setPasswordError(false);
      setConfirmPasswordError(false);

      setToastVisible(false);

      if (
        nameIsValid(name) ||
        nameIsValid(lastName) ||
        !mailIsValid(email) ||
        !dateIsValid(birthday) ||
        nameIsValid(password) ||
        nameIsValid(confirmPassword)
      ) {
        setInvalidName(nameIsValid(name));
        setInvalidLastName(nameIsValid(lastName));
        setEmailError(!mailIsValid(email));
        setBirthDateError(!dateIsValid(birthday));
        setPasswordError(nameIsValid(password));
        setConfirmPasswordError(nameIsValid(confirmPassword));
        setToastVisible(true);

        return;
      }

      if (confirmPassword !== password) {
        setConfirmPasswordError(true);
        return;
      }

      dispatch(signUpRequest({ name, lastName, email, password, birthday }));
    } catch (err) {
      console.log('Erro na newsletter');
    }
  }, [dispatch, name, lastName, email, password, birthday, confirmPassword]);

  return (
    <>
      <Title isDesktop={isDesktop}>
        CRIA A TUA
        <br />
        <b>CONTA COM E-MAIL E SEGURANÇA</b>
      </Title>
      <Form onSubmit={handleSubmit} style={isDesktop ? {} : { width: '85%' }}>
        <InputContainer isDesktop={isDesktop}>
          <Input
            name="name"
            title="Nome"
            placeholder="Escreve o teu nome"
            error={invalidName}
            customWidth={isDesktop ? 221 : '100%'}
            onChange={({ target: { value } }) => setName(value)}
            value={name}
          />
          <Input
            name="last_name"
            title="Apelido"
            placeholder="Escolhe o teu apelido"
            error={invalidLastName}
            onChange={({ target: { value } }) => setLastName(value)}
            value={lastName}
            customWidth={isDesktop ? 221 : '100%'}
          />
        </InputContainer>
        <InputContainer isDesktop={isDesktop} style={{ marginTop: 10 }}>
          <Input
            name="email"
            title="E-mail"
            placeholder="Escreve o teu e-mail"
            setError={value => setEmailError(!mailIsValid(value))}
            value={email}
            onChange={({ target: { value } }) => onlyValues(value, setEmail)}
            error={emailError}
            customWidth={isDesktop ? 221 : '100%'}
          />
          <InputMask
            name="birthday"
            title="Data de Nascimento"
            placeholder="Data de Nascimento"
            value={birthday}
            onChange={({ target: { value } }) => setBirthDate(value)}
            error={birthDateError}
            customWidth={isDesktop ? 221 : '100%'}
          />
        </InputContainer>
        <InputContainer isDesktop={isDesktop} style={{ marginTop: 10 }}>
          <Input
            name="password"
            title="Palavra-passe"
            placeholder="Escolhe a tua palavra-passe"
            type="password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
            error={passwordError}
            customWidth={isDesktop ? 221 : '100%'}
          />
          <Input
            name="confirmPassword"
            title="Repita palavra-passe"
            placeholder="Repita a tua palavra-passe"
            type="password"
            value={confirmPassword}
            onChange={({ target: { value } }) => setConfirmPassword(value)}
            error={confirmPasswordError}
            customWidth={isDesktop ? 221 : '100%'}
          />
        </InputContainer>
      </Form>

      <Button
        onClick={handleSubmit}
        color="#1DC167"
        shadowColor="#17A75B"
        style={isDesktop ? { marginTop: 47 } : { width: '85%', marginTop: 17 }}
      >
        {loading ? <FaSpinner color="#fff" size={20} /> : 'Criar conta'}
      </Button>
      <SecureLogin style={isDesktop ? { marginTop: 48 } : { marginTop: 17 }}>
        Secure <img src={lock} alt="Lock" /> Login
      </SecureLogin>
      {toastVisible && (
        <Toast
          status="Houve um erro no cadastro. Confira seus dados e tente novamente."
          color="#f56060"
        />
      )}
    </>
  );
}

Register.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};
