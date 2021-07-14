import React from 'react';
import PropTypes from 'prop-types';
// import { Container } from './styles';

import { Translate } from 'react-auto-translate';

import {
  Container,
  ItemPicture,
  Title,
  PriceAndAmount,
  ProductInfo,
} from './styles';

export default function Item({ item, index, isDesktop }) {
  const {
    id,
    qty,
    price,
    thumbs,
    title,
    price_promotional,
    has_promotion,
    cback,
  } = item;

  return (
    <Container
      key={id}
      index={index}
      style={index > 1 ? { marginTop: 40 } : {}}
      isDesktop={isDesktop}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ItemPicture src={thumbs} />
        <ProductInfo>
          <Title isDesktop={isDesktop}>
            <Translate>{title}</Translate>
          </Title>
          <PriceAndAmount hasCback={!!cback}>
            {!!cback ? (
              cback !== '0.00' ? (
                <b>Cashback €&nbsp;{cback}</b>
              ) : (
                ''
              )
            ) : (
              <></>
            )}
            <small>{qty} units</small>
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
  isDesktop: PropTypes.bool.isRequired,
};
