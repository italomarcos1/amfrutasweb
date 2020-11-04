import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Header,
  HeaderContent,
  Menu,
  MenuContent,
  MenuItem,
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

export default function PageHeader({ login }) {
  const [selectedPage, setSelectedPage] = useState('Principal');

  useEffect(() => {
    function stickHeader() {
      const header = document.getElementById('header');
      const sticky = header.offsetTop;
      console.log('ah');
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }

    stickHeader();
  }, []);

  return (
    <>
      <Header id="header">
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
      <Menu>
        <MenuContent>
          <MenuItem
            selected={selectedPage === 'Principal'}
            onClick={() => setSelectedPage('Principal')}
          >
            <img src={home} alt="home" />
          </MenuItem>
          <MenuItem
            selected={selectedPage === 'Lojas'}
            onClick={() => setSelectedPage('Lojas')}
          >
            Lojas e Contatos
          </MenuItem>
          <MenuItem
            selected={selectedPage === 'Produtos'}
            onClick={() => setSelectedPage('Produtos')}
          >
            Produtos
          </MenuItem>
          <MenuItem
            selected={selectedPage === 'Promoções'}
            onClick={() => setSelectedPage('Promoções')}
          >
            Promoções da Semana
          </MenuItem>
          <MenuItem
            selected={selectedPage === 'Informações'}
            onClick={() => setSelectedPage('Informações')}
          >
            Informações
          </MenuItem>
          <MenuItem
            selected={selectedPage === 'Dicas'}
            onClick={() => setSelectedPage('Dicas')}
          >
            Dicas e Receitas
          </MenuItem>
          <MenuItem
            selected={selectedPage === 'Busca'}
            onClick={() => setSelectedPage('Busca')}
          >
            <img src={search} alt="search" />
          </MenuItem>
          <MenuItem
            selected={selectedPage === 'Perfil'}
            onClick={() => {
              login();
              setSelectedPage('Perfil');
            }}
          >
            <img src={user} alt="user" />
          </MenuItem>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BadgeContainer>
              <MenuItem
                selected={selectedPage === 'Cesto'}
                onClick={() => setSelectedPage('Cesto')}
              >
                <img src={bag} alt="bag" />
              </MenuItem>
              <Badge>02</Badge>
            </BadgeContainer>
            <Price>&euro; 45,00</Price>
          </div>
        </MenuContent>
      </Menu>
      <SubTitle>
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
};
