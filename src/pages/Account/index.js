import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Content, Menu, Option } from './styles';

import Header from '~/components/NoBannerHeader';
import { Button } from '~/components/LoginModal';

import deliveryIcon from '~/assets/myAccount/entrega-periodica-on.svg';
import deliveryIconOff from '~/assets/myAccount/entrega-periodica-off.svg';

import addressIcon from '~/assets/myAccount/meu-endereco-on.svg';
import addressIconOff from '~/assets/myAccount/meu-endereco-off.svg';

import myAccountIcon from '~/assets/myAccount/minha-conta-on.svg';
import myAccountIconOff from '~/assets/myAccount/minha-conta-off.svg';

import myOrdersIcon from '~/assets/myAccount/minhas-encomendas-on.svg';
import myOrdersIconOff from '~/assets/myAccount/minhas-encomendas-off.svg';

import controlPanel from '~/assets/myAccount/painel-controlo-on.svg';
import controlPanelOff from '~/assets/myAccount/painel-controlo-off.svg';

import myFavorites from '~/assets/myAccount/meus-favoritos-on.svg';
import myFavoritesOff from '~/assets/myAccount/meus-favoritos-off.svg';

import { signOut, cancelFirstLogin } from '~/store/modules/auth/actions';

export default function Account({ children }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const [active, setActive] = useState(pathname);

  const profile = useSelector(state => state.user.profile);

  useEffect(() => {
    dispatch(cancelFirstLogin());
    setActive(pathname);
  }, [pathname, dispatch]);

  const handleSignOut = useCallback(() => {
    dispatch(signOut());
    history.push('/');
  }, [dispatch, history]);

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Menu>
            <strong>
              Olá,&nbsp;<b>{!!profile ? profile.name : 'Cliente'}</b>
            </strong>
            <div
              style={{
                marginTop: 26,
              }}
            >
              <Option
                style={{
                  borderTopStyle: 'solid',
                  borderTopWidth: 0.1,
                  borderTopColor: '#ccc',
                }}
                onClick={() => history.push('/painel')}
                active={active === '/painel'}
              >
                <img
                  src={active === '/painel' ? controlPanel : controlPanelOff}
                  alt=""
                />
                <strong>Painel de Controlo</strong>
              </Option>

              <Option
                onClick={() => history.push('/conta')}
                active={active === '/conta'}
              >
                <img
                  src={active === '/conta' ? myAccountIcon : myAccountIconOff}
                  alt=""
                  style={{ width: 22, height: 18 }}
                />
                <strong>Minha conta</strong>
              </Option>
              <Option
                onClick={() => history.push('/encomendas')}
                active={active === '/encomendas'}
              >
                <img
                  src={
                    active === '/encomendas' ? myOrdersIcon : myOrdersIconOff
                  }
                  alt=""
                  style={{ width: 16.7, height: 18.5 }}
                />
                <strong>Minhas encomendas</strong>
              </Option>
              <Option
                onClick={() => history.push('/entregas')}
                active={active === '/entregas'}
              >
                <img
                  src={active === '/entregas' ? deliveryIcon : deliveryIconOff}
                  alt=""
                  style={{ width: 24.5, height: 22 }}
                />
                <strong>Entrega periódica</strong>
              </Option>
              <Option
                onClick={() => history.push('/endereco')}
                active={active === '/endereco'}
              >
                <img
                  src={active === '/endereco' ? addressIcon : addressIconOff}
                  alt=""
                  style={{ width: 15.6, height: 21 }}
                />
                <strong>Meu endereço</strong>
              </Option>
              <Option
                onClick={() => history.push('/favoritos')}
                active={active === '/favoritos'}
              >
                <img
                  src={active === '/favoritos' ? myFavorites : myFavoritesOff}
                  alt=""
                  style={{ width: 18, height: 16.5 }}
                />
                <strong>Meus favoritos</strong>
              </Option>
            </div>
            <Button
              color="#f53030"
              shadowColor="#9c1e1e"
              style={{ width: 246, marginTop: 20, height: 55 }}
              onClick={handleSignOut}
            >
              <b>Sair do AMFrutas</b>
            </Button>
          </Menu>
          <div style={{ marginTop: 0 }}>{children}</div>
        </Content>
      </Container>
    </>
  );
}

Account.propTypes = {
  children: PropTypes.element.isRequired,
};
