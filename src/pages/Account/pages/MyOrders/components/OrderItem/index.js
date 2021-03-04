import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { addToCartRequest } from '~/store/modules/cart/actions';

import coins from '~/assets/coins.svg';
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
  Coins,
  CBackContainer,
} from './styles';

export default function Item({ item, index, isDesktop }) {
  const {
    id,
    thumbs,
    title,
    price,
    price_promotional,
    has_promotion,
    qty,
    cback,
  } = item;
  const dispatch = useDispatch();

  const [finalPrice, setFinalPrice] = useState(price);
  const [finalPromotionalPrice, setFinalPromotionalPrice] = useState(price);
  const [finalCback, setFinalCback] = useState(cback);

  useEffect(() => {
    const newPrice = (Math.round(Number(price) * qty * 100) / 100).toFixed(2);
    setFinalPrice(newPrice);

    const newPromotionalPrice = (
      Math.round(Number(price_promotional) * qty * 100) / 100
    ).toFixed(2);
    setFinalPromotionalPrice(newPromotionalPrice);

    const newCback = (Math.round(Number(cback) * qty * 100) / 100).toFixed(2);

    setFinalCback(newCback);
  }, [qty, price, price_promotional, cback]);

  const handleAddToCart = useCallback(() => {
    dispatch(addToCartRequest(item, 1));
  }, [item, dispatch]);

  return (
    <Container
      key={id}
      style={index > 1 ? { marginTop: 20 } : {}}
      isDesktop={isDesktop}
    >
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ItemPicture src={thumbs} isDesktop={isDesktop} />
        <ProductInfo>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Title isDesktop={isDesktop}>{title}</Title>
          </div>
          <PriceAndAmount isDesktop={isDesktop} style={{ width: '100%' }}>
            {!!cback ? (
              <CBackContainer
                style={!!cback ? (cback === '0.00' ? { opacity: 0 } : {}) : {}}
              >
                <Coins src={coins} alt="coins" isDesktop={isDesktop} />
                <strong style={isDesktop ? {} : { fontSize: 9 }}>
                  €&nbsp;{!!cback ? finalCback : '0.00'}
                </strong>
                <b style={isDesktop ? {} : { fontSize: 9 }}>DE CRÉDITO</b>
              </CBackContainer>
            ) : (
              <></>
            )}
            {has_promotion ? (
              <small className="offPrice">€&nbsp;{price}</small>
            ) : (
              <small>&nbsp;</small>
            )}
            <strong>€&nbsp;{has_promotion ? price_promotional : price}</strong>
          </PriceAndAmount>
        </ProductInfo>
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          marginTop: 14,
          justifyContent: 'flex-end',
        }}
      >
        <PriceAndAmount
          isDesktop={isDesktop}
          style={{
            width: '50%',
          }}
        >
          <small>{qty} unidades</small>
          <strong>
            €&nbsp;{has_promotion ? finalPromotionalPrice : finalPrice}
          </strong>
        </PriceAndAmount>
      </div>
      <Options isDesktop={isDesktop}>
        <Button
          color="#0cb68b"
          style={isDesktop ? { width: 185 } : { width: '51%', fontSize: 10 }}
        >
          <img src={delivery} alt="" />
          <small style={isDesktop ? {} : { fontSize: 10 }}>
            Adicionar a entrega periódica
          </small>
        </Button>
        <Button
          color="#29B4CC"
          onClick={handleAddToCart}
          style={isDesktop ? { width: 132 } : { width: '37%', fontSize: 10 }}
        >
          <img src={orders} alt="" style={{ width: 15, height: 15 }} />
          <small style={isDesktop ? {} : { fontSize: 10 }}>
            Adicionar ao cesto
          </small>
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
  isDesktop: PropTypes.bool.isRequired,
};
