import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { FacebookShareButton, WhatsappShareButton } from 'react-share';

import { Translate } from 'react-auto-translate';

import {
  FullContainer,
  Container,
  Content,
  Details,
  ProductInfo,
  Title,
  PriceAndInfoContainer,
  PriceContainer,
  ShippingButtonContainer,
  ShippingButton,
  FreeShipping,
  FavoriteButton,
  FlexStartContainer,
  FlexStartText,
  ShareThisProduct,
  Description,
  Amount,
  TotalContainer,
  ShippingContainer,
  buttonStyle,
  buttonTitleStyle,
  imgButtonStyle,
  SectionTitle,
  ProductsContainer,
} from './styles';

import {
  addToCartRequest,
  addToFavoritesRequest,
  removeFromFavoritesRequest,
} from '~/store/modules/cart/actions';

import { Button } from '~/uk/components/LoginModal';
import Product from '~/uk/components/Product';

import heartOn from '~/assets/icons/heart-on.svg';
import heartOff from '~/assets/icons/heart-off.svg';
import facebook from '~/assets/facebook.svg';
import whatsapp from '~/assets/whatsapp.svg';
import minus from '~/assets/icons/minus.svg';
import plus from '~/assets/icons/plus.svg';
import barcode from '~/assets/icons/barcode.svg';

import { formatPrice } from '~/utils/calculatePrice';
import { notSignedAddedToFavorites } from '~/store/modules/auth/actions';

import Toast from '~/uk/components/Toast';

import backend from '~/services/api';
import { googleTranslate } from '~/services/googleTranslate';

export default function ViewProduct() {
  const dispatch = useDispatch();
  const { state, pathname } = useLocation();

  const [product, setProduct] = useState(null);
  const [quote, setQuote] = useState('');
  const [message, setMessage] = useState('');
  const [banner, setBanner] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [shippingCost, setShippingCost] = useState(4);
  const [minValueFreeShipping, setMinValueFreeShipping] = useState(0);

  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const [pressed, setPressed] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);

  const favorites = useSelector(reducer => reducer.cart.favorites);
  const updating = useSelector(reducer => reducer.cart.updating);
  const signed = useSelector(reducer => reducer.auth.signed);

  const translateDescription = useCallback(() => {
    try {
      if (!product) return;
      const translated = googleTranslate.translate(
        product.description,
        'pt',
        'en',
        (err, translation) => {
          const description = !!translation
            ? translation.translatedText
            : product.description;

          setProduct(prevState => {
            return { ...prevState, description };
          });
        }
      );

      return translated;
    } catch (err) {
      console.log(err);
    }
  }, [product]);

  const handleAddToCart = useCallback(() => {
    dispatch(addToCartRequest(product, qty));
    setToastVisible(true);

    setTimeout(() => {
      setToastVisible(false);
    }, 2800);

    setQty(1);
  }, [product, dispatch, qty]);

  const loadQuote = useCallback(async () => {
    const formattingPathname = [...pathname];
    formattingPathname.splice(0, 1);
    const {
      data: {
        data: { page_title },
      },
    } = await backend.get(`/seos/${formattingPathname.join('')}`);
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

    const [productData, shipping, recommendedResponse] = await Promise.all([
      backend.get(`ecommerce/products/${search}`),
      backend.get('/configurations', { keys }),
      backend.get(
        `/ecommerce/products?page=${1}&per_page=4&special_order=most_viewed`
      ),
    ]);

    const {
      data: { data },
    } = productData;
    const {
      data: { data: shippingData },
    } = shipping;

    const {
      data: {
        data: { data: recommendedData },
      },
    } = recommendedResponse;

    setRecommendedProducts(recommendedData);

    setProduct(data);
    setBanner(data.banner);
    setMinValueFreeShipping(shippingData.min_value_free_shipping);

    translateDescription();

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
        <h1>Loading...</h1>
      ) : (
        <>
          <Container>
            <Content>
              <span style={{ maxWidth: 280 }}>
                <Title>
                  <Translate>{product.title}</Translate>
                </Title>
              </span>
              <ProductInfo>
                <img src={banner} alt="" />
                <PriceAndInfoContainer>
                  <PriceContainer>
                    {product.has_promotion ? (
                      <small>from €&nbsp;{product.price} by</small>
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
                        Save €&nbsp;
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
                  {product.has_promotion ? (
                    <small style={{ color: '#FF2121', marginTop: 5 }}>
                      Save €&nbsp;
                      {formatPrice(
                        qty * (product.price - product.price_promotional)
                      )}
                    </small>
                  ) : (
                    <small>&nbsp;</small>
                  )}
                </PriceAndInfoContainer>
              </ProductInfo>
              <ShippingButtonContainer
                style={{
                  height: 72,
                  padding: 0,
                  marginTop: 20,
                }}
              >
                <ShippingContainer style={{ marginTop: 0 }}>
                  <ShippingButton
                    style={{
                      borderBottomRightRadius: 0,
                      borderTopRightRadius: 0,
                      backgroundColor: '#d6d6d6 ',
                    }}
                  >
                    Shipping
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
                  Free shipping for purchases above&nbsp;
                  <b>€&nbsp;{minValueFreeShipping}</b>
                </FreeShipping>
              </ShippingButtonContainer>
              <ShippingButtonContainer
                style={{
                  marginTop: 20,
                  height: 72,
                }}
              >
                <FlexStartContainer style={{ height: 72 }}>
                  <FlexStartContainer>
                    <img src={barcode} alt="Barcode" />
                    <FlexStartText>Code: 837922</FlexStartText>
                  </FlexStartContainer>
                </FlexStartContainer>
                <FlexStartContainer style={{ marginTop: 22 }}>
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
                  <FlexStartText style={{ color: '#FD8B2A' }}>
                    Add to Favorites
                  </FlexStartText>
                </FlexStartContainer>
              </ShippingButtonContainer>

              <ShareThisProduct>
                <strong>Share this product:</strong>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    marginTop: 9,
                    justifyContent: 'space-between',
                  }}
                >
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `${message} https://${window.location.hostname}${pathname}`
                    )}`}
                    style={{ ...buttonStyle, backgroundColor: '#3ab879' }}
                    title="Check this content at AMFrutas"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={whatsapp} alt="" style={imgButtonStyle} />
                    <small style={buttonTitleStyle}>WhatsApp</small>
                  </a>
                  <FacebookShareButton
                    url={`https://${window.location.hostname}${pathname}`}
                    quote={`AMFrutas | ${quote}`}
                    hashtag="#JoinAMFrutas"
                    resetButtonStyle
                    style={buttonStyle}
                  >
                    <img src={facebook} alt="" style={imgButtonStyle} />
                    <small style={buttonTitleStyle}>Facebook</small>
                  </FacebookShareButton>
                </div>
              </ShareThisProduct>
            </Content>
            <Details>
              <Button
                color="#1DC167"
                shadowColor="#17A75B"
                onClick={handleAddToCart}
                style={{ width: 525, marginTop: 80 }}
              >
                <b>Add to Basket</b>
              </Button>
            </Details>
          </Container>
          <Description
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          />
          <SectionTitle>
            <strong>This Week Promotions</strong>
            <small>Special Promotions every week</small>
          </SectionTitle>
          <ProductsContainer>
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              recommendedProducts.map((p, index) => (
                <Product key={p.id} index={index} product={p} />
              ))
            )}
          </ProductsContainer>
          {toastVisible && (
            <Toast
              status="This product was successfully added to your shopping basket."
              color="#1DC167"
            />
          )}
        </>
      )}
    </FullContainer>
  );
}
