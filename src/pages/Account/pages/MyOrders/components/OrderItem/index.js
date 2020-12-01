import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { addToCartRequest } from '~/store/modules/cart/actions';

import delivery from '~/assets/myAccount/delivery_white.svg';
import orders from '~/assets/myAccount/orders_white.svg';

import {
  Container,
  ItemPicture,
  Title,
  ProductInfo,
  Options,
  PriceAndAmount,
  Button,
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
  const dispatch = useDispatch();

  const handleAddToCart = useCallback(() => {
    dispatch(addToCartRequest(item, 1));
  }, [item, dispatch]);

  return (
    <Container key={id} style={index > 1 ? { marginTop: 20 } : {}}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ItemPicture src={thumbs} />
        <ProductInfo>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Title>{title}</Title>
          </div>
          <PriceAndAmount>
            <small>{qty} unidades</small>
            <strong>€&nbsp;{has_promotion ? price_promotional : price}</strong>
          </PriceAndAmount>
        </ProductInfo>
      </div>
      <Options>
        <Button color="#0cb68b">
          <img src={delivery} alt="" />
          <small>Adicionar a entrega periódica</small>
        </Button>
        <Button
          style={{ width: 132 }}
          color="#29B4CC"
          onClick={handleAddToCart}
        >
          <img src={orders} alt="" style={{ width: 15, height: 15 }} />
          <small>Adicionar ao cesto</small>
        </Button>
      </Options>
    </Container>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    thumbs: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.string,
    price_promotional: PropTypes.string,
    has_promotion: PropTypes.bool,
    qty: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
