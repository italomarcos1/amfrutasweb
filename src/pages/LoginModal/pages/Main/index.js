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
} from '~/store/modules/auth/actions';
import { addFavorites, pushToCart } from '~/store/modules/cart/actions';
import { populateAddresses } from '~/store/modules/addresses/actions';

import lock from '~/assets/lock.svg';

export default function Main({ setPage }) {
  const dispatch = useDispatch();
  const uuid = useSelector(state => state.auth.uuid);

  const [toastVisible, setToastVisible] = useState(false);
  const [loginError, setLoginError] = useState(false);

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

  const handleFbLogin = useCallback(
    async response => {
      try {
        dispatch(loginLoading());

        const { userID, accessToken } = response;

        const fbResponse = await backend.post('/auth/facebook', {
          token: accessToken,
          userID,
          uuid,
        });

        const { token, user, cart } = fbResponse.data.data;

        backend.defaults.headers.Authorization = `Bearer ${token}`;

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
    [uuid, dispatch]
  );

  const handleAppleLogin = useCallback(response => {
    console.log(response);
  }, []);

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
        callback={handleFbLogin}
        fields="name,email"
        render={({ onClick }) => (
          <Button onClick={onClick} color="#4267b2" shadowColor="#32549d">
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
        render={({ onClick }) => (
          <Button onClick={onClick} color="#000" shadowColor="#9c9c9c">
            Iniciar sessão com&nbsp;<b>Apple</b>
          </Button>
        )}
      />
      <SecureLogin>
        Secure <img src={lock} alt="Lock" /> Login
      </SecureLogin>
      {toastVisible && (
        <Toast
          status="Não foi possível fazer login com Facebook, realize o login com seu email e senha."
          color="#f56060"
        />
      )}
    </>
  );
}

Main.propTypes = {
  setPage: PropTypes.func.isRequired,
};
