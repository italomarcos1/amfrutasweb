import React from 'react';
import { useHistory } from 'react-router-dom';

import { InfoContainer, DeliveryAndCardsContainer } from './styles';

import Info from './components/Info';
import MyAddress from './components/MyAddress';
import MyAccount from './components/MyAccount';

import cashback from '~/assets/myAccount/cashback.svg';
import orders from '~/assets/myAccount/orders.svg';
import delivery from '~/assets/myAccount/delivery.svg';
import cards from '~/assets/myAccount/cards.svg';

export default function ControlPanel() {
  const history = useHistory();

  return (
    <>
      <InfoContainer>
        <Info
          icon={cashback}
          alt="Crédito disponível"
          title="€ 2,78"
          subTitle="Cashback - Crédito disponível"
          titleStyle={{ color: '#0CB68B' }}
          noButton={false}
        />
        <Info
          icon={orders}
          alt="Encomendas"
          title="As minhas encomendas"
          subTitle="Você não tem pedidos em andamento"
          onClick={() => history.push('/encomendas')}
        />
      </InfoContainer>
      <InfoContainer>
        <MyAddress />
        <DeliveryAndCardsContainer>
          <Info
            icon={delivery}
            alt="Entrega"
            title="Minhas entregas periódicas"
            titleStyle={{ fontSize: 20.5 }}
            subTitle="Você não tem pedidos em andamento"
            onClick={() => history.push('/entregas')}
          />
          <Info
            icon={cards}
            alt="Seus cartões"
            title="Os meus cartões"
            subTitle="1 cartão vinculado"
          />
        </DeliveryAndCardsContainer>
      </InfoContainer>
      <InfoContainer>
        <MyAccount />
      </InfoContainer>
      <div style={{ width: 840, height: 300 }} />
    </>
  );
}
