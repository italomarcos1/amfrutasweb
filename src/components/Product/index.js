import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import coins from '~/assets/coins.svg';
import basket_active from '~/assets/icons/basket_active.svg';
import minus from '~/assets/icons/minus.svg';
import plus from '~/assets/icons/plus.svg';
import heartOn from '~/assets/icons/heart-on.svg';
import heartOff from '~/assets/icons/heart-off.svg';

import Toast from '~/components/Toast';

import {
  addToCartRequest,
  addToFavoritesRequest,
  removeFromFavoritesRequest,
} from '~/store/modules/cart/actions';

import { notSignedAddedToFavorites } from '~/store/modules/auth/actions';

import {
  Container,
  ImageContainer,
  PriceContainer,
  Options,
  FavoriteButton,
  Title,
  Coins,
  AmountContainer,
  UpdateAmountButton,
  Amount,
  AddToCartButton,
} from './styles';

export default function Product({ product, index, setHeight }) {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const [favorite, setFavorite] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const favorites = useSelector(state => state.cart.favorites);
  const updating = useSelector(state => state.cart.updating);
  const profile = useSelector(state => state.user.profile);
  const signed = useSelector(state => state.auth.signed);

  const [qty, setQty] = useState(1);

  const {
    id,
    title,
    thumbs,
    price_promotional,
    has_promotion,
    price,
    url,
    cback,
  } = product;

  const handleAddToCart = useCallback(() => {
    dispatch(addToCartRequest(product, qty));
    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);
    }, 2800);

    setQty(1);
  }, [product, qty, dispatch]);

  useEffect(() => {
    const fvt = favorites.findIndex(fav => fav.id === id);
    setFavorite(fvt >= 0);
  }, [favorites, id]);

  const handleFavorite = useCallback(() => {
    if (!signed) {
      dispatch(notSignedAddedToFavorites());
      return;
    }
    if (pressed) {
      dispatch(
        !favorite
          ? addToFavoritesRequest(product)
          : removeFromFavoritesRequest(id)
      );
      setFavorite(!favorite);
      setPressed(false);
    }
  }, [pressed, signed, dispatch, favorite, id, product]);

  useEffect(() => {
    if (isDesktop || !setHeight) return;
    const el = document.getElementById(`product${index}`);

    setHeight(el.offsetHeight);
  }, [isDesktop, index, setHeight, product]);

  return (
    <>
      <Container isDesktop={isDesktop} id={`product${index}`}>
        <FavoriteButton
          type="button"
          onClick={() => {
            setPressed(true);
            handleFavorite();
          }}
          disabled={updating}
        >
          <img src={favorite ? heartOn : heartOff} alt="Favorite" />
        </FavoriteButton>
        <ImageContainer
          to={{
            pathname: `/${url}`,
            state: { id },
          }}
          isDesktop={isDesktop}
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
          <Title isDesktop={isDesktop}>{title}</Title>
        </Link>
        <PriceContainer
          to={{
            pathname: `/${url}`,
            state: { id },
          }}
        >
          <span style={!!cback ? (cback === '0.00' ? { opacity: 0 } : {}) : {}}>
            <Coins src={coins} alt="coins" isDesktop={isDesktop} />
            <strong style={isDesktop ? {} : { fontSize: 9 }}>
              €&nbsp;{!!cback ? cback : '0.00'}
            </strong>
            <b style={isDesktop ? {} : { fontSize: 9 }}>DE CRÉDITO</b>
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
        <Options isDesktop={isDesktop}>
          <AmountContainer isDesktop={isDesktop}>
            <UpdateAmountButton
              type="button"
              disabled={qty === 1}
              onClick={() => setQty(qty - 1)}
              isDesktop={isDesktop}
              style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
            >
              <img src={minus} alt="icon" />
            </UpdateAmountButton>
            <Amount isDesktop={isDesktop}>
              {qty === 0 ? 0 : qty < 10 ? `0${qty}` : qty}
            </Amount>
            <UpdateAmountButton
              type="button"
              onClick={() => setQty(qty + 1)}
              isDesktop={isDesktop}
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              <img src={plus} alt="icon" />
            </UpdateAmountButton>
          </AmountContainer>
          <AddToCartButton
            type="button"
            onClick={handleAddToCart}
            isDesktop={isDesktop}
            disabled={qty === 0}
          >
            <img
              src={basket_active}
              alt="icon"
              style={isDesktop ? {} : { width: '70%' }}
            />
          </AddToCartButton>
        </Options>
      </Container>
      {toastVisible && (
        <Toast
          status={`O produto ${title} foi adicionado ao seu cesto de compras.`}
          color="#1DC167"
          isDesktop={isDesktop}
        />
      )}
    </>
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
  setHeight: PropTypes.func,
};

Product.defaultProps = {
  setHeight: null,
};
