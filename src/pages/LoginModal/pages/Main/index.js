import React, { useCallback } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import PropTypes from 'prop-types';
import AppleLogin from 'react-apple-login';

import { Button, SecureLogin, Title } from '~/components/LoginModal';

import lock from '~/assets/lock.svg';

export default function Main({ setPage }) {
  const handleLogin = useCallback(response => {}, []);

  const handleAppleLogin = useCallback(response => {
    console.log(response);
  }, []);
  // const onAppleButtonPress = useCallback(async () => {
  //   if (appleAuth.isSupported) {
  //     const appleAuthRequestResponse = await appleAuth.performRequest({
  //       requestedOperation: AppleAuthRequestOperation.LOGIN,
  //       requestedScopes: [
  //         AppleAuthRequestScope.EMAIL,
  //         AppleAuthRequestScope.FULL_NAME,
  //       ],
  //     });

  //     const credentialState = await appleAuth.getCredentialStateForUser(
  //       appleAuthRequestResponse.user
  //     );

  //     if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
  //       api
  //         .post('auth/apple', appleAuthRequestResponse)
  //         .then(response => {
  //           const { token, user } = response.data.data;
  //           api.defaults.headers.Authorization = `Bearer ${token}`;
  //           dispatch(signInSuccess(token, user));

  //           setTimeout(function () {
  //             navigation.goBack();
  //           }, 100);
  //         })
  //         .catch(() => {
  //           Toast.show('Erro ao logar com Apple. Logue com seu e-mail.');
  //         });
  //     } else
  //       Toast.show('Não foi possível fazer login, utilize seu email e senha.');
  //   } else {
  //     Toast.show('Seu dispositivo não tem suporte para esta funcionalidade.');
  //   }
  // }, [dispatch]);

  // useEffect(() => {
  //   if (appleAuth.isSupported) return appleAuth.onCredentialRevoked(() => {});
  // }, []);

  return (
    <>
      <Title>
        INICIA SESSÃO PARA UMA
        <br />
        <b>EXPERIÊNCIA PERSONALIZADA</b>
      </Title>
      <Button
        onClick={() => setPage('login')}
        style={{ marginTop: 95 }}
        color="#2CBDD3"
        shadowColor="#26A5BB"
      >
        Iniciar sessão com&nbsp;<b>E-mail</b>
      </Button>
      <FacebookLogin
        appId="314220626404166"
        callback={handleLogin}
        fields="name,email"
        render={({ onClick }) => (
          <Button onClick={onClick} color="#4267b2" shadowColor="#32549d">
            Iniciar sessão com&nbsp;<b>Facebook</b>
          </Button>
        )}
      />

      <AppleLogin
        clientId="com.tgoo.amfrutas"
        redirectURI="https://amfrutas.pt/"
        scope="email"
        responseType="id_token"
        usePopup
        callback={handleAppleLogin}
        render={({ onClick }) => (
          <Button onClick={onClick} color="#000" shadowColor="#9c9c9c">
            Iniciar sessão com&nbsp;<b>Apple</b>
          </Button>
        )}
      />
      <SecureLogin>
        Secure <img src={lock} alt="Lock" /> Login
      </SecureLogin>
    </>
  );
}

Main.propTypes = {
  setPage: PropTypes.func.isRequired,
};
