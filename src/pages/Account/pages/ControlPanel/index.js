import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { InfoContainer, DeliveryAndCardsContainer } from './styles';

import Info from './components/Info';
import MyAddress from './components/MyAddress';
import MyAccount from './components/MyAccount';

import cashback from '~/assets/myAccount/cashback.svg';
import orders from '~/assets/myAccount/orders.svg';
import delivery from '~/assets/myAccount/delivery.svg';
import favorites from '~/assets/myAccount/favorites.svg';

export default function ControlPanel() {
  const history = useHistory();
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  return (
    <>
      <InfoContainer isDesktop={isDesktop}>
        <Info
          icon={cashback}
          alt="Crédito disponível"
          title="€ 2,78"
          subTitle="Cashback - Crédito disponível"
          titleStyle={{ color: '#0CB68B' }}
          imageStyle={{ width: '20%' }}
          noButton={false}
        />
        <Info
          icon={orders}
          alt="Encomendas"
          title="As minhas encomendas"
          titleStyle={isDesktop ? {} : { fontSize: 16, width: '100% ' }}
          imageStyle={{ width: '15%' }}
          subTitle="Você não tem pedidos em andamento"
          onClick={() => history.push('/encomendas')}
        />
      </InfoContainer>
      <InfoContainer isDesktop={isDesktop} style={{ backgroundColor: '#f90' }}>
        <MyAddress />
        <DeliveryAndCardsContainer
          isDesktop={isDesktop}
          style={{ backgroundColor: '#390' }}
        >
          <Info
            icon={delivery}
            alt="Entrega"
            title="Minhas entregas periódicas"
            titleStyle={isDesktop ? { fontSize: 20.5 } : { fontSize: 15 }}
            imageStyle={{ width: '20%' }}
            subTitle="Você não tem pedidos em andamento"
            onClick={() => history.push('/entregas')}
          />
          <Info
            icon={favorites}
            alt="Favoritos"
            title="Produtos favoritos"
            imageStyle={{ width: '19%' }}
            titleStyle={isDesktop ? {} : { fontSize: 18 }}
            subTitle="Adicione ao cesto de compras"
            onClick={() => history.push('/favoritos')}
          />
        </DeliveryAndCardsContainer>
      </InfoContainer>
      <InfoContainer isDesktop={isDesktop}>
        <MyAccount />
      </InfoContainer>
      {isDesktop && <div style={{ width: 840, height: 300 }} />}
    </>
  );
}
