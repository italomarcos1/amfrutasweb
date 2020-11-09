import React from 'react';
import PropTypes from 'prop-types';
// import { Container } from './styles';

import minus from '~/assets/icons/minus.svg';
import plus from '~/assets/icons/plus.svg';
import close from '~/assets/icons/close.svg';

import delivery from '~/assets/myAccount/delivery_white.svg';
import orders from '~/assets/myAccount/orders_white.svg';

import {
  Container,
  ItemPicture,
  Title,
  ProductInfo,
  Options,
  PriceAndAmount,
} from './styles';

export default function Item({ item }) {
  const { id, picture, title, newPrice, amount } = item;

  return (
    <Container key={id} style={id > 2 ? { marginTop: 20 } : {}}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ItemPicture src={picture} />
        <ProductInfo>
          <Title>{title}</Title>
          <PriceAndAmount>
            <small>{amount} unidades</small>
            <strong>€{newPrice}</strong>
          </PriceAndAmount>
        </ProductInfo>
      </div>
      <Options>
        <button type="button">
          <img src={delivery} alt="" />
          <small>Adicionar a entrega periódica</small>
        </button>
        <button
          type="button"
          style={{ width: 132, backgroundColor: '#29B4CC' }}
        >
          <img src={orders} alt="" style={{ width: 15, height: 15 }} />
          <small>Adicionar ao cesto</small>
        </button>
      </Options>
    </Container>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    picture: PropTypes.string,
    title: PropTypes.string,
    newPrice: PropTypes.string,
    amount: PropTypes.number,
  }).isRequired,
};
