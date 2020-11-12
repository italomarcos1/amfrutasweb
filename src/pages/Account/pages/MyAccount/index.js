import React, { useState } from 'react';

import { Container, Content, InfoContainer, SectionTitle } from './styles';

import { InputContainer, Button } from '~/components/LoginModal';

import { mailIsValid } from '~/utils/validation';
import { onlyValues } from '~/utils/onlyValues';

import Input from '~/components/Input';

import InputMask from '~/components/InputMask';
import Select from '~/components/Select';

export default function MyAccount() {
  const [gender, setGender] = useState('');
  const [residence, setResidence] = useState('');
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const genderData = [
    {
      label: 'Masculino',
      value: 'Masculino',
    },
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Outro', value: 'Outro' },
  ];

  return (
    <>
      <Container>
        <Content>
          <InfoContainer onSubmit={() => {}}>
            <SectionTitle>
              <strong>Dados de contato</strong>
              <small>Confira e atualize caso necessário.</small>
            </SectionTitle>
            <InputContainer>
              <Input
                name="name"
                title="Nome"
                placeholder="Escreve o teu nome"
              />
              <Input
                name="nickname"
                title="Apelido"
                placeholder="Escolhe o teu apelido"
              />
            </InputContainer>
            <InputContainer>
              <Input
                name="email"
                title="Email"
                placeholder="Escreve o teu e-mail"
                setError={value => setEmailError(!mailIsValid(value))}
                value={email}
                onChange={({ target: { value } }) =>
                  onlyValues(value, setEmail)
                }
                error={emailError}
              />

              <InputMask name="dateOfBirth" title="Data de nascimento" />
            </InputContainer>
            <InputContainer>
              <InputMask name="nif" type="9d" title="NIF" />
              <Select
                title="Gênero"
                placeholder="Escolha o gênero"
                setValue={setGender}
                customWidth={221}
                data={genderData}
              />
            </InputContainer>
            <InputContainer>
              <InputMask name="phone" type="phone" title="Telemóvel" />
              <InputMask
                name="mailCode"
                mask="99 99 99"
                placeholder="00 00 00"
                title="Código de validação por e-mail"
              />
            </InputContainer>
            <Button
              onClick={() => {}}
              color="#1DC167"
              shadowColor="#17A75B"
              style={{ width: 221 }}
            >
              <b>Gravar</b>
            </Button>
          </InfoContainer>
          <InfoContainer onSubmit={() => {}} style={{ width: 274 }}>
            <SectionTitle>
              <strong>Palavra-passe</strong>
              <small>Com validação por email</small>
            </SectionTitle>

            <Input
              name="password"
              title="Palavra-passe"
              placeholder="Escolhe tua palavra-passe"
              style={{ marginTop: 20 }}
              type="password"
            />
            <Input
              name="repeatPassword"
              title="Repita palavra-passe"
              placeholder="Repita a tua palavra-passe"
              style={{ marginTop: 20 }}
              type="password"
            />
            <InputMask
              name="passwordMailCode"
              mask="99 99 99"
              placeholder="00 00 00"
              title="Código de validação por e-mail"
              style={{ marginTop: 20 }}
            />

            <Button
              onClick={() => {}}
              color="#1DC167"
              shadowColor="#17A75B"
              style={{ width: 221, marginTop: 93 }}
            >
              <b>Gravar</b>
            </Button>
          </InfoContainer>
        </Content>
      </Container>
      <div style={{ width: 840, height: 320 }} />
    </>
  );
}
