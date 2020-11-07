import React, { useState } from 'react';

import {
  InfoContainer,
  Receive,
  StartDate,
  Options,
  ReceiveContainer,
  StartStop,
  CheckoutDetails,
  CheckoutItem,
  Title,
  FirstProducts,
  ProductsContainer,
} from './styles';

import Item from '~/components/Item';
import Select from '~/components/NoTitleSelect';
import MyAddress from './components/MyAddress';
import DeliveryContainer from './components/DeliveryContainer';

import items from '~/data';

import checked from '~/assets/checked.svg';

import cashback from '~/assets/myAccount/cashback.svg';
import orders from '~/assets/myAccount/orders.svg';
import delivery from '~/assets/myAccount/delivery.svg';
import cards from '~/assets/myAccount/cards.svg';
import minus from '~/assets/icons/minus.svg';
import plus from '~/assets/icons/plus.svg';

export default function PeriodicDelivery() {
  const [amount, setAmount] = useState(4);
  const [selected, setSelected] = useState('start');

  return (
    <>
      <InfoContainer>
        <DeliveryContainer />
      </InfoContainer>
      <Receive>
        <ReceiveContainer>
          <small>Receber a cada</small>
          <Options>
            <button
              type="button"
              disabled={amount === 0}
              onClick={() => setAmount(amount - 1)}
              style={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <img src={minus} alt="icon" />
            </button>
            <strong>{amount}</strong>
            <button
              type="button"
              onClick={() => setAmount(amount + 1)}
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              <img src={plus} alt="icon" />
            </button>
          </Options>
          semanas
        </ReceiveContainer>
        <StartDate>
          <strong>Início</strong>
          <Select placeholder="00/00/0000" setValue={() => {}} />
        </StartDate>
        <ReceiveContainer>
          <StartStop
            selected={selected === 'start'}
            style={{ marginRight: 30 }}
          >
            <button type="button" onClick={() => setSelected('start')}>
              <img src={checked} alt="Item selecionado" />
            </button>
            <strong>Iniciar</strong>
          </StartStop>
          <StartStop selected={selected === 'stop'}>
            <button type="button" onClick={() => setSelected('stop')}>
              <img src={checked} alt="Item selecionado" />
            </button>
            <strong>Parar</strong>
          </StartStop>
        </ReceiveContainer>
      </Receive>
      <ProductsContainer>
        <FirstProducts>
          <Item item={items[0]} />
          <Item item={items[0]} />
        </FirstProducts>

        <CheckoutDetails>
          <Title>Resumo</Title>
          <CheckoutItem>
            <h1>Produtos</h1>
            <h2>€ 179,14</h2>
          </CheckoutItem>
          <CheckoutItem>
            <h1>Economizou</h1>
            <h2>€ 22,09</h2>
          </CheckoutItem>
          <CheckoutItem>
            <h1>Crédito Disponível</h1>
            <h2 style={{ color: '#0CB68B' }}>€ 5,12</h2>
          </CheckoutItem>
          <CheckoutItem>
            <h2>Total</h2>
            <h2 style={{ fontSize: 25, color: '#0CB68B' }}>174,62</h2>
          </CheckoutItem>
        </CheckoutDetails>
      </ProductsContainer>
      <ProductsContainer>
        <Item item={items[0]} />
        <Item item={items[0]} />
      </ProductsContainer>
      <ProductsContainer>
        <Item item={items[0]} />
        <Item item={items[0]} />
      </ProductsContainer>
      <div style={{ width: 840, height: 120 }} />
    </>
  );
}
