import React, { useCallback, useEffect, useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import AppleLogin from 'react-apple-login';

import backend from '~/services/api';

import { Button, SecureLogin, Title } from '~/components/LoginModal';
import Toast from '~/components/Toast';

import {
  signInSuccess,
  signFailure,
  loginLoading,
  loginLoadingError,
} from '~/store/modules/auth/actions';
import { addFavorites, pushToCart } from '~/store/modules/cart/actions';
import { populateAddresses } from '~/store/modules/addresses/actions';

import lock from '~/assets/lock.svg';

export default function Main({ setPage, isDesktop }) {
  const dispatch = useDispatch();
  const uuid = useSelector(state => state.auth.uuid);

  const [toastVisible, setToastVisible] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginPlatform, setLoginPlatform] = useState('Facebook');

  useEffect(() => {
    if (loginError) {
      setToastVisible(true);

      const timer = setTimeout(() => {
        setToastVisible(false);
        setLoginError(false);
      }, 2800);

      return () => {
        setToastVisible(false);
        setLoginError(false);
        clearTimeout(timer);
      };
    }
  }, [loginError]);

  const handleLogin = useCallback(
    async response => {
      try {
        const { token, user, cart } = response;

        backend.defaults.headers.Authorization = `Bearer ${token}`;

        backend.interceptors.request.use(async config => {
          config.headers.common.uuid = uuid;

          return config;
        });

        const {
          data: {
            meta: { message },
            data: favData,
          },
        } = await backend.get('clients/wishlists');

        if (message === 'Não há produtos favoritados.')
          dispatch(addFavorites([]));
        else dispatch(addFavorites(favData));

        if (!!cart) {
          const cartWithoutOptions = cart.products.map(c => {
            return {
              rowId: c.rowId,
              id: c.id,
              qty: c.qty,
              name: c.name,
              price: c.price,
              product: c.options.product,
            };
          });

          dispatch(pushToCart(cartWithoutOptions));
        }

        const addressesData = await backend.get('/clients/addresses');

        const {
          data: {
            data: addresses,
            meta: { message: addressesMessage },
          },
        } = addressesData;

        if (addressesMessage === 'Você ainda não tem endereços cadastrados.') {
          dispatch(populateAddresses([]));
        } else dispatch(populateAddresses([...addresses]));

        dispatch(signInSuccess(token, user));
      } catch {
        setLoginError(true);
        dispatch(signFailure());
      }
    },
    [dispatch, uuid]
  );

  const handleFbLogin = useCallback(
    async response => {
      try {
        setLoginPlatform('Facebook');
        dispatch(loginLoading());

        const { userID, accessToken } = response;

        const {
          data: { data },
        } = await backend.post('/auth/facebook', {
          token: accessToken,
          userID,
          uuid,
        });

        console.log(data);

        handleLogin(data);
      } catch (err) {
        console.log('pogchamp');
        console.log(err.response);
      } finally {
        dispatch(loginLoadingError());
      }
    },
    [dispatch, handleLogin, uuid]
  );

  const handleAppleLogin = useCallback(
    async appleAuthResponse => {
      try {
        setLoginPlatform('Apple');
        dispatch(loginLoading());

        const { authorization } = appleAuthResponse;

        let appleRequestData = {
          authorization,
          uuid,
        };

        console.log(!!appleAuthResponse.user);

        if (!!appleAuthResponse.user)
          appleRequestData = {
            ...appleRequestData,
            user: appleAuthResponse.user,
          };

        console.log(appleRequestData);

        const {
          data: { data },
        } = await backend.post('/auth/apple', appleRequestData);

        handleLogin(data);
      } catch (err) {
        console.log('pogcuck');
        console.log(err.response);
      } finally {
        dispatch(loginLoadingError());
      }
    },
    [handleLogin, dispatch, uuid]
  );

  return (
    <>
      <Title isDesktop={isDesktop}>
        INICIA SESSÃO PARA UMA
        <br />
        <b>EXPERIÊNCIA PERSONALIZADA</b>
      </Title>
      <Button
        onClick={() => setPage('login')}
        color="#2CBDD3"
        shadowColor="#26A5BB"
        style={
          isDesktop
            ? {
                width: 441,
                marginTop: 95,
              }
            : {
                width: '85%',
                marginTop: 45,
              }
        }
      >
        Iniciar sessão com&nbsp;<b>E-mail</b>
      </Button>
      <FacebookLogin
        appId="314220626404166"
        callback={handleFbLogin}
        fields="name,email"
        redirectUri="https://amfrutas.pt"
        isMobile={false}
        usePopup
        render={({ onClick }) => (
          <Button
            onClick={onClick}
            color="#4267b2"
            shadowColor="#32549d"
            style={isDesktop ? { width: 441 } : { width: '85%' }}
          >
            Iniciar sessão com&nbsp;<b>Facebook</b>
          </Button>
        )}
      />

      <AppleLogin
        clientId="com.tgoo.service.amfrutas"
        redirectURI="https://amfrutas.pt/cliente/apple/callback"
        scope="name email"
        responseType="code id_token"
        responseMode="form_post"
        callback={handleAppleLogin}
        usePopup
        render={({ onClick }) => (
          <Button
            onClick={onClick}
            color="#000"
            shadowColor="#9c9c9c"
            style={isDesktop ? { width: 441 } : { width: '85%' }}
          >
            Iniciar sessão com&nbsp;<b>Apple</b>
          </Button>
        )}
      />
      <SecureLogin isDesktop={isDesktop}>
        Secure <img src={lock} alt="Lock" /> Login
      </SecureLogin>
      {toastVisible && (
        <Toast
          status={`Não foi possível fazer login com ${loginPlatform}, realize o login com seu email e senha.`}
          color="#f56060"
        />
      )}
    </>
  );
}

Main.propTypes = {
  setPage: PropTypes.func.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};
