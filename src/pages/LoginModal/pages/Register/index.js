import React from 'react';
import PropTypes from 'prop-types';

import {
  Title,
  InputContainer,
  Button,
  SecureLogin,
} from '~/components/LoginModal';

import Input from '~/components/Input';
import InputMask from '~/components/InputMask';

import lock from '~/assets/lock.svg';

export default function Register() {
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
          name="nickname"
          title="Apelido"
          placeholder="Escolhe o teu apelido"
        />
      </InputContainer>
      <InputContainer>
        <Input name="email" title="E-mail" placeholder="Escreve o teu e-mail" />
        <InputMask name="dateOfBirth" title="Data de nascimento" />
      </InputContainer>
      <InputContainer>
        <Input
          name="password"
          title="Palavra-passe"
          placeholder="Escolhe a tua palavra-passe"
        />
        <Input
          name="confirmPassword"
          title="Repita palavra-passe"
          placeholder="Repita a tua palavra-passe"
        />
      </InputContainer>

      <Button
        onClick={() => {}}
        color="#1DC167"
        shadowColor="#17A75B"
        style={{ marginTop: 47 }}
      >
        Iniciar sessão
      </Button>
      <SecureLogin style={{ marginTop: 48 }}>
        Secure <img src={lock} alt="Lock" /> Login
      </SecureLogin>
    </>
  );
}
