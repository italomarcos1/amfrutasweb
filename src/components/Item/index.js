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
  ProductInfo,
  Separator,
  Options,
  DeleteItem,
} from './styles';

export default function Item({ item }) {
  const { id, picture, title, newPrice, amount } = item;

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
    <Container key={id}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ItemPicture src={picture} />
        <ProductInfo>
          <Title>{title}</Title>
          <Price>&euro;{newPrice}</Price>
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
            disabled={amount === 1}
            onClick={() => handleUpdateAmount(amount - 1)}
          >
            <img src={minus} alt="icon" />
          </button>
          <strong>{amount}</strong>
          <button type="button" onClick={() => handleUpdateAmount(amount + 1)}>
            <img src={plus} alt="icon" />
          </button>
        </div>
        <Price style={{ alignSelf: 'center' }}>&euro;{newPrice}</Price>
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
