import React from 'react';
import PropTypes from 'prop-types';
// import { Container } from './styles';

import {
  Container,
  ItemPicture,
  Title,
  PriceAndAmount,
  ProductInfo,
} from './styles';

export default function Item({ item, index }) {
  const { id, picture, title, newPrice, amount } = item;

  return (
    <Container key={id} style={index > 1 ? { marginTop: 40 } : {}}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ItemPicture src={picture} />
        <ProductInfo>
          <Title>{title}</Title>
          <PriceAndAmount>
            <small>{amount} unidades</small>
            <strong>€&nbsp;{newPrice}</strong>
          </PriceAndAmount>
        </ProductInfo>
      </div>
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
  index: PropTypes.number.isRequired,
};
