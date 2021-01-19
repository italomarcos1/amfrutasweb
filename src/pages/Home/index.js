import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { differenceInHours, differenceInMinutes, parseISO } from 'date-fns';

import {
  Container,
  OptionsContainer,
  Option,
  SectionTitle,
  ProductsContainer,
  SecurityContainer,
  StoreButton,
  StoreButtonContainer,
  Section,
  Location,
  NullLocation,
  BlogPost,
  Promotions,
  PromotionsSubTitle,
  SendButton,
  SectionForm,
} from './styles';

import { nameIsValid, mailIsValid, dateIsValid } from '~/utils/validation';
import { onlyValues } from '~/utils/onlyValues';

import Header from '~/components/Header';
import Product from '~/components/Product';
import Footer from '~/components/Footer';
import Input from '~/components/HomeInput';
import InputMask from '~/components/HomeInputMask';
import SlideShow from '~/components/SlideShow';
import CategoriesCarousel from '~/components/CategoriesCarousel';
import BlogsCarousel from '~/components/BlogsCarousel';
import Toast from '~/components/Toast';

import DeliveryModal from '~/pages/DeliveryModal';
import LoginModal from '~/pages/LoginModal';

import backend from '~/services/api';

import envio from '~/assets/envio-gratuito.svg';
import cashback from '~/assets/cashback.svg';
import whatsapp from '~/assets/whatsapp_green.svg';
import appStore from '~/assets/appStore.svg';
import playStore from '~/assets/playStore.svg';

import { generateUuid } from '~/store/modules/auth/actions';

export default function Home() {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const [deliveryModal, setDeliveryModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const formRef = useRef();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [birthday, setBirthDate] = useState('');
  const [birthDateError, setBirthDateError] = useState(false);

  const [invalidFields, setInvalidFields] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [bannersURL, setBannersURL] = useState([]);
  const [categories, setCategories] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [mostSold, setMostSold] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minValueFreeShipping, setMinValueFreeShipping] = useState('0.00');

  const [whatsappNumber, setWhatsappNumber] = useState('');

  const [sellerPoints, setSellerPoints] = useState([null, null, null]);

  const signed = useSelector(state => state.auth.signed);
  const profile = useSelector(state => state.user.profile);
  const cart = useSelector(state => state.cart.products);
  const noFavorite = useSelector(state => state.auth.noFavorite);
  const uuid = useSelector(state => state.auth.uuid);

  const [toastVisible, setToastVisible] = useState(false);

  const firstLogin = useSelector(state => state.auth.firstLogin);

  const history = useHistory();

  useEffect(() => {
    if (firstLogin) history.push('/painel');
  }, [history, firstLogin]);

  useEffect(() => {
    if (signed) {
      setToastVisible(true);

      const timer = setTimeout(() => {
        setToastVisible(false);
      }, 2800);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [signed]);

  const loadData = useCallback(async () => {
    const keys = ['min_value_free_shipping'];

    const [
      categoriesResponse,
      bannersResponse,
      blogResponse,
      seller,
      whatsappResponse,
    ] = await Promise.all([
      backend.get('ecommerce/categories'),
      backend.get('/banner/blocks'),
      backend.get('/blog/contents/categories/5?per_page=4'),
      backend.get('/seller-points'),
      backend.get('configurations'),
    ]);

    const {
      data: {
        data: {
          whatsapp: whatsappData,
          min_value_free_shipping: minValueFreeShippingData,
        },
      },
    } = whatsappResponse;

    setWhatsappNumber(whatsappData);
    setMinValueFreeShipping(minValueFreeShippingData);

    const {
      data: {
        data: { data },
      },
    } = categoriesResponse;

    setCategories(data);

    const {
      data: {
        meta: { message },
      },
    } = bannersResponse;

    message.forEach(({ hash }) =>
      backend.get(`/banner/${hash}`).then(({ data: { data: { banners } } }) =>
        setBannersURL(banners)
      )
    );

    const {
      data: {
        data: { data: blogResponseData },
      },
    } = blogResponse;

    setBlogData(blogResponseData);

    const {
      data: { data: sellerData },
    } = seller;

    setSellerPoints(sellerData);
  }, []);

  const loadRecommendedProducts = useCallback(async () => {
    const [recommendedIndex, mostSoldIndex] = await Promise.all([
      backend.get(
        '/ecommerce/products?page=1&per_page=6&special_order=most_viewed'
      ),
      backend.get(
        '/ecommerce/products?page=1&per_page=6&special_order=most_selled'
      ),
    ]);

    const {
      data: {
        data: { last_page: lastPageRecommended },
      },
    } = recommendedIndex;

    const {
      data: {
        data: { last_page: lastPageMostSold },
      },
    } = mostSoldIndex;

    let index = 0;
    let index2 = 0;

    do {
      index = Math.floor(Math.random() * 10);
    } while (index > lastPageRecommended);
    do {
      index2 = Math.floor(Math.random() * 10);
    } while (index2 > lastPageMostSold);

    const [recommendedResponse, mostSoldResponse] = await Promise.all([
      backend.get(
        `/ecommerce/products?page=${index}&per_page=6&special_order=most_viewed`
      ),

      backend.get(
        `/ecommerce/products?page=${index2}&per_page=6&special_order=most_selled`
      ),
    ]);

    const {
      data: {
        data: { data: recommendedData },
      },
    } = recommendedResponse;

    const {
      data: {
        data: { data: mostSoldData },
      },
    } = mostSoldResponse;

    const formattedProducts = isDesktop
      ? recommendedData
      : [
          recommendedData[0],
          recommendedData[1],
          recommendedData[2],
          recommendedData[3],
        ];

    setRecommendedProducts(formattedProducts);
    setMostSold(
      isDesktop
        ? mostSoldData
        : [mostSoldData[0], mostSoldData[1], mostSoldData[2], mostSoldData[3]]
    );

    const productsDataWithTtl = {
      ttl: new Date(),
      products: formattedProducts,
    };

    localStorage.setItem(
      '@AMFrutas:ProdutosRecomendados',
      JSON.stringify(productsDataWithTtl)
    );
  }, []);

  useEffect(() => {
    setLoading(true);
    loadData();

    const hasRecommendedProducts = localStorage.getItem(
      '@AMFrutas:ProdutosRecomendados'
    );

    if (!!hasRecommendedProducts) {
      const { ttl, products } = JSON.parse(hasRecommendedProducts);

      const currentDate = new Date();
      console.log(parseISO(ttl));
      console.log(currentDate);
      console.log(differenceInMinutes(currentDate, parseISO(ttl)));

      // if (!(differenceInHours(currentDate, parseISO(ttl)) > 23)) {
      if (!(differenceInMinutes(currentDate, parseISO(ttl)) > 1)) {
        setRecommendedProducts(products);
        setLoading(false);

        return;
      }
    }
    loadRecommendedProducts();
    setLoading(false);
  }, [loadRecommendedProducts, loadData]);

  useEffect(() => {
    if (!uuid) dispatch(generateUuid());
  }, [dispatch, uuid]);

  const handleSubmit = useCallback(
    async formData => {
      try {
        const formattedData = Object.values(formData);
        setInvalidFields(invalidFields.fill(false));
        setBirthDateError(false);
        setEmailError(false);

        const anyEmptyField = formattedData.some(field => nameIsValid(field));

        if (anyEmptyField) {
          setInvalidFields(formattedData.map(field => nameIsValid(field)));
          setBirthDateError(!dateIsValid(birthday));
          setEmailError(!mailIsValid(email));

          return;
        }

        if (!dateIsValid(birthday)) {
          setBirthDateError(!dateIsValid(birthday));
          return;
        }
        if (!mailIsValid(email)) {
          setEmailError(!mailIsValid(email));
          return;
        }

        await backend.post('newsletter/contacts', {
          name: formData.name,
          last_name: formData.last_name,
          email,
          birthday,
        });

        invalidFields.fill(false);
        setBirthDateError(false);
        setEmailError(false);

        formRef.current.reset();
        setEmail('');
        setBirthDate('');
      } catch (err) {
        console.log('Erro na newsletter');
      }
    },
    [email, birthday, invalidFields]
  );

  return (
    <>
      <Header login={() => setLoginModal(true)} />
      <Container onSubmit={handleSubmit} ref={formRef}>
        {isDesktop && <SlideShow data={bannersURL} />}
        <OptionsContainer isDesktop={isDesktop}>
          <Option href="#" rel="noreferrer" isDesktop={isDesktop}>
            <img src={envio} alt="Envio Gratuito" />
            <div>
              <strong>Envio Gratuito</strong>
              <small>Para compras acima de €&nbsp;{minValueFreeShipping}</small>
            </div>
          </Option>
          <Option href="#" rel="noreferrer" isDesktop={isDesktop}>
            <img src={cashback} alt="Cashback" />
            <div>
              <strong>Cashback</strong>
              <small>Receba euros nas compras</small>
            </div>
          </Option>
          <Option
            href={`https://api.whatsapp.com/send?phone=351${whatsappNumber}`}
            rel="noreferrer"
            isDesktop={isDesktop}
            target="_blank"
          >
            <img src={whatsapp} alt="WhatsApp" />
            <div>
              <strong>Atendimento</strong>
              <small>Dúvidas online no WhatsApp</small>
            </div>
          </Option>
        </OptionsContainer>
        <SectionTitle isDesktop={isDesktop}>
          <strong>Produtos recomendados para ti</strong>
          <small>Uma seleção especial com a qualidade garantida</small>
        </SectionTitle>
        <ProductsContainer isDesktop={isDesktop} id="productsContainer">
          {loading ? (
            <h1>Carregando...</h1>
          ) : (
            recommendedProducts.map((p, index) => (
              <Product key={p.id} index={index} product={p} />
            ))
          )}
        </ProductsContainer>
        <SecurityContainer isDesktop={isDesktop}>
          <span>
            Segurança:&nbsp;
            <b>
              Pague
              {isDesktop ? ' ' : <br />}
              somente na entrega!
            </b>
          </span>
        </SecurityContainer>
        <SectionTitle isDesktop={isDesktop}>
          <strong>Mais vendidos</strong>
          <small>Conheça os produtos mais vendidos todos os dias</small>
        </SectionTitle>
        <ProductsContainer isDesktop={isDesktop}>
          {loading ? (
            <h1>Carregando...</h1>
          ) : (
            mostSold.map((p, index) => (
              <Product key={p.id} index={index} product={p} />
            ))
          )}
        </ProductsContainer>
        <SecurityContainer
          style={isDesktop ? { height: 166 } : { height: 246 }}
          isDesktop={isDesktop}
        >
          <span>
            Encomende com
            {isDesktop ? ' ' : <br />}o App AM Frutas:
            {isDesktop ? ' ' : <br />}
            <b>Notificação na Entrega</b>
          </span>
          <StoreButtonContainer isDesktop={isDesktop}>
            <StoreButton
              href="https://apps.apple.com/pt/app/am-frutas/id1522622759"
              rel="noreferrer"
              target="_blank"
            >
              <img src={appStore} alt="" />
            </StoreButton>
            <StoreButton
              href="https://play.google.com/store/apps/details?id=com.amfrutas&amp;hl=en_US&amp;gl=US"
              rel="noreferrer"
              target="_blank"
            >
              <img src={playStore} alt="" />
            </StoreButton>
          </StoreButtonContainer>
        </SecurityContainer>
        <Section isDesktop={isDesktop}>
          {sellerPoints.map(seller =>
            seller === null ? (
              <NullLocation isDesktop={isDesktop} />
            ) : (
              <Location key={seller.id} isDesktop={isDesktop}>
                <h1>{seller.name}</h1>
                <p>{seller.address}</p>
                <p>
                  {seller.phone}
                  <br />
                  {seller.whatsapp}
                  <small>&nbsp;Whatsapp</small>
                </p>
                <p>
                  {seller.timetable_line1}
                  <br />
                  {seller.timetable_line2}
                </p>
                <p>{seller.email}</p>
                <a href={seller.location} target="_blank" rel="noreferrer">
                  <strong>Localização</strong>
                </a>
              </Location>
            )
          )}
        </Section>
        <CategoriesCarousel categories={categories} isDesktop={isDesktop} />
        <BlogsCarousel isDesktop={isDesktop}>
          {blogData.map(post => (
            <BlogPost
              key={post.id}
              to={{
                pathname: `/${post.url}`,
                state: { id: post.id },
              }}
            >
              <img src={post.thumbs} alt="" />
              <strong>{post.title}</strong>
              <small>{post.description}</small>
            </BlogPost>
          ))}
        </BlogsCarousel>
        <Promotions>Receba promoções exclusivas</Promotions>
        <PromotionsSubTitle>
          Deixe o seu e-mail e receba promoções e{isDesktop ? ' ' : <br />}
          descontos {isDesktop && <br />}
          exclusivos.
        </PromotionsSubTitle>
        <SectionForm isDesktop={isDesktop}>
          <Input
            name="name"
            error={invalidFields[0]}
            placeholder="Nome"
            inputStyle={
              isDesktop
                ? { width: 221, marginLeft: 0 }
                : { width: '100%', marginLeft: 0 }
            }
          />
          <Input
            name="last_name"
            error={invalidFields[1]}
            placeholder="Apelido"
            inputStyle={
              isDesktop
                ? { width: 221 }
                : { marginTop: 20, width: '100%', marginLeft: 0 }
            }
          />
          <InputMask
            name="birthday"
            error={invalidFields[2] || birthDateError}
            placeholder="Data de Nascimento"
            value={birthday}
            onChange={({ target: { value } }) => setBirthDate(value)}
            inputStyle={isDesktop ? { width: 221 } : { width: '100%' }}
            style={
              isDesktop
                ? { marginLeft: 20 }
                : { marginTop: 20, width: '100%', marginLeft: 0 }
            }
          />
          <div
            style={
              isDesktop
                ? { display: 'flex', marginLeft: 20 }
                : {
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    marginTop: 20,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 130,
                    padding: 0,
                  }
            }
          >
            <Input
              name="email"
              placeholder="Email"
              inputStyle={
                isDesktop
                  ? {
                      width: 221,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }
                  : { width: '100%', margin: 0 }
              }
              value={email}
              onChange={({ target: { value } }) => onlyValues(value, setEmail)}
              error={invalidFields[3] || emailError}
            />
            <SendButton
              type="submit"
              isDesktop={isDesktop}
              style={
                isDesktop
                  ? {}
                  : {
                      width: '100%',
                      marginLeft: 0,
                    }
              }
            >
              <strong>Enviar</strong>
            </SendButton>
          </div>
        </SectionForm>
      </Container>
      <Footer />
      {deliveryModal && (
        <DeliveryModal closeModal={() => setDeliveryModal(false)} />
      )}
      {(loginModal || noFavorite) && (
        <LoginModal closeModal={() => setLoginModal(false)} />
      )}
      {toastVisible && (
        <Toast
          status="Bem-vindo ao AM Frutas."
          color="#1DC167"
          isDesktop={isDesktop}
        />
      )}
    </>
  );
}
