import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

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
  const { id, picture, title, newPrice, amount } = item;
  const dispatch = useDispatch();

  const handleAddToCart = useCallback(() => {
    dispatch(addToCartRequest(item, 1));
  }, [item, dispatch]);

  return (
    <Container key={id} style={index > 1 ? { marginTop: 20 } : {}}>
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
    picture: PropTypes.string,
    title: PropTypes.string,
    newPrice: PropTypes.string,
    amount: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
