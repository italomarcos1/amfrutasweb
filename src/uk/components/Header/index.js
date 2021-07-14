import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useScrollYPosition } from 'react-use-scroll-position';
import { useMediaQuery } from 'react-responsive';

import { Translate } from 'react-auto-translate';

import { useDispatch, useSelector } from 'react-redux';

import { useQuery } from 'react-query';
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
  Flag,
  PtFlag,
  FlagContainer,
} from './styles';

import Logo from '~/assets/amfrutas-top.svg';
import fruits1 from '~/assets/fruits-1@2x.png';
import fruits2 from '~/assets/fruits-2@2x.png';

import logo from '~/assets/amfrutas-white.svg';

import home from '~/assets/home.svg';
import menu from '~/assets/menu.svg';
import search from '~/assets/search.svg';
import bag from '~/assets/bag.svg';
import user from '~/assets/userCheck.svg';
import ptFlag from '~/assets/icons/pt.png';
import ukFlag from '~/assets/icons/uk.png';

import backend from '~/services/api';

import { enablePt, disablePt } from '~/store/modules/user/actions';

export default function PageHeader({ login, active }) {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });
  const [selectedPage, setSelectedPage] = useState(active);

  const signed = useSelector(state => state.auth.signed);
  const products = useSelector(state => state.cart.products);
  const price = useSelector(state => state.cart.price);

  const ptEnabled = useSelector(state => state.user.ptEnabled);

  const dispatch = useDispatch();

  const history = useHistory();
  const { pathname } = useLocation();

  const scrollY = useScrollYPosition();

  const [headerFixed, setHeaderFixed] = useState(false);

  const loadMenu = useCallback(async () => {
    const {
      data: { data: menuData },
    } = await backend.get('/menus/links/3');

    menuData.splice(0, 1);

    return menuData;
  }, []);

  const loadAlert = useCallback(async () => {
    const {
      data: {
        data: { alert_message: alert },
      },
    } = await backend.get('configurations?keys=alert_message');

    return alert;
  }, []);

  const { data: menuItems, isLoading: loading } = useQuery(
    'headerMenu',
    loadMenu,
    {
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    }
  );

  const { data: alert, isLoading: alertLoading } = useQuery(
    'alertMessage',
    loadAlert,
    {
      staleTime: 1000 * 60 * 60 * 10, // 10 hours
    }
  );

  useEffect(() => {
    if (scrollY >= 71) {
      setHeaderFixed(true);
    } else {
      setHeaderFixed(false);
    }
  }, [scrollY]);

  return (
    <>
      <Header>
        <HeaderContent isDesktop={isDesktop}>
          <FlagContainer>
            <Flag
              active={ptEnabled}
              onClick={() => {
                if (ptEnabled) return;

                dispatch(enablePt());
                history.push('/');
              }}
            >
              <img src={ptFlag} alt="Enable PT" />
            </Flag>
            <PtFlag
              active={!ptEnabled}
              onClick={() => {
                if (!ptEnabled) return;

                dispatch(disablePt());
                history.push('/uk');
              }}
            >
              <img src={ukFlag} alt="Enable EN" />
            </PtFlag>
          </FlagContainer>
          {isDesktop && (
            <img
              src={fruits1}
              alt="Fruits"
              style={{
                marginTop: 10,
              }}
            />
          )}
          <Link to="/uk" style={{ marginLeft: 20, marginRight: 20 }}>
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
              <MenuItemButton
                selected={selectedPage === 'Cesto'}
                onClick={() => {
                  setSelectedPage('Cesto');
                  history.push('/basket');
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
        <Translate>{!alertLoading && alert}</Translate>
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
