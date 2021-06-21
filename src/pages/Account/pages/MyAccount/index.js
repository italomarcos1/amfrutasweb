import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

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
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const [emailError, setEmailError] = useState(false);
  const [invalidBirth, setInvalidBirth] = useState(false);

  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  const [email, setEmail] = useState(profile !== null ? profile.email : '');
  const [gender, setGender] = useState(profile !== null ? profile.gender : '');

  const [invalidName, setInvalidName] = useState(false);
  const [invalidLastName, setInvalidLastName] = useState(false);

  const [invalidDocument, setInvalidDocument] = useState(false);
  const [invalidGender, setInvalidGender] = useState(false);
  const [invalidPhone, setInvalidPhone] = useState(false);
  // const [invalidMailCode, setInvalidMailCode] = useState(false);

  const genderData = [
    {
      label: 'Masculino',
      value: 'Masculino',
    },
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Outro', value: 'Outro' },
  ];

  const handleSubmit = useCallback(
    async formData => {
      const formattedData = Object.values(formData);
      setInvalidName(false);
      setInvalidLastName(false);
      setInvalidDocument(false);
      setInvalidPhone(false);
      // setInvalidMailCode(false);
      setInvalidGender(false);
      setEmailError(false);
      setInvalidBirth(false);

      const anyEmptyField = formattedData.some(field => nameIsValid(field));

      if (anyEmptyField) {
        setInvalidName(nameIsValid(formData.name));
        setInvalidLastName(nameIsValid(formData.last_name));
        setEmailError(!mailIsValid(formData.email));
        setInvalidDocument(!documentIsValid(formData.document));
        setInvalidPhone(!phoneIsValid(formData.cellphone));
        // setInvalidMailCode(!mailCodeIsValid(formData.verification_code));
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
    [dispatch, gender]
  );

  return (
    <>
      <Container>
        <Content isDesktop={isDesktop}>
          <InfoContainer
            onSubmit={handleSubmit}
            initialData={profile !== null ? profile : {}}
            isDesktop={isDesktop}
          >
            <SectionTitle isDesktop={isDesktop}>
              <strong>Contact Info</strong>
              <small>Checkout and update your info.</small>
            </SectionTitle>
            <InputContainer isDesktop={isDesktop}>
              <Input
                name="name"
                title="Name"
                placeholder="Tell us your name"
                error={invalidName}
              />
              <Input
                name="last_name"
                title="Last name"
                placeholder="Tell us your last name"
                error={invalidLastName}
              />
            </InputContainer>
            <InputContainer isDesktop={isDesktop}>
              <Input
                name="email"
                title="E-mail"
                placeholder="E-mail address"
                setError={value => setEmailError(!mailIsValid(value))}
                value={email}
                onChange={({ target: { value } }) =>
                  onlyValues(value, setEmail)
                }
                error={emailError}
              />
              <InputMask name="birth" title="Birthdate" error={invalidBirth} />
            </InputContainer>
            <InputContainer isDesktop={isDesktop}>
              <InputMask
                name="document"
                type="9d"
                title="NIF"
                error={invalidDocument}
              />
              {gender !== '' ? (
                <Select
                  title="Gender"
                  placeholder="Pick your gender"
                  setValue={setGender}
                  defaultValue={{ label: gender, value: gender }}
                  customWidth={221}
                  data={genderData}
                  error={invalidGender}
                />
              ) : (
                <Select
                  title="Gender"
                  placeholder="Pick your gender"
                  setValue={setGender}
                  customWidth={221}
                  data={genderData}
                  error={invalidGender}
                />
              )}
            </InputContainer>
            <InputContainer isDesktop={isDesktop}>
              <InputMask
                name="cellphone"
                type="phone"
                title="Phone"
                error={invalidPhone}
              />
              {/* <InputMask
                name="verification_code"
                mask="99 99 99"
                placeholder="00 00 00"
                title="Código de validação por e-mail"
                error={invalidMailCode}
              /> */}
            </InputContainer>
            <Button
              onClick={() => {}}
              color="#1DC167"
              shadowColor="#17A75B"
              style={{ width: 221 }}
              type="submit"
            >
              <b>Save</b>
            </Button>
          </InfoContainer>
          <InfoContainer
            onSubmit={() => {}}
            style={isDesktop ? { width: 274 } : { height: 471, marginTop: 30 }}
            isDesktop={isDesktop}
          >
            <SectionTitle>
              <strong>Password</strong>
              <small>Validation by e-mail</small>
            </SectionTitle>

            <Input
              name="password"
              title="Password"
              placeholder="Set your password"
              style={{ marginTop: 20 }}
              type="password"
            />
            <Input
              name="repeatPassword"
              title="Confirm Password"
              placeholder="Confirm your password"
              style={{ marginTop: 20 }}
              type="password"
            />
            <InputMask
              name="passwordMailCode"
              mask="99 99 99"
              placeholder="00 00 00"
              title="Validation Code"
              style={{ marginTop: 20 }}
            />

            <Button
              onClick={() => {}}
              color="#1DC167"
              shadowColor="#17A75B"
              style={{ width: 221, marginTop: 93 }}
            >
              <b>Save</b>
            </Button>
          </InfoContainer>
        </Content>
      </Container>
      <div style={{ width: 840, height: 320 }} />
    </>
  );
}
