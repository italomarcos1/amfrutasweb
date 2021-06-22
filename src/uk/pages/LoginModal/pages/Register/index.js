import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FaSpinner } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';

import {
  Title,
  InputContainer,
  Button,
  SecureLogin,
} from '~/uk/components/LoginModal';

import { onlyValues } from '~/utils/onlyValues';

import Input from '~/uk/components/FormInput';
import InputMask from '~/uk/components/FormInputMask';
import Toast from '~/uk/components/Toast';

import { signInSuccess, cleanRegister } from '~/store/modules/auth/actions';

import lock from '~/assets/lock.svg';
import getValidationErrors from '~/utils/validationErrors';
import backend from '~/services/api';

export default function Register({ closeModal, isDesktop }) {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState(
    'O email informado já existe, faça login.'
  );

  const signed = useSelector(state => state.auth.signed);
  const loading = useSelector(state => state.auth.loading);
  const registerError = useSelector(state => state.auth.registerError);
  const sessionUuid = useSelector(state => state.auth.uuid);

  const dispatch = useDispatch();

  const formRef = useRef();
  const submitButtonRef = useRef();

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

  const handleLogin = useCallback(
    async data => {
      const response = await backend.post('auth/login', {
        uuid: sessionUuid,
        ...data,
      });

      const { token, user } = response.data.data;

      backend.defaults.headers.Authorization = `Bearer ${token}`;

      await backend.put('clients', {
        birth: data.birthday,
      });

      const updatedUser = { ...user, default_address: [] };

      dispatch(signInSuccess(token, updatedUser));
    },
    [dispatch, sessionUuid]
  );

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('O nome é obrigatório'),
          last_name: Yup.string().required('O apelido é obrigatório'),
          email: Yup.string().required().email('Informe um e-mail válido'),
          birthday: Yup.string()
            .min(10)
            .matches(/^[0-3][0-9]\/[0-1][0-9]\/[1-2][0|9][0-9][0-9]$/)
            .required(),
          password: Yup.string().min(6).required(),
          confirmPassword: Yup.string()
            .min(6)
            .when('password', (p, field) =>
              p ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });

        const mobileSchema = Yup.object().shape({
          full_name: Yup.string().required('O nome é obrigatório'),
          email: Yup.string().required().email('Informe um e-mail válido'),
          password: Yup.string().min(6).required(),
          confirmPassword: Yup.string()
            .min(6)
            .when('password', (p, field) =>
              p ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });

        if (isDesktop) {
          delete data.full_name;

          await schema.validate(data, { abortEarly: false });

          setToastVisible(false);

          delete data.confirmPassword;

          await handleLogin(data);

          return;
        }

        delete data.name;
        delete data.last_name;
        delete data.birthday;

        await mobileSchema.validate(data, { abortEarly: false });
        setToastVisible(false);

        const [currentName, ...restOfName] = data.full_name.split(' ');

        const currentLastName = restOfName.join(' ');

        delete data.confirmPassword;

        await handleLogin({
          ...data,
          name: currentName,
          last_name: currentLastName,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(data, err);

          formRef.current?.setErrors(errors);
          return;
        }

        const {
          meta: { message },
        } = err.response.data;
        if (message === 'Credenciais incorretas') {
          setToastMessage('This email is already taken, please log in.');
          setToastVisible(true);
        }
        if (message === 'Preencha com seu apelido!') {
          setToastMessage('Fill with your full name (name and last name)');
          setToastVisible(true);
          formRef.current.setFieldError('full_name', true);
        }
      }
    },
    [isDesktop, handleLogin]
  );

  return (
    <>
      <Title isDesktop={isDesktop}>
        CREATE YOUR
        <br />
        <b>ACCOUNT WITH AN E-MAIL ADDRESS</b>
      </Title>
      <Form
        onSubmit={handleSubmit}
        style={isDesktop ? {} : { width: '85%' }}
        ref={formRef}
      >
        <InputContainer
          isDesktop={isDesktop}
          style={isDesktop ? {} : { height: 53 }}
        >
          {isDesktop && (
            <>
              <Input
                name="name"
                title="Name"
                placeholder="Tell us your name"
                customWidth={isDesktop ? 221 : '100%'}
              />
              <Input
                name="last_name"
                title="Last name"
                placeholder="Tell us your last name"
                customWidth={isDesktop ? 221 : '100%'}
              />
            </>
          )}
          {!isDesktop && (
            <Input
              name="full_name"
              title="Full Name"
              placeholder="Tell is your full name"
              customWidth="100%"
            />
          )}
        </InputContainer>
        <InputContainer
          style={isDesktop ? { marginTop: 10 } : { marginTop: 10, height: 53 }}
          isDesktop={isDesktop}
        >
          <Input
            name="email"
            title="E-mail"
            placeholder="E-mail address"
            customWidth={isDesktop ? 221 : '100%'}
          />
          {isDesktop && (
            <InputMask
              name="birthday"
              title="Birthdate"
              placeholder="Your Birthdate"
              customWidth={isDesktop ? 221 : '100%'}
            />
          )}
        </InputContainer>
        <InputContainer isDesktop={isDesktop} style={{ marginTop: 10 }}>
          <Input
            name="password"
            title="Password"
            placeholder="Your password"
            type="password"
            customWidth={isDesktop ? 221 : '100%'}
          />
          <Input
            name="confirmPassword"
            title="Confirm Password"
            placeholder="Repeat your password"
            type="password"
            customWidth={isDesktop ? 221 : '100%'}
          />
          <button
            type="submit"
            ref={submitButtonRef}
            style={{ display: 'none' }}
          >
            submitButton
          </button>
        </InputContainer>
      </Form>

      <Button
        onClick={() => submitButtonRef.current.click()}
        color="#1DC167"
        shadowColor="#17A75B"
        style={isDesktop ? { marginTop: 47 } : { width: '85%', marginTop: 12 }}
      >
        {loading ? <FaSpinner color="#fff" size={20} /> : 'Create Account'}
      </Button>
      <SecureLogin style={isDesktop ? { marginTop: 48 } : { marginTop: 12 }}>
        Secure <img src={lock} alt="Lock" /> Login
      </SecureLogin>
      {toastVisible && <Toast status={toastMessage} color="#f56060" />}
    </>
  );
}

Register.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};
