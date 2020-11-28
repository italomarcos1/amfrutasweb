import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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
  const profile = useSelector(state => state.user.profile);

  const [qty, setQty] = useState(1);

  const {
    id,
    title,
    thumbs,
    price_promotional,
    has_promotion,
    price,
    url,
  } = product;

  const handleAddToCart = useCallback(() => {
    dispatch(addToCartRequest(product, qty));
    setQty(0);
  }, [product, qty, dispatch]);

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
      <ImageContainer
        to={{
          pathname: `/${url}`,
          state: { id },
        }}
      >
        <img src={thumbs} alt="Product" />
      </ImageContainer>
      <Link
        style={{ marginTop: 10, background: 'none' }}
        to={{
          pathname: `/${url}`,
          state: { id },
        }}
      >
        <Title>{title}</Title>
      </Link>
      <PriceContainer
        to={{
          pathname: `/${url}`,

          state: { id },
        }}
      >
        <span>
          <img src={coins} alt="coins" />
          <strong>
            €&nbsp;{profile !== null ? profile.cback_credit : '0.00'}
          </strong>
          DE CRÉDITO
        </span>
        {has_promotion ? (
          <small>
            antes
            <p>€&nbsp;{price}</p>
          </small>
        ) : (
          <small>&nbsp;</small>
        )}
        <strong>€&nbsp;{has_promotion ? price_promotional : price}</strong>
      </PriceContainer>
      <Options>
        <div>
          <button
            type="button"
            disabled={qty === 1}
            onClick={() => setQty(qty - 1)}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            <img src={minus} alt="icon" />
          </button>
          <strong>{qty === 0 ? 0 : qty < 10 ? `0${qty}` : qty}</strong>
          <button
            type="button"
            onClick={() => setQty(qty + 1)}
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            <img src={plus} alt="icon" />
          </button>
        </div>
        <button type="button" onClick={handleAddToCart} disabled={qty === 0}>
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
    price_promotional: PropTypes.string,
    url: PropTypes.string,
    has_promotion: PropTypes.bool,
    isFavorite: PropTypes.bool,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
