import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import coins from '~/assets/coins.svg';
import basket_active from '~/assets/icons/basket_active.svg';
import minus from '~/assets/icons/minus.svg';
import plus from '~/assets/icons/plus.svg';
import heartOn from '~/assets/icons/heart-on.svg';
import heartOff from '~/assets/icons/heart-off.svg';

import { addToCartRequest } from '~/store/modules/cart/actions';

import {
  Container,
  ImageContainer,
  PriceContainer,
  Options,
  FavoriteButton,
  Title,
} from './styles';

export default function Product({ product, index }) {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(product.isFavorite);
  const [amount, setAmount] = useState(0);

  const { title, picture, oldPrice, newPrice } = product;

  const handleAddToCart = useCallback(() => {
    dispatch(addToCartRequest(product, amount));
    setAmount(0);
  }, [product, amount, dispatch]);

  return (
    <Container>
      <FavoriteButton type="button" onClick={() => setIsFavorite(!isFavorite)}>
        <img src={isFavorite ? heartOn : heartOff} alt="Favorite" />
      </FavoriteButton>
      <ImageContainer to={`/product/${index}`}>
        <img src={picture} alt="Product" />
      </ImageContainer>
      <Title to={`/product/${index}`}>{title}</Title>
      <PriceContainer to={`/product/${index}`}>
        <span>
          <img
            src={coins}
            alt="coins"
            style={{ width: '15%', marginRight: 1 }}
          />
          <strong>€1.290,08</strong>
          DE CRÉDITO
        </span>
        <small>
          antes
          <p>€{oldPrice}</p>
        </small>
        <strong>€{newPrice}</strong>
      </PriceContainer>
      <Options>
        <div>
          <button
            type="button"
            disabled={amount === 0}
            onClick={() => setAmount(amount - 1)}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            <img src={minus} alt="icon" />
          </button>
          <strong>{amount}</strong>
          <button
            type="button"
            onClick={() => setAmount(amount + 1)}
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            <img src={plus} alt="icon" />
          </button>
        </div>
        <button type="button" onClick={handleAddToCart} disabled={amount === 0}>
          <img src={basket_active} alt="icon" />
        </button>
      </Options>
    </Container>
  );
}

Product.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    picture: PropTypes.string,
    oldPrice: PropTypes.string,
    newPrice: PropTypes.string,
    isFavorite: PropTypes.bool,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
