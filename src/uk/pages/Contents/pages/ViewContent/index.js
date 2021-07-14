import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FacebookShareButton, WhatsappShareButton } from 'react-share';
import { useMediaQuery } from 'react-responsive';

import { Translate } from 'react-auto-translate';

import axios from 'axios';
import {
  FullContainer,
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

import Header from '~/uk/components/Header';
import Footer from '~/uk/components/Footer';

import Product from '~/uk/components/Product';

import LoginModal from '~/uk/pages/LoginModal';

import facebook from '~/assets/facebook.svg';
import whatsapp from '~/assets/whatsapp.svg';

import backend from '~/services/api';
import { googleTranslate } from '~/services/googleTranslate';

export default function ViewContent() {
  const { state, pathname } = useLocation();

  const [loginModal, setLoginModal] = useState(false);

  const [content, setContent] = useState(null);
  const [quote, setQuote] = useState('');
  const [message, setMessage] = useState('');
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [promotionsData, setPromotionsData] = useState([]);

  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const noFavorite = useSelector(reducer => reducer.auth.noFavorite);

  const firstLogin = useSelector(reducer => reducer.auth.firstLogin);

  const history = useHistory();

  const translateDescription = useCallback(async contentDescription => {
    try {
      const translated = googleTranslate.translate(
        contentDescription,
        'pt',
        'en',
        (err, translation) => {
          console.log('CARALHO');
          const description = !!translation
            ? translation.translatedText
            : contentDescription;

          setContent(prevState => {
            return { ...prevState, description };
          });
        }
      );

      return translated;
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (firstLogin) history.push('/dashboard');
  }, [history, firstLogin]);

  const loadQuote = useCallback(async () => {
    const formattingPathname = [...pathname];
    formattingPathname.splice(0, 1);

    const response = await backend.get(`/seos/${formattingPathname.join('')}`);
    const {
      data: {
        data: { page_title },
      },
    } = response;
    setQuote(page_title);
    setMessage(`See this content at AMFrutas: ${page_title}`);
  }, [pathname]);

  const loadContent = useCallback(async () => {
    setLoading(true);
    let search = '';

    if (!state) {
      const formattingPathname = pathname.split('/').splice(1).join('/');

      search = formattingPathname;
    } else {
      const { id } = state;

      if (!Number(id)) {
        const formatUrl = id.split('/').splice(2).join('/');
        search = formatUrl;
      } else {
        search = id;
      }
    }

    const [contentResponse, promotionsResponse] = await Promise.all([
      backend.get(`blog/contents/${search}`),
      backend.get(
        '/ecommerce/products?page=1&only_promotional=true&per_page=4'
      ),
    ]);

    const {
      data: { data },
    } = contentResponse;

    const {
      data: {
        data: { data: promotions },
      },
    } = promotionsResponse;

    setContent(data);
    setBanner(data.banner);
    setPromotionsData(promotions);

    translateDescription(data.description);

    setLoading(false);
  }, [state, pathname, translateDescription]);

  useEffect(() => {
    loadQuote();
  }, [loadQuote, pathname]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  // useEffect(())

  return (
    <>
      <Header login={() => setLoginModal(true)} active="Dicas" />

      <FullContainer>
        <Container isDesktop={isDesktop}>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <InfoContainer isDesktop={isDesktop}>
                <Content isDesktop={isDesktop}>
                  <img
                    src={banner}
                    alt=""
                    style={isDesktop ? {} : { width: '100%', height: 'auto' }}
                  />
                  <TitleContainer isDesktop={isDesktop}>
                    <Title isDesktop={isDesktop}>
                      <Translate>{content.title}</Translate>
                    </Title>
                    <ShareThisProduct>
                      <strong>Share this content:</strong>
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
                          title="See this content at AMFrutas: "
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
                  </TitleContainer>

                  <Description
                    dangerouslySetInnerHTML={{
                      __html: content.description,
                    }}
                  />
                </Content>
                {isDesktop && (
                  <ProductsList>
                    {promotionsData.length !== 0 &&
                      promotionsData.map((p, index) => (
                        <Product key={p.id} index={index} product={p} />
                      ))}
                  </ProductsList>
                )}
              </InfoContainer>
            </>
          )}
        </Container>
      </FullContainer>

      <Footer />

      {(loginModal || noFavorite) && (
        <LoginModal closeModal={() => setLoginModal(false)} />
      )}
    </>
  );
}
