import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import PropTypes from 'prop-types';

import { Container, Content, Menu, Option } from './styles';

import Header from '~/uk/components/NoBannerHeader';
import { Button } from '~/uk/components/LoginModal';

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

  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const [active, setActive] = useState(pathname);

  const profile = useSelector(state => state.user.profile);

  useEffect(() => {
    dispatch(cancelFirstLogin());
    setActive(pathname);
  }, [pathname, dispatch]);

  const handleSignOut = useCallback(() => {
    dispatch(signOut());
    history.push('/uk');
  }, [dispatch, history]);

  return (
    <>
      <Header />
      <Container isDesktop={isDesktop}>
        <Content isDesktop={isDesktop}>
          <Menu isDesktop={isDesktop}>
            <strong>
              Hi,&nbsp;<b>{!!profile ? profile.name : 'Customer'}</b>
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
                onClick={() => history.push('/dashboard')}
                active={active === '/dashboard'}
              >
                <img
                  src={active === '/dashboard' ? controlPanel : controlPanelOff}
                  alt=""
                />
                <strong>Dashboard</strong>
              </Option>

              <Option
                onClick={() => history.push('/account')}
                active={active === '/account'}
              >
                <img
                  src={active === '/account' ? myAccountIcon : myAccountIconOff}
                  alt=""
                  style={{ width: 22, height: 18 }}
                />
                <strong>My Account</strong>
              </Option>
              <Option
                onClick={() => history.push('/orders')}
                active={active === '/orders'}
              >
                <img
                  src={active === '/orders' ? myOrdersIcon : myOrdersIconOff}
                  alt=""
                  style={{ width: 16.7, height: 18.5 }}
                />
                <strong>My Orders</strong>
              </Option>
              <Option
                onClick={() => history.push('/deliveries')}
                active={active === '/deliveries'}
              >
                <img
                  src={
                    active === '/deliveries' ? deliveryIcon : deliveryIconOff
                  }
                  alt=""
                  style={{ width: 24.5, height: 22 }}
                />
                <strong>Periodic Delivery</strong>
              </Option>
              <Option
                onClick={() => history.push('/address')}
                active={active === '/address'}
              >
                <img
                  src={active === '/address' ? addressIcon : addressIconOff}
                  alt=""
                  style={{ width: 15.6, height: 21 }}
                />
                <strong>My Address</strong>
              </Option>
              <Option
                onClick={() => history.push('/favorites')}
                active={active === '/favorites'}
              >
                <img
                  src={active === '/favorites' ? myFavorites : myFavoritesOff}
                  alt=""
                  style={{ width: 18, height: 16.5 }}
                />
                <strong>My Favorites</strong>
              </Option>
            </div>
            <Button
              color="#f53030"
              shadowColor="#9c1e1e"
              style={{ width: 246, marginTop: 20, height: 55 }}
              onClick={handleSignOut}
            >
              <b>Logout</b>
            </Button>
          </Menu>
          <div
            style={
              isDesktop
                ? {
                    marginTop: 0,
                  }
                : {
                    width: '100%',
                    marginTop: 0,
                  }
            }
          >
            {children}
          </div>
        </Content>
      </Container>
    </>
  );
}

Account.propTypes = {
  children: PropTypes.element.isRequired,
};
