import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
// import { Container } from './styles';

import minus from '~/assets/icons/minus.svg';
import plus from '~/assets/icons/plus.svg';
import close from '~/assets/icons/close.svg';

import {
  removeFromCartRequest,
  updateAmount,
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

export default function Item({ item, index }) {
  const { id, picture, title, oldPrice, newPrice, amount } = item;

  const dispatch = useDispatch();

  const handleRemoveFromCart = useCallback(() => {
    dispatch(removeFromCartRequest(id));
  }, [id, dispatch]);

  const handleUpdateAmount = useCallback(
    updatedAmount => {
      dispatch(updateAmount(id, updatedAmount));
    },
    [id, dispatch]
  );

  return (
    <Container key={id} style={index > 1 ? { marginTop: 40 } : {}}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ItemPicture src={picture} />
        <ProductInfo>
          <Title>{title}</Title>
          <PriceAndAmount>
            {oldPrice ? <small>€&nbsp;11.8</small> : <small>&nbsp;</small>}
            <strong>€&nbsp;{newPrice}</strong>
          </PriceAndAmount>
        </ProductInfo>
      </div>
      <Separator />
      <Options>
        <DeleteItem onClick={handleRemoveFromCart}>
          <img src={close} alt="Delete Item" />
        </DeleteItem>
        <div>
          <button
            type="button"
            disabled={amount === 0}
            onClick={() => handleUpdateAmount(amount - 1)}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            <img src={minus} alt="icon" />
          </button>
          <strong>{amount}</strong>
          <button
            type="button"
            onClick={() => handleUpdateAmount(amount + 1)}
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            <img src={plus} alt="icon" />
          </button>
        </div>
        <Price style={{ alignSelf: 'center' }}>€{newPrice}</Price>
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
