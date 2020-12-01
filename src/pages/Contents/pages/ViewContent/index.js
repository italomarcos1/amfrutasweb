import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  Container,
  InfoContainer,
  SearchBar,
  Content,
  Title,
  TitleContainer,
  ShareThisProduct,
  ShareButton,
  Description,
  ProductsList,
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
  const { state } = useLocation();

  const [loginModal, setLoginModal] = useState(false);

  const [product, setProduct] = useState(null);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [promotionsData, setPromotionsData] = useState([]);

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
        <SearchBar>
          <SearchInput />
        </SearchBar>

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

      {loginModal && <LoginModal closeModal={() => setLoginModal(false)} />}
    </>
  );
}
