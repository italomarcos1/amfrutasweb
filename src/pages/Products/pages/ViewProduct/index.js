import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  Container,
  SearchBar,
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
  ShareButton,
  Description,
} from './styles';

import { addToCartRequest } from '~/store/modules/cart/actions';

import SearchInput from '~/components/SearchInput';
import { Button } from '~/components/LoginModal';
import ImagesCarousel from '~/components/ImagesCarousel';

import heartOn from '~/assets/icons/heart-on.svg';
import heartOff from '~/assets/icons/heart-off.svg';
import facebook from '~/assets/facebook.svg';
import whatsapp from '~/assets/whatsapp.svg';

import backend from '~/services/api';

export default function ViewProduct() {
  const dispatch = useDispatch();
  const { state } = useLocation();

  const [product, setProduct] = useState(null);
  const [banner, setBanner] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productImages, setProductImages] = useState([]);

  const handleAddToCart = useCallback(() => {
    dispatch(addToCartRequest(product, 1));
  }, [product, dispatch]);

  const loadProduct = useCallback(async () => {
    setLoading(true);
    const {
      data: { data },
    } = await backend.get(`ecommerce/products/${state.id}`);

    setProduct(data);
    setBanner(data.banner);

    setProductImages(data.product_images);

    setLoading(false);
  }, [state]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  // console.tron.log(product);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      }}
    >
      <SearchBar>
        <SearchInput />
      </SearchBar>

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
                    <div style={{ display: 'flex', marginTop: 21 }}>
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
                        € 4,00
                      </ShippingButton>
                    </div>
                  </ShippingButtonContainer>
                  <Warning>
                    {` RECICLAMOS TODO O TIPO DE PLÁSTICO DESDE SACOS A EMBALAGENS, SE
                PRETENDE AJUDAR O NOSSO PLANETA, ENVIE NOS PELOS NOSSOS
                MOTORISTAS TODO O PLÁSTICO QUE NÃO PRECISA QUE NÓS DAMOS-LHE
                OUTRA VIDA :)`}
                  </Warning>
                </PriceAndInfoContainer>
                <FreeShipping>
                  Envio gratuito para compras acima de <b>€ 50.00</b>
                </FreeShipping>
                <FlexStartContainer
                  style={{
                    marginTop: 23,
                  }}
                >
                  <FlexStartContainer>
                    <img src={heartOn} alt="Favorite" />
                    <FlexStartText>Código: 837922</FlexStartText>
                  </FlexStartContainer>
                  <FlexStartContainer
                    style={{
                      marginLeft: 170,
                    }}
                  >
                    <FavoriteButton
                      type="button"
                      onClick={() => setFavorite(!favorite)}
                      // disabled={updating}
                    >
                      <img src={favorite ? heartOn : heartOff} alt="Favorite" />
                    </FavoriteButton>
                    <FlexStartText style={{ color: '#FD8B2A' }}>
                      Colocar em seus Favoritos
                    </FlexStartText>
                  </FlexStartContainer>
                </FlexStartContainer>
                <Button
                  color="#1DC167"
                  shadowColor="#17A75B"
                  onClick={handleAddToCart}
                  style={{ width: 525, marginTop: 48 }}
                >
                  <b>Adicionar ao Cesto</b>
                </Button>
              </ProductInfo>
            </Content>
            <Details>
              <ImagesCarousel images={productImages} setImage={setBanner} />
              <ShareThisProduct>
                <strong>Compartilhe esse produto:</strong>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  <ShareButton color="#3AB879" onClick={() => {}}>
                    <img src={whatsapp} alt="" />
                    <small>WhatsApp</small>
                  </ShareButton>
                  <ShareButton color="#4F98C6" onClick={() => {}}>
                    <img src={facebook} alt="" />
                    <small>Facebook</small>
                  </ShareButton>
                </div>
              </ShareThisProduct>
            </Details>
          </Container>
          <Description
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          />
        </>
      )}
    </div>
  );
}
