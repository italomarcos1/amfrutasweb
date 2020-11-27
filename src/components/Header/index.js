import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
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

  const history = useHistory();
  const { pathname } = useLocation();

  const scrollY = useScrollYPosition();

  const [headerFixed, setHeaderFixed] = useState(false);

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
          <img
            src={Logo}
            alt="Logo"
            style={{
              marginLeft: 20,
              marginRight: 20,
            }}
          />
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

          {menuItems.map(({ id, name, url }) => (
            <MenuItem key={id} selected={pathname === `/${url}`} to={`${url}`}>
              {name}
            </MenuItem>
          ))}

          <MenuItemButton
            selected={selectedPage === 'Busca'}
            onClick={() => setSelectedPage('Busca')}
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BadgeContainer>
              <MenuItemButton
                selected={selectedPage === 'Cesto'}
                onClick={() => {
                  setSelectedPage('Cesto');
                  history.push('/produtos');
                }}
              >
                <img src={bag} alt="bag" />
              </MenuItemButton>
              <Badge>02</Badge>
            </BadgeContainer>
            <Price>€ 45,00</Price>
          </div>
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
