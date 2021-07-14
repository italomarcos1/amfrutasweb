import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { differenceInMinutes, parseISO } from 'date-fns';
import { useQuery } from 'react-query';
import OneSignal from 'react-onesignal';

import { Translate } from 'react-auto-translate';

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

import { fixAddToCart, fixOrderFinished } from '~/store/modules/cart/actions';

import Header from '~/uk/components/Header';
import Product from '~/uk/components/Product';
import Footer from '~/uk/components/Footer';
import Input from '~/uk/components/HomeInput';
import InputMask from '~/uk/components/HomeInputMask';
import SlideShow from '~/uk/components/SlideShow';
import CategoriesCarousel from '~/uk/components/CategoriesCarousel';
import BlogsCarousel from '~/uk/components/BlogsCarousel';
import Toast from '~/uk/components/Toast';

import DeliveryModal from '~/uk/pages/DeliveryModal';
import LoginModal from '~/uk/pages/LoginModal';

import backend from '~/services/api';

import envio from '~/assets/envio-gratuito.svg';
import cashback from '~/assets/cashback.svg';
import whatsappGreen from '~/assets/whatsapp_green.svg';
import appStore from '~/assets/appStore.svg';
import playStore from '~/assets/playStore.svg';

import { setUuid, loginLoadingError } from '~/store/modules/auth/actions';
import { googleTranslate } from '~/services/googleTranslate';

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
  // const [recommendedProducts, setRecommendedProducts] = useState([]);

  const signed = useSelector(state => state.auth.signed);
  const profile = useSelector(state => state.user.profile);
  const cart = useSelector(state => state.cart.products);
  const noFavorite = useSelector(state => state.auth.noFavorite);

  const [toastVisible, setToastVisible] = useState(false);

  const firstLogin = useSelector(state => state.auth.firstLogin);

  const history = useHistory();

  useEffect(() => {
    if (firstLogin) history.push('/dashboard');
    dispatch(fixAddToCart());
    dispatch(fixOrderFinished());
    dispatch(loginLoadingError());
  }, [history, dispatch, firstLogin]);

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

  const loadWhatsappAndShipping = useCallback(async () => {
    const keys = ['whatsapp', 'min_value_free_shipping'];
    const {
      data: { data },
    } = await backend.get(`configurations?keys=${keys.join()}`);

    return data;
  }, []);

  const loadBanners = useCallback(async () => {
    const {
      data: {
        meta: { message },
      },
    } = await backend.get('/banner/blocks');

    const {
      data: {
        data: { banners },
      },
    } = await backend.get(`/banner/${message[0].hash}`);

    return banners;
  }, []);

  const loadSellerPoints = useCallback(async () => {
    const {
      data: { data },
    } = await backend.get('/seller-points');

    return data;
  }, []);

  const loadBlog = useCallback(async () => {
    const {
      data: {
        data: { data },
      },
    } = await backend.get('/blog/contents/categories/5?per_page=4');

    return data;
  }, []);

  const loadCategories = useCallback(async () => {
    const {
      data: {
        data: { data },
      },
    } = await backend.get('ecommerce/categories');

    return data;
  }, []);

  const loadRecommendedProducts = useCallback(async () => {
    const {
      data: {
        data: { last_page: lastPageRecommended },
      },
    } = await backend.get(
      '/ecommerce/products?page=1&per_page=6&special_order=most_viewed'
    );

    let index = 0;

    do {
      index = Math.floor(Math.random() * 10);
    } while (index > lastPageRecommended);

    const {
      data: {
        data: { data: recommendedData },
      },
    } = await backend.get(
      `/ecommerce/products?page=${index}&per_page=6&special_order=most_viewed`
    );

    const formattedProducts = isDesktop
      ? recommendedData
      : [
          recommendedData[0],
          recommendedData[1],
          recommendedData[2],
          recommendedData[3],
        ];

    return formattedProducts;
  }, [isDesktop]);

  const loadMostSold = useCallback(async () => {
    const {
      data: {
        data: { last_page: lastPageMostSold },
      },
    } = await backend.get(
      '/ecommerce/products?page=1&per_page=6&special_order=most_selled'
    );

    let index = 0;

    do {
      index = Math.floor(Math.random() * 10);
    } while (index > lastPageMostSold);

    const {
      data: {
        data: { data: mostSoldData },
      },
    } = await backend.get(
      `/ecommerce/products?page=${index}&per_page=6&special_order=most_selled`
    );

    const formattedMostSold = isDesktop
      ? mostSoldData
      : [mostSoldData[0], mostSoldData[1], mostSoldData[2], mostSoldData[3]];

    return formattedMostSold;
  }, [isDesktop]);

  useEffect(() => {
    backend.interceptors.request.use(async config => {
      dispatch(setUuid(config.headers.common.uuid));

      return config;
    });

    if (!window.OneSignal) {
      OneSignal.initialize('e6c7df22-1200-4ab7-bfff-8001bf13a921', {
        subdomainName: 'https://amfrutas.pt',
        notifyButton: {
          enable: true,
        },
        autoRegister: true,
        autoResubscribe: true,
      });
    }
  }, [dispatch]);

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

  const { data: recommendedProducts, isLoading } = useQuery(
    'recommendedProducts',
    loadRecommendedProducts,
    {
      staleTime: 1000 * 60 * 20,
    }
  );

  const { data: sellerPoints, isLoading: sellerIsLoading } = useQuery(
    'sellerPoints',
    loadSellerPoints,
    {
      staleTime: 1000 * 60 * 60 * 24 * 5, // 120 hours | 5 days
    }
  );

  const { data: blogData, isLoading: blogIsLoading } = useQuery(
    'blogData',
    loadBlog,
    {
      staleTime: 1000 * 60 * 60 * 12, // 12 hours
    }
  );

  const { data: mostSold, isLoading: mostSoldIsLoading } = useQuery(
    'mostSold',
    loadMostSold,
    {
      staleTime: 1000 * 60 * 60, // 1 hour
    }
  );

  const { data: categories, isLoading: categoriesIsLoading } = useQuery(
    'categories',
    loadCategories,
    {
      staleTime: 1000 * 60 * 60 * 24 * 3, // 72 hours | 3 days
    }
  );

  const { data: banners, isLoading: bannerIsLoading } = useQuery(
    'banners',
    loadBanners,
    {
      staleTime: 1000 * 60 * 60 * 10, // 10 hours
    }
  );

  const { data, isLoading: menuLoading } = useQuery(
    'whatsappAndShipping',
    loadWhatsappAndShipping,
    {
      staleTime: 1000 * 60 * 60 * 10, // 10 hours
    }
  );

  return (
    <>
      <Header login={() => setLoginModal(true)} />
      <Container onSubmit={handleSubmit} ref={formRef}>
        {!bannerIsLoading && isDesktop && <SlideShow data={banners} />}
        <OptionsContainer isDesktop={isDesktop}>
          <Option href="#" rel="noreferrer" isDesktop={isDesktop}>
            <img src={envio} alt="Envio Gratuito" />
            <div>
              <strong>Free Shipping</strong>
              {!menuLoading && (
                <small>
                  For any purchase over €&nbsp;{data.min_value_free_shipping}
                </small>
              )}
            </div>
          </Option>
          <Option href="#" rel="noreferrer" isDesktop={isDesktop}>
            <img src={cashback} alt="Cashback" />
            <div>
              <strong>Cashback</strong>
              <small>Earn euros on purchases</small>
            </div>
          </Option>
          <Option
            href={`https://api.whatsapp.com/send?phone=351${
              menuLoading ? '' : data.whatsapp
            }`}
            rel="noreferrer"
            isDesktop={isDesktop}
            target="_blank"
          >
            <img src={whatsappGreen} alt="WhatsApp" />
            <div>
              <strong>Customer Service</strong>
              <small>Get in touch via WhatsApp</small>
            </div>
          </Option>
        </OptionsContainer>
        <SectionTitle isDesktop={isDesktop}>
          <strong>Recommended Products for You</strong>
          <small>A special selection with guaranteed quality</small>
        </SectionTitle>
        <ProductsContainer isDesktop={isDesktop} id="productsContainer">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            recommendedProducts.map((p, index) => (
              <Product key={p.id} index={index} product={p} />
            ))
          )}
        </ProductsContainer>
        <SecurityContainer isDesktop={isDesktop}>
          <span>
            Safety:&nbsp;
            <b>
              Pay it
              {isDesktop ? ' ' : <br />}
              only at arrival!
            </b>
          </span>
        </SecurityContainer>
        <SectionTitle isDesktop={isDesktop}>
          <strong>Most Sold</strong>
          <small>The Most Sold products every day</small>
        </SectionTitle>
        <ProductsContainer isDesktop={isDesktop}>
          {mostSoldIsLoading ? (
            <h1>Loading...</h1>
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
            Order by
            {isDesktop ? ' ' : <br />}the AMFrutas app:
            {isDesktop ? ' ' : <br />}
            <b>Notification at Delivery</b>
          </span>
          <StoreButtonContainer isDesktop={isDesktop}>
            <StoreButton
              href="https://apps.apple.com/pt/app/am-frutas/id1522622759"
              rel="noreferrer"
              target="_blank"
            >
              <img src={appStore} alt="AppStore" />
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
          {!sellerIsLoading &&
            sellerPoints.map(seller => (
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
                  <strong>Location</strong>
                </a>
              </Location>
            ))}
        </Section>

        {!categoriesIsLoading && (
          <CategoriesCarousel categories={categories} isDesktop={isDesktop} />
        )}

        <BlogsCarousel isDesktop={isDesktop}>
          {!blogIsLoading &&
            blogData.map(post => (
              <BlogPost
                key={post.id}
                to={{
                  pathname: `/${post.url}`,
                  state: { id: post.id },
                }}
              >
                <img src={post.thumbs} alt="" />
                <strong>
                  <Translate>{post.title}</Translate>
                </strong>
                <small>
                  <Translate>{post.description}</Translate>
                </small>
              </BlogPost>
            ))}
        </BlogsCarousel>

        <Promotions>Get exclusive promotions</Promotions>
        <PromotionsSubTitle>
          Leave your e-mail to get promotions and{isDesktop ? ' ' : <br />}
          exclusives {isDesktop && <br />}
          discounts.
        </PromotionsSubTitle>
        <SectionForm isDesktop={isDesktop}>
          <Input
            name="name"
            error={invalidFields[0]}
            placeholder="Name"
            inputStyle={
              isDesktop
                ? { width: 221, marginLeft: 0 }
                : { width: '100%', marginLeft: 0 }
            }
          />
          <Input
            name="last_name"
            error={invalidFields[1]}
            placeholder="Last name"
            inputStyle={
              isDesktop
                ? { width: 221 }
                : { marginTop: 20, width: '100%', marginLeft: 0 }
            }
          />
          <InputMask
            name="birthday"
            error={invalidFields[2] || birthDateError}
            placeholder="Birthdate"
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
              <strong>Send</strong>
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
          status="Welcome to AM Frutas."
          color="#1DC167"
          isDesktop={isDesktop}
        />
      )}
    </>
  );
}
