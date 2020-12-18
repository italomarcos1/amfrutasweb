import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FacebookShareButton, WhatsappShareButton } from 'react-share';

import { useMediaQuery } from 'react-responsive';

import {
  FullContainer,
  Container,
  Content,
  Details,
  ProductInfo,
  Title,
  PriceAndInfoContainer,
  PriceContainer,
  Warning,
  ShippingButtonContainer,
  ShippingButton,
  FreeShipping,
  FavoriteButton,
  FlexStartContainer,
  FlexStartText,
  ShareThisProduct,
  Description,
  Amount,
  AmountAndPriceContainer,
  AmountAndTotalContainer,
  TotalContainer,
  ShippingContainer,
  buttonStyle,
  buttonTitleStyle,
  imgButtonStyle,
} from './styles';

import {
  addToCartRequest,
  addToFavoritesRequest,
  removeFromFavoritesRequest,
} from '~/store/modules/cart/actions';

import { Button } from '~/components/LoginModal';
import ImagesCarousel from '~/components/ImagesCarousel';

import heartOn from '~/assets/icons/heart-on.svg';
import heartOff from '~/assets/icons/heart-off.svg';
import facebook from '~/assets/facebook.svg';
import whatsapp from '~/assets/whatsapp.svg';
import minus from '~/assets/icons/minus.svg';
import plus from '~/assets/icons/plus.svg';
import barcode from '~/assets/icons/barcode.svg';

import { formatPrice } from '~/utils/calculatePrice';
import { notSignedAddedToFavorites } from '~/store/modules/auth/actions';

import Toast from '~/components/Toast';

import backend from '~/services/api';

export default function ViewProduct() {
  const dispatch = useDispatch();
  const { state, pathname } = useLocation();

  const [product, setProduct] = useState(null);
  const [quote, setQuote] = useState('');
  const [message, setMessage] = useState('');
  const [banner, setBanner] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productImages, setProductImages] = useState([]);
  const [qty, setQty] = useState(1);
  const [shippingCost, setShippingCost] = useState(4);
  const [minValueFreeShipping, setMinValueFreeShipping] = useState(0);

  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const [pressed, setPressed] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);

  const favorites = useSelector(reducer => reducer.cart.favorites);
  const updating = useSelector(reducer => reducer.cart.updating);
  const signed = useSelector(reducer => reducer.auth.signed);

  const handleAddToCart = useCallback(() => {
    dispatch(addToCartRequest(product, qty));
    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);
    }, 2800);

    setQty(1);
  }, [product, dispatch, qty]);

  const loadQuote = useCallback(async () => {
    const {
      data: {
        data: { page_title },
      },
    } = await backend.get(`/seos/${pathname}`);
    setQuote(page_title);
    setMessage(`Veja esse conteúdo no AMFrutas: ${page_title}`);
  }, [pathname]);

  const loadProduct = useCallback(async () => {
    const keys = ['min_value_free_shipping'];
    setLoading(true);
    let search = '';

    if (!state) {
      const formattingPathname = pathname.split('/').splice(2).join('/');

      search = formattingPathname;
    } else {
      search = state.id;
    }

    const [productData, shipping] = await Promise.all([
      backend.get(`ecommerce/products/${search}`),
      backend.get('/configurations', { keys }),
    ]);

    const {
      data: { data },
    } = productData;
    const {
      data: { data: shippingData },
    } = shipping;

    setProduct(data);
    setBanner(data.banner);
    setMinValueFreeShipping(shippingData.min_value_free_shipping);

    setProductImages(data.product_images);

    setLoading(false);
  }, [state, pathname]);

  const loadShippingCost = useCallback(async () => {
    if (!product) return;
    const price = product.has_promotion
      ? formatPrice(qty * product.price_promotional)
      : formatPrice(qty * product.price);

    const {
      data: { data },
    } = await backend.get(`checkout/shipping-cost?subtotal=${price}`);

    setShippingCost(data);
  }, [qty, product]);

  useEffect(() => {
    loadQuote();
  }, [loadQuote, pathname]);

  useEffect(() => loadShippingCost(), [loadShippingCost, qty]);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadProduct();
  }, [loadProduct]);

  useEffect(() => {
    if (!product) return;
    const fvt = favorites.findIndex(fav => fav.id === product.id);
    setFavorite(fvt >= 0);
  }, [favorites, product]);

  const handleFavorite = useCallback(() => {
    if (!signed) {
      dispatch(notSignedAddedToFavorites());
      return;
    }
    if (pressed) {
      dispatch(
        !favorite
          ? addToFavoritesRequest(product)
          : removeFromFavoritesRequest(product.id)
      );
      setFavorite(!favorite);
      setPressed(false);
    }
  }, [pressed, signed, dispatch, favorite, product]);

  return (
    <FullContainer>
      {loading ? (
        <h1>Carregando...</h1>
      ) : (
        <>
          <Container>
            <Content>
              <img src={banner} alt="" />
              <ProductInfo>
                <Title>{product.title}</Title>
                <PriceAndInfoContainer>
                  <ShippingButtonContainer>
                    <PriceContainer>
                      {product.has_promotion ? (
                        <small>de €&nbsp;{product.price} por</small>
                      ) : (
                        <small>&nbsp;</small>
                      )}
                      <strong>
                        <b>€</b>
                        &nbsp;
                        {product.has_promotion
                          ? product.price_promotional
                          : product.price}
                      </strong>
                      {product.has_promotion ? (
                        <small style={{ color: '#FF2121' }}>
                          Economize €&nbsp;
                          {(
                            Math.round(
                              (product.price - product.price_promotional) * 100
                            ) / 100
                          ).toFixed(2)}
                        </small>
                      ) : (
                        <small>&nbsp;</small>
                      )}
                    </PriceContainer>
                    <AmountAndPriceContainer>
                      <AmountAndTotalContainer>
                        <Amount>
                          <button
                            type="button"
                            disabled={qty === 1}
                            onClick={() => setQty(qty - 1)}
                            style={{
                              borderTopRightRadius: 0,
                              borderBottomRightRadius: 0,
                            }}
                          >
                            <img src={minus} alt="icon" />
                          </button>
                          <strong>
                            {qty === 0 ? 0 : qty < 10 ? `0${qty}` : qty}
                          </strong>
                          <button
                            type="button"
                            onClick={() => setQty(qty + 1)}
                            style={{
                              borderTopLeftRadius: 0,
                              borderBottomLeftRadius: 0,
                            }}
                          >
                            <img src={plus} alt="icon" />
                          </button>
                        </Amount>
                        <TotalContainer>
                          <small>Total</small>
                          <strong>
                            <b>€</b>
                            &nbsp;
                            {product.has_promotion
                              ? formatPrice(qty * product.price_promotional)
                              : formatPrice(qty * product.price)}
                          </strong>
                        </TotalContainer>
                      </AmountAndTotalContainer>
                      {product.has_promotion ? (
                        <small style={{ color: '#FF2121', marginTop: 5 }}>
                          Economize €&nbsp;
                          {formatPrice(
                            qty * (product.price - product.price_promotional)
                          )}
                        </small>
                      ) : (
                        <small>&nbsp;</small>
                      )}
                    </AmountAndPriceContainer>

                    <ShippingContainer>
                      <ShippingButton
                        style={{
                          borderBottomRightRadius: 0,
                          borderTopRightRadius: 0,
                          backgroundColor: '#d6d6d6 ',
                        }}
                      >
                        Envio
                      </ShippingButton>
                      <ShippingButton
                        style={{
                          borderBottomLeftRadius: 0,
                          borderTopLeftRadius: 0,
                          fontFamily: 'SFProBold',
                        }}
                      >
                        €&nbsp;{shippingCost}.00
                      </ShippingButton>
                    </ShippingContainer>
                    <FreeShipping>
                      Envio gratuito para compras acima de&nbsp;
                      <b>€&nbsp;{minValueFreeShipping}</b>
                    </FreeShipping>
                  </ShippingButtonContainer>
                  <ShippingButtonContainer
                    style={{
                      height: 240,
                    }}
                  >
                    <FlexStartContainer>
                      <FlexStartContainer>
                        <img src={barcode} alt="Barcode" />
                        <FlexStartText>Código: 837922</FlexStartText>
                      </FlexStartContainer>
                    </FlexStartContainer>
                    <FlexStartContainer>
                      <FavoriteButton
                        type="button"
                        onClick={() => {
                          setPressed(true);
                          handleFavorite();
                        }}
                        disabled={updating}
                      >
                        <img
                          src={favorite ? heartOn : heartOff}
                          alt="Favorite"
                        />
                      </FavoriteButton>
                      <FlexStartText style={{ color: '#FD8B2A' }}>
                        Colocar em seus Favoritos
                      </FlexStartText>
                    </FlexStartContainer>
                    <Warning>
                      {` RECICLAMOS TODO O TIPO DE PLÁSTICO DESDE SACOS A EMBALAGENS, SE
                PRETENDE AJUDAR O NOSSO PLANETA, ENVIE NOS PELOS NOSSOS
                MOTORISTAS TODO O PLÁSTICO QUE NÃO PRECISA QUE NÓS DAMOS-LHE
                OUTRA VIDA :)`}
                    </Warning>
                  </ShippingButtonContainer>
                </PriceAndInfoContainer>

                <ShareThisProduct>
                  <strong>Compartilhe esse produto:</strong>
                  <div
                    style={{
                      display: 'flex',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}
                  >
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        `${message} https://${window.location.hostname}${pathname}`
                      )}`}
                      style={{ ...buttonStyle, backgroundColor: '#3ab879' }}
                      title="Veja esse conteúdo no AMFrutas"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={whatsapp} alt="" style={imgButtonStyle} />
                      <small style={buttonTitleStyle}>WhatsApp</small>
                    </a>
                    <FacebookShareButton
                      url={`https://${window.location.hostname}${pathname}`}
                      quote={`AMFrutas | ${quote}`}
                      hashtag="#VemProAMFrutas"
                      resetButtonStyle
                      style={buttonStyle}
                    >
                      <img src={facebook} alt="" style={imgButtonStyle} />
                      <small style={buttonTitleStyle}>Facebook</small>
                    </FacebookShareButton>
                  </div>
                </ShareThisProduct>
              </ProductInfo>
            </Content>
            <Details>
              <ImagesCarousel images={productImages} setImage={setBanner} />

              <Button
                color="#1DC167"
                shadowColor="#17A75B"
                onClick={handleAddToCart}
                style={{ width: 525, marginTop: 48 }}
              >
                <b>Adicionar ao Cesto</b>
              </Button>
            </Details>
          </Container>
          <Description
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          />
          {toastVisible && (
            <Toast
              status={`O produto ${product.title} foi adicionado ao seu cesto de compras.`}
              color="#1DC167"
              isDesktop={isDesktop}
            />
          )}
        </>
      )}
    </FullContainer>
  );
}
