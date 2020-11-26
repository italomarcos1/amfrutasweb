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
  const {
    options: { product },
    qty,
  } = item;
  const {
    id,
    thumbs,
    title,
    price,
    price_promotional,
    has_promotion,
  } = product;

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

  // console.log(item);
  return (
    <Container key={id} style={index > 1 ? { marginTop: 40 } : {}}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <ItemPicture src={thumbs} />
        <ProductInfo>
          <Title>{title}</Title>
          <PriceAndAmount>
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
      <Options>
        <DeleteItem onClick={handleRemoveFromCart}>
          <img src={close} alt="Delete Item" />
        </DeleteItem>
        <div>
          <button
            type="button"
            disabled={qty === 0}
            onClick={() => handleUpdateAmount(qty - 1)}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            <img src={minus} alt="icon" />
          </button>
          <strong>{qty}</strong>
          <button
            type="button"
            onClick={() => handleUpdateAmount(qty + 1)}
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            <img src={plus} alt="icon" />
          </button>
        </div>
        <Price style={{ alignSelf: 'center' }}>
          €&nbsp;{has_promotion ? price_promotional : price}
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
};
