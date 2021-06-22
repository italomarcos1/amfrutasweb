import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// import { Container } from './styles';

import { Translate } from 'react-auto-translate';

import { FaSpinner } from 'react-icons/fa';

import minus from '~/assets/icons/minus.svg';
import plus from '~/assets/icons/plus.svg';
import close from '~/assets/icons/close.svg';

import {
  removeFromCartRequest,
  updateAmountRequest,
} from '~/store/modules/cart/actions';

import {
  Container,
  ItemPicture,
  Title,
  Price,
  PriceAndAmount,
  ProductInfo,
  Separator,
  Options,
  DeleteItem,
} from './styles';

export default function Item({ item, index, isDesktop }) {
  const {
    id,
    qty,
    product: { thumbs, title, price, price_promotional, has_promotion, cback },
  } = item;

  const dispatch = useDispatch();
  const updatingAmount = useSelector(state => state.cart.updatingAmount);

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

  const handleRemoveFromCart = useCallback(() => {
    dispatch(removeFromCartRequest(id));
  }, [id, dispatch]);

  const handleUpdateAmount = useCallback(
    updatedAmount => {
      dispatch(updateAmountRequest(id, updatedAmount));
    },
    [id, dispatch]
  );

  return (
    <Container
      key={id}
      index={index}
      style={index > 1 && isDesktop ? { marginTop: 40 } : {}}
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
                <b style={isDesktop ? { fontSize: 15 } : { fontSize: 13 }}>
                  Cashback €&nbsp;{finalCback}
                </b>
              ) : (
                ''
              )
            ) : (
              <></>
            )}
            {has_promotion ? (
              <small>€&nbsp;{price}</small>
            ) : (
              <small>&nbsp;</small>
            )}
            <strong>€&nbsp;{has_promotion ? price_promotional : price}</strong>
          </PriceAndAmount>
        </ProductInfo>
      </div>
      <Separator />
      <Options isDesktop={isDesktop}>
        <DeleteItem onClick={handleRemoveFromCart} isDesktop={isDesktop}>
          <img src={close} alt="Delete Item" />
        </DeleteItem>
        <div>
          <button
            type="button"
            disabled={qty === 1 || updatingAmount}
            onClick={() => handleUpdateAmount(qty - 1)}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            <img src={minus} alt="icon" />
          </button>
          <strong>
            {updatingAmount ? <FaSpinner color="#666" size={22} /> : qty}
          </strong>
          <button
            type="button"
            onClick={() => handleUpdateAmount(qty + 1)}
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            disabled={updatingAmount}
          >
            <img src={plus} alt="icon" />
          </button>
        </div>
        <Price style={{ alignSelf: 'center' }}>
          €&nbsp;{has_promotion ? finalPromotionalPrice : finalPrice}
        </Price>
      </Options>
    </Container>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    product: PropTypes.shape({
      id: PropTypes.number,
      thumbs: PropTypes.string,
      title: PropTypes.string,
      price_promotional: PropTypes.string,
      has_promotion: PropTypes.bool,
      price: PropTypes.string,
      qty: PropTypes.number,
    }),
  }).isRequired,
  index: PropTypes.number.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};
