import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import coins from '~/assets/coins.svg';
import basket_active from '~/assets/icons/basket_active.svg';
import minus from '~/assets/icons/minus.svg';
import plus from '~/assets/icons/plus.svg';
import heartOn from '~/assets/icons/heart-on.svg';
import heartOff from '~/assets/icons/heart-off.svg';

import {
  addToCartRequest,
  addToFavoritesRequest,
  removeFromFavoritesRequest,
} from '~/store/modules/cart/actions';

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
  const [favorite, setFavorite] = useState(false);

  const favorites = useSelector(state => state.cart.favorites);
  const updating = useSelector(state => state.cart.updating);

  const [amount, setAmount] = useState(0);

  const { id, title, thumbs, pricePromotional, hasPromotion, price } = product;

  const handleAddToCart = useCallback(() => {
    dispatch(addToCartRequest(product, amount));
    setAmount(0);
  }, [product, amount, dispatch]);

  useEffect(() => {
    const fvt = favorites.findIndex(fav => fav.id === id);
    setFavorite(fvt >= 0);
  }, [favorites, id]);

  const handleFavorite = () => {
    dispatch(
      !favorite
        ? addToFavoritesRequest(product)
        : removeFromFavoritesRequest(id)
    );
    setFavorite(!favorite);
  };

  return (
    <Container>
      <FavoriteButton
        type="button"
        onClick={handleFavorite}
        disabled={updating}
      >
        <img src={favorite ? heartOn : heartOff} alt="Favorite" />
      </FavoriteButton>
      <ImageContainer to={`/product/${index}`}>
        <img src={thumbs} alt="Product" />
      </ImageContainer>
      <Title to={`/product/${index}`}>{title}</Title>
      <PriceContainer to={`/product/${index}`}>
        <span>
          <img src={coins} alt="coins" />
          <strong>€&nbsp;1.290,08</strong>
          DE CRÉDITO
        </span>
        {hasPromotion ? (
          <small>
            antes
            <p>€&nbsp;{price}</p>
          </small>
        ) : (
          <small>&nbsp;</small>
        )}
        <strong>€&nbsp;{hasPromotion ? pricePromotional : price}</strong>
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
          <strong>
            {amount === 0 ? 0 : amount < 10 ? `0${amount}` : amount}
          </strong>
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
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
    thumbs: PropTypes.string,
    price: PropTypes.string,
    pricePromotional: PropTypes.string,
    url: PropTypes.string,
    hasPromotional: PropTypes.bool,
    isFavorite: PropTypes.bool,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
