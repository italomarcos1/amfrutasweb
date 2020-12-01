import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useScrollYPosition } from 'react-use-scroll-position';

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
} from './styles';

import Logo from '~/assets/amfrutas-top.svg';
import fruits1 from '~/assets/fruits-1@2x.png';
import fruits2 from '~/assets/fruits-2@2x.png';

import home from '~/assets/home.svg';
import search from '~/assets/search.svg';
import bag from '~/assets/bag.svg';
import user from '~/assets/user-check.svg';

import backend from '~/services/api';

export default function PageHeader({ login, active }) {
  const [selectedPage, setSelectedPage] = useState(active);

  const signed = useSelector(state => state.auth.signed);
  const products = useSelector(state => state.cart.products);
  const price = useSelector(state => state.cart.price);

  const history = useHistory();
  const { pathname } = useLocation();

  const scrollY = useScrollYPosition();

  const [headerFixed, setHeaderFixed] = useState(false);
  const [loading, setLoading] = useState(true);

  const [menuItems, setMenuItems] = useState([
    'Lojas e Contatos',
    'Produtos',
    'Promoções da Semana',
    'Informações',
    'Dicas e Receitas',
  ]);

  // retirar o dominio 'am sandbox' dos produtos

  const loadMenu = useCallback(async () => {
    const {
      data: { data },
    } = await backend.get('/menus/links/3');

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
      <Header>
        <HeaderContent>
          <img
            src={fruits1}
            alt="Fruits"
            style={{
              marginTop: 10,
            }}
          />
          <Link to="/" style={{ marginLeft: 20, marginRight: 20 }}>
            <img src={Logo} alt="Logo" />
          </Link>
          <img
            src={fruits2}
            alt="Fruits"
            style={{
              marginTop: 10,
            }}
          />
        </HeaderContent>
      </Header>
      <Menu style={headerFixed ? { position: 'fixed', top: 0 } : {}}>
        <MenuContent>
          <MenuItem selected={pathname === '/'} to="/">
            <img src={home} alt="home" />
          </MenuItem>

          {!loading &&
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
      <SubTitle style={headerFixed ? { position: 'fixed', top: 41 } : {}}>
        GARANTIMOS A MÁXIMA QUALIDADE DE TODOS OS PRODUTOS | COVID-19 -
        REALIZAMOS TESTES PERIODICAMENTE E SEGUIMOS
        <br /> AS NORMAS DE PREVENÇÃO DA D.G.S | SE NÃO FICAR SATISFEITO
        DEVOLVEMOS O SEU DINHEIRO
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
