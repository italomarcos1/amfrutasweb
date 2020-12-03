import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FacebookShareButton, WhatsappShareButton } from 'react-share';

import {
  Container,
  InfoContainer,
  Content,
  Title,
  TitleContainer,
  ShareThisProduct,
  Description,
  ProductsList,
  buttonStyle,
  buttonTitleStyle,
  imgButtonStyle,
} from './styles';

import Header from '~/components/Header';
import Footer from '~/components/Footer';

import SearchInput from '~/components/SearchInput';
import Product from '~/components/Product';

import LoginModal from '~/pages/LoginModal';

import facebook from '~/assets/facebook.svg';
import whatsapp from '~/assets/whatsapp.svg';

import backend from '~/services/api';

export default function ViewContent() {
  const { state, pathname } = useLocation();

  const [loginModal, setLoginModal] = useState(false);

  const [product, setProduct] = useState(null);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [promotionsData, setPromotionsData] = useState([]);

  const noFavorite = useSelector(reducer => reducer.auth.noFavorite);

  const firstLogin = useSelector(reducer => reducer.auth.firstLogin);

  const history = useHistory();

  useEffect(() => {
    if (firstLogin) history.push('/painel');
  }, [history, firstLogin]);

  const loadContent = useCallback(async () => {
    setLoading(true);
    let { id } = state;

    if (!Number(id)) {
      const formatUrl = id.split('/').splice(2).join('/');
      id = formatUrl;
    }

    const {
      data: { data },
    } = await backend.get(`blog/contents/${id}`);

    setProduct(data);
    setBanner(data.banner);

    const {
      data: {
        data: { data: promotions },
      },
    } = await backend.get(
      '/ecommerce/products?page=1&only_promotional=true&per_page=4'
    );

    setProduct(data);
    setBanner(data.banner);
    setPromotionsData(promotions);

    setLoading(false);
  }, [state]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  return (
    <>
      <Header login={() => setLoginModal(true)} active="Dicas" />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          backgroundColor: '#ececec',
        }}
      >
        <Container>
          {loading ? (
            <h1>Carregando...</h1>
          ) : (
            <>
              <InfoContainer>
                <Content>
                  <img src={banner} alt="" />
                  <TitleContainer>
                    <Title>{product.title}</Title>
                    <ShareThisProduct>
                      <strong>Compartilhe esse produto:</strong>
                      <div
                        style={{
                          display: 'flex',
                          width: '100%',
                          justifyContent: 'space-between',
                        }}
                      >
                        <WhatsappShareButton
                          url={`${window.location.hostname}${pathname}`}
                          style={{ ...buttonStyle, backgroundColor: '#3ab879' }}
                          title="Veja esse conteúdo no AMFrutas"
                        >
                          <img src={whatsapp} alt="" style={imgButtonStyle} />
                          <small style={buttonTitleStyle}>WhatsApp</small>
                        </WhatsappShareButton>
                        <FacebookShareButton
                          url="http://www.amfrutas.pt"
                          quote="AMFrutas - A sua frutaria online | 3 lojas na linha de Cascais para sua comodidade"
                          hashtag="#AMFrutas"
                          resetButtonStyle
                          style={buttonStyle}
                        >
                          <img src={facebook} alt="" style={imgButtonStyle} />
                          <small style={buttonTitleStyle}>Facebook</small>
                        </FacebookShareButton>
                      </div>
                    </ShareThisProduct>
                  </TitleContainer>

                  <Description
                    dangerouslySetInnerHTML={{
                      __html: product.description,
                    }}
                  />
                </Content>
                <ProductsList>
                  {promotionsData.length !== 0 &&
                    promotionsData.map((p, index) => (
                      <Product key={p.id} index={index} product={p} />
                    ))}
                </ProductsList>
              </InfoContainer>
            </>
          )}
        </Container>
      </div>

      <Footer />

      {(loginModal || noFavorite) && (
        <LoginModal closeModal={() => setLoginModal(false)} />
      )}
    </>
  );
}
