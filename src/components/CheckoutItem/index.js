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
  const {
    id,
    thumbs,
    title,
    price,
    price_promotional,
    has_promotion,
    qty,
  } = item;

  return (
    <Container key={id} style={index > 1 ? { marginTop: 40 } : {}}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ItemPicture src={thumbs} />
        <ProductInfo>
          <Title>{title}</Title>
          <PriceAndAmount>
            <small>{qty} unidades</small>
            <strong>€&nbsp;{has_promotion ? price_promotional : price}</strong>
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
    qty: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
