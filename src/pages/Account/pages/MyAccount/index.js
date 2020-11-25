import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Content, InfoContainer, SectionTitle } from './styles';

import { InputContainer, Button } from '~/components/LoginModal';

import {
  nameIsValid,
  dateIsValid,
  phoneIsValid,
  documentIsValid,
  mailCodeIsValid,
  mailIsValid,
} from '~/utils/validation';
import { onlyValues } from '~/utils/onlyValues';

import Input from '~/components/Input';

import InputMask from '~/components/InputMask';
import Select from '~/components/Select';

import { updateProfileRequest } from '~/store/modules/user/actions';

export default function MyAccount() {
  const [emailError, setEmailError] = useState(false);
  const [invalidBirth, setInvalidBirth] = useState(false);

  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  const [email, setEmail] = useState(profile !== null ? profile.email : '');
  const [gender, setGender] = useState(profile !== null ? profile.gender : '');

  const [invalidFields, setInvalidFields] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [invalidDocument, setInvalidDocument] = useState(false);
  const [invalidGender, setInvalidGender] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  const [invalidMailCode, setInvalidMailCode] = useState(false);

  const genderData = [
    {
      label: 'Masculino',
      value: 'Masculino',
    },
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Outro', value: 'Outro' },
  ];

  const handleSubmit = useCallback(
    formData => {
      const formattedData = Object.values(formData);
      invalidFields.fill(false);
      setInvalidDocument(false);
      setInvalidPhone(false);
      setInvalidMailCode(false);
      setInvalidGender(false);
      setEmailError(false);
      setInvalidBirth(false);

      const anyEmptyField = formattedData.some(field => nameIsValid(field));

      if (anyEmptyField) {
        setInvalidFields(formattedData.map(field => nameIsValid(field)));
        setEmailError(!mailIsValid(formData.email));
        setInvalidDocument(!documentIsValid(formData.document));
        setInvalidPhone(!phoneIsValid(formData.phone));
        setInvalidMailCode(!mailCodeIsValid(formData.mailCode));
        setInvalidGender(nameIsValid(gender));
        setInvalidBirth(!dateIsValid(formData.birth));

        return;
      }

      const profileData = {
        ...formData,
        gender,
      };

      dispatch(updateProfileRequest(profileData));
    },
    [dispatch, gender, invalidFields]
  );

  return (
    <>
      <Container>
        <Content>
          <InfoContainer
            onSubmit={handleSubmit}
            initialData={profile !== null ? profile : {}}
          >
            <SectionTitle>
              <strong>Dados de contato</strong>
              <small>Confira e atualize caso necessário.</small>
            </SectionTitle>
            <InputContainer>
              <Input
                name="name"
                title="Nome"
                placeholder="Escreve o teu nome"
                error={invalidFields[0]}
              />
              <Input
                name="last_name"
                title="Apelido"
                placeholder="Escolhe o teu apelido"
                error={invalidFields[1]}
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
              <InputMask
                name="birth"
                title="Data de nascimento"
                error={invalidBirth}
              />
            </InputContainer>
            <InputContainer>
              <InputMask
                name="document"
                type="9d"
                title="NIF"
                error={invalidFields[3] || invalidDocument}
              />
              {gender !== '' ? (
                <Select
                  title="Gênero"
                  placeholder="Escolha o gênero"
                  setValue={setGender}
                  defaultValue={{ label: gender, value: gender }}
                  customWidth={221}
                  data={genderData}
                  error={invalidGender}
                />
              ) : (
                <Select
                  title="Gênero"
                  placeholder="Escolha o gênero"
                  setValue={setGender}
                  customWidth={221}
                  data={genderData}
                  error={invalidGender}
                />
              )}
            </InputContainer>
            <InputContainer>
              <InputMask
                name="phone"
                type="phone"
                title="Telemóvel"
                error={invalidFields[4] || invalidPhone}
              />
              <InputMask
                name="mailCode"
                mask="99 99 99"
                placeholder="00 00 00"
                title="Código de validação por e-mail"
                error={invalidFields[5] || invalidMailCode}
              />
            </InputContainer>
            <Button
              onClick={() => {}}
              color="#1DC167"
              shadowColor="#17A75B"
              style={{ width: 221 }}
              type="submit"
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
