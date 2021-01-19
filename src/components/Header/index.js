import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useScrollYPosition } from 'react-use-scroll-position';
import { useMediaQuery } from 'react-responsive';
import { differenceInHours, differenceInMinutes, parseISO } from 'date-fns';

import { useSelector } from 'react-redux';

import {
  Header,
  HeaderContent,
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

import Logo from '~/assets/amfrutas-top.svg';
import fruits1 from '~/assets/fruits-1@2x.png';
import fruits2 from '~/assets/fruits-2@2x.png';

import logo from '~/assets/amfrutas-white.svg';

import home from '~/assets/home.svg';
import menu from '~/assets/menu.svg';
import search from '~/assets/search.svg';
import bag from '~/assets/bag.svg';
import user from '~/assets/user-check.svg';

import backend from '~/services/api';

export default function PageHeader({ login, active }) {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });
  const [selectedPage, setSelectedPage] = useState(active);

  const signed = useSelector(state => state.auth.signed);
  const products = useSelector(state => state.cart.products);
  const price = useSelector(state => state.cart.price);

  const history = useHistory();
  const { pathname } = useLocation();

  const scrollY = useScrollYPosition();

  const [headerFixed, setHeaderFixed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [headerAlertMessage, setHeaderAlertMessage] = useState(
    'Bem-vindo ao AM Frutas'
  );

  const [menuItems, setMenuItems] = useState([
    'Lojas e Contatos',
    'Produtos',
    'Promoções da Semana',
    'Informações',
    'Dicas e Receitas',
  ]);

  const loadMenu = useCallback(async () => {
    const keys = ['alert_message'];

    console.log('req');

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
    const menuDataWithTtl = { ttl: new Date(), data };

    localStorage.setItem('@AMFrutas:Menu', JSON.stringify(menuDataWithTtl));

    setLoading(false);
  }, []);

  useEffect(() => {
    const hasMenuData = localStorage.getItem('@AMFrutas:Menu');
    if (!!hasMenuData) {
      const { ttl, data } = JSON.parse(hasMenuData);

      const currentDate = new Date();
      console.log(parseISO(ttl));
      console.log(currentDate);
      console.log(differenceInMinutes(currentDate, parseISO(ttl)));

      // if (!(differenceInHours(currentDate, parseISO(ttl)) > 23)) {
      setMenuItems(data);
      if (!(differenceInMinutes(currentDate, parseISO(ttl)) > 1)) {
        setLoading(false);

        return;
      }
    }
    loadMenu();
  }, [loadMenu]);

  useEffect(() => {
    if (scrollY >= 71) {
      setHeaderFixed(true);
    } else {
      setHeaderFixed(false);
    }
  }, [scrollY]);

  useEffect(() => {
    console.log(menuItems);
  }, [menuItems]);

  return (
    <>
      <Header>
        <HeaderContent isDesktop={isDesktop}>
          {isDesktop && (
            <img
              src={fruits1}
              alt="Fruits"
              style={{
                marginTop: 10,
              }}
            />
          )}
          <Link to="/" style={{ marginLeft: 20, marginRight: 20 }}>
            <img src={Logo} alt="Logo" />
          </Link>
          {isDesktop && (
            <img
              src={fruits2}
              alt="Fruits"
              style={{
                marginTop: 10,
              }}
            />
          )}
        </HeaderContent>
      </Header>
      <Menu style={headerFixed ? { position: 'fixed', top: 0 } : {}}>
        <MenuContent isDesktop={isDesktop}>
          {!isDesktop && (
            <MenuItemButton
              onClick={() => {
                setSelectedPage('none');
                history.push('/menu');
              }}
            >
              <img src={menu} alt="search" />
            </MenuItemButton>
          )}
          <MenuItem selected={pathname === '/'} to="/">
            <img src={home} alt="home" />
          </MenuItem>

          {!loading &&
            isDesktop &&
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
              >
                {name}
              </MenuItem>
            ))}

          <MenuItemButton
            selected={selectedPage === 'Busca'}
            onClick={() => {
              setSelectedPage('Busca');
              history.push('/produtos');
            }}
          >
            <img src={search} alt="search" />
          </MenuItemButton>
          <MenuItemButton
            selected={selectedPage === 'Perfil'}
            onClick={() => {
              if (signed) history.push('/painel');
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
              history.push('/cesto');
            }}
          >
            <BadgeContainer>
              <MenuItemButton
                selected={selectedPage === 'Cesto'}
                onClick={() => {
                  setSelectedPage('Cesto');
                  history.push('/cesto');
                }}
              >
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
        isDesktop={isDesktop}
        style={headerFixed ? { position: 'fixed', top: 41 } : {}}
      >
        {headerAlertMessage}
      </SubTitle>
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
