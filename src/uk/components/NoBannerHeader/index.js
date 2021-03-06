import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { useScrollYPosition } from 'react-use-scroll-position';
import { useMediaQuery } from 'react-responsive';

import { Translate } from 'react-auto-translate';

import { useSelector } from 'react-redux';

import {
  Menu,
  MenuContent,
  MenuItem,
  MenuItemButton,
  Price,
  Badge,
  BadgeContainer,
  SubTitle,
  GoToCartContainer,
  Background,
  MenuMobile,
} from './styles';

import home from '~/assets/home.svg';
import menu from '~/assets/menu.svg';
import search from '~/assets/search.svg';
import bag from '~/assets/bag.svg';
import user from '~/assets/userCheck.svg';

import logo from '~/assets/amfrutas-white.svg';

import backend from '~/services/api';

export default function PageHeader({ login, active }) {
  const [selectedPage, setSelectedPage] = useState(active);

  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const signed = useSelector(state => state.auth.signed);
  const products = useSelector(state => state.cart.products);
  const price = useSelector(state => state.cart.price);

  const history = useHistory();
  const { pathname } = useLocation();

  const scrollY = useScrollYPosition();

  const [loading, setLoading] = useState(true);

  const [headerFixed, setHeaderFixed] = useState(false);
  const [headerAlertMessage, setHeaderAlertMessage] = useState(
    'Welcome to AM Frutas'
  );

  const [menuItems, setMenuItems] = useState([
    'Stores',
    'Products',
    'Promotions',
    'Info',
    'Tips and Recipes',
  ]);

  const loadMenu = useCallback(async () => {
    const keys = ['alert_message'];

    const [links, alertMessage] = await Promise.all([
      backend.get('/menus/links/3'),
      backend.get('configurations', { keys }),
    ]);

    const {
      data: { data },
    } = links;

    const {
      data: { data: alert },
    } = alertMessage;

    setHeaderAlertMessage(alert.alert_message);

    data.splice(0, 1);
    setMenuItems(data);
    setLoading(false);
  }, []);

  useEffect(() => loadMenu(), []);

  useEffect(() => {
    if (scrollY >= 71) {
      setHeaderFixed(true);
    } else {
      setHeaderFixed(false);
    }
  }, [scrollY]);

  return (
    <>
      <Menu style={headerFixed ? { position: 'fixed', top: 0 } : {}}>
        <MenuContent isDesktop={isDesktop}>
          {!isDesktop && (
            <MenuItemButton
              onClick={() => {
                setSelectedPage('none');
                history.push('/menu/uk');
              }}
            >
              <img src={menu} alt="search" />
            </MenuItemButton>
          )}
          <MenuItem selected={pathname === '/uk'} to="/uk">
            <img src={home} alt="home" />
          </MenuItem>

          {!loading &&
            isDesktop &&
            menuItems.map(({ id, name, url }) => (
              <MenuItem key={id} selected={pathname === `${url}`} to={`${url}`}>
                <Translate>{name}</Translate>
              </MenuItem>
            ))}

          <MenuItemButton
            selected={selectedPage === 'Busca'}
            onClick={() => {
              setSelectedPage('Busca');
              history.push('/products');
            }}
          >
            <img src={search} alt="search" />
          </MenuItemButton>
          <MenuItemButton
            selected={selectedPage === 'Perfil'}
            onClick={() => {
              if (signed) history.push('/dashboard');
              else {
                login();
                setSelectedPage('Perfil');
              }
            }}
          >
            <img src={user} alt="user" />
          </MenuItemButton>
          <GoToCartContainer
            onClick={() => {
              setSelectedPage('Cesto');
              history.push('/basket');
            }}
          >
            <BadgeContainer>
              <MenuItemButton selected={selectedPage === 'Cesto'}>
                <img src={bag} alt="bag" />
              </MenuItemButton>
              <Badge>
                {products.length < 10 ? `0${products.length}` : products.length}
              </Badge>
            </BadgeContainer>
            <Price>€&nbsp;{price}</Price>
          </GoToCartContainer>
        </MenuContent>
      </Menu>
      <SubTitle
        style={headerFixed ? { position: 'fixed', top: 41 } : {}}
        isDesktop={isDesktop}
      >
        <Translate>{headerAlertMessage}</Translate>
      </SubTitle>
      {selectedPage === 'Menu' && (
        <Background onClick={() => setSelectedPage('none')}>
          <MenuMobile>
            <img
              src={logo}
              alt="Logo"
              style={{
                width: 196,
                height: 43,
                marginTop: 20,
                marginBottom: 40,
              }}
            />

            {!loading &&
              !isDesktop &&
              menuItems.map(({ id, name, url }) => (
                <MenuItem
                  key={id}
                  selected={pathname === `${url}`}
                  to={{
                    pathname: `${url}`,
                    state: {
                      id: url,
                    },
                  }}
                  style={{ width: '100%' }}
                  isDesktop={isDesktop}
                >
                  <Translate>{name}</Translate>
                </MenuItem>
              ))}
            {!loading && (
              <MenuItem
                to="/uk"
                style={{
                  width: '100%',
                  marginTop: 60,
                  textAlign: 'center',
                  justifyContent: 'center',
                }}
                isDesktop={isDesktop}
              >
                <strong>Close menu</strong>
              </MenuItem>
            )}
          </MenuMobile>
        </Background>
      )}
    </>
  );
}

PageHeader.propTypes = {
  login: PropTypes.func.isRequired,
  active: PropTypes.string,
};

PageHeader.defaultProps = {
  active: 'Principal',
};
