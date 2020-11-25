import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Title,
  InputContainer,
  Button,
  SecureLogin,
} from '~/components/LoginModal';

import { mailIsValid } from '~/utils/validation';
import { onlyValues } from '~/utils/onlyValues';

import Input from '~/components/Input';
import InputMask from '~/components/InputMask';

import lock from '~/assets/lock.svg';

export default function Register() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  return (
    <>
      <Title>
        CRIA A TUA
        <br />
        <b>CONTA COM E-MAIL E SEGURANÇA</b>
      </Title>
      <InputContainer>
        <Input name="name" title="Nome" placeholder="Escreve o teu nome" />
        <Input
          name="last_name"
          title="Apelido"
          placeholder="Escolhe o teu apelido"
        />
      </InputContainer>
      <InputContainer>
        <Input
          name="email"
          title="E-mail"
          placeholder="Escreve o teu e-mail"
          setError={value => setEmailError(!mailIsValid(value))}
          value={email}
          onChange={({ target: { value } }) => onlyValues(value, setEmail)}
          error={emailError}
        />
        <InputMask name="birth" title="Data de nascimento" />
      </InputContainer>
      <InputContainer>
        <Input
          name="password"
          title="Palavra-passe"
          placeholder="Escolhe a tua palavra-passe"
          type="password"
        />
        <Input
          name="confirmPassword"
          title="Repita palavra-passe"
          placeholder="Repita a tua palavra-passe"
          type="password"
        />
      </InputContainer>

      <Button
        onClick={() => {}}
        color="#1DC167"
        shadowColor="#17A75B"
        style={{ marginTop: 47 }}
      >
        Criar conta
      </Button>
      <SecureLogin style={{ marginTop: 48 }}>
        Secure <img src={lock} alt="Lock" /> Login
      </SecureLogin>
    </>
  );
}
