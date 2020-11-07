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

export default function Item({ item }) {
  const { id, picture, title, newPrice, amount } = item;

  return (
    <Container key={id} style={id > 2 ? { marginTop: 40 } : {}}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ItemPicture src={picture} />
        <ProductInfo>
          <Title>{title}</Title>
          <PriceAndAmount>
            <small>7 unidades</small>
            <strong>€{newPrice}</strong>
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
};
