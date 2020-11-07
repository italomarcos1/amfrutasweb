import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import {
  Menu,
  MenuContent,
  MenuItem,
  Price,
  Badge,
  BadgeContainer,
  SubTitle,
} from './styles';

import home from '~/assets/home.svg';
import search from '~/assets/search.svg';
import bag from '~/assets/bag.svg';
import user from '~/assets/user-check.svg';

export default function Header() {
  const [selectedPage, setSelectedPage] = useState('Principal');

  const history = useHistory();

  return (
    <>
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
            onClick={() => history.push('/conta')}
          >
            <img src={user} alt="user" />
          </MenuItem>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BadgeContainer>
              <MenuItem
                selected={selectedPage === 'Cesto'}
                onClick={() => {
                  setSelectedPage('Cesto');
                  history.push('/cesto');
                }}
              >
                <img src={bag} alt="bag" />
              </MenuItem>
              <Badge>02</Badge>
            </BadgeContainer>
            <Price>€ 45,00</Price>
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
