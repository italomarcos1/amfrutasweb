import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

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
import Toast from '~/components/Toast';

import DeliveryModal from '~/pages/DeliveryModal';
import LoginModal from '~/pages/LoginModal';

import backend from '~/services/api';

import envio from '~/assets/envio-gratuito.svg';
import cashback from '~/assets/cashback.svg';
import whatsapp from '~/assets/whatsapp_green.svg';
import appStore from '~/assets/appStore.svg';
import playStore from '~/assets/playStore.svg';

export default function Home() {
  const [deliveryModal, setDeliveryModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const formRef = useRef();

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
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sellerPoints, setSellerPoints] = useState([null, null, null]);

  const signed = useSelector(state => state.auth.signed);
  const profile = useSelector(state => state.user.profile);
  const noFavorite = useSelector(state => state.auth.noFavorite);
  const [toastVisible, setToastVisible] = useState(false);

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
    const [
      categoriesResponse,
      bannersResponse,
      blogResponse,
      promotionsResponse,
      seller,
    ] = await Promise.all([
      backend.get('ecommerce/categories'),
      backend.get('/banner/blocks'),
      backend.get('/blog/contents/categories/5?per_page=4'),
      backend.get(
        '/ecommerce/products?page=1&only_promotional=true&per_page=6'
      ),
      backend.get('/seller-points'),
    ]);

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
      data: {
        data: { data: promotionsResponseData },
      },
    } = promotionsResponse;

    setPromotions(promotionsResponseData);

    const {
      data: { data: sellerData },
    } = seller;

    setSellerPoints(sellerData);
  }, []);

  useEffect(() => {
    setLoading(true);
    loadData();
    setLoading(false);
  }, []);

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

        console.log('done');
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
        <SlideShow data={bannersURL} />
        <OptionsContainer>
          <Option href="#" rel="noreferrer">
            <img src={envio} alt="Envio Gratuito" />
            <div>
              <strong>Envio Gratuito</strong>
              <small>Para compras acima de € 50,00</small>
            </div>
          </Option>
          <Option href="#" rel="noreferrer">
            <img src={cashback} alt="Cashback" />
            <div>
              <strong>Cashback</strong>
              <small>Receba euros nas compras</small>
            </div>
          </Option>
          <Option
            href="https://api.whatsapp.com/send?phone=351910457768"
            rel="noreferrer"
            target="_blank"
          >
            <img src={whatsapp} alt="WhatsApp" />
            <div>
              <strong>Atendimento</strong>
              <small>Dúvidas online no WhatsApp</small>
            </div>
          </Option>
        </OptionsContainer>
        <SectionTitle>
          <strong>Produtos recomendados para ti</strong>
          <small>Uma seleção especial com a qualidade garantida</small>
        </SectionTitle>
        <ProductsContainer>
          {loading ? (
            <h1>Carregando...</h1>
          ) : (
            promotions.map((p, index) => (
              <Product key={p.id} index={index} product={p} />
            ))
          )}
        </ProductsContainer>
        <SecurityContainer>
          <span>
            Segurança:&nbsp;
            <b>Pague somente na entrega!</b>
          </span>
        </SecurityContainer>
        <SectionTitle>
          <strong>Mais vendidos</strong>
          <small>Conheça os produtos mais vendidos todos os dias</small>
        </SectionTitle>
        <ProductsContainer>
          {loading ? (
            <h1>Carregando...</h1>
          ) : (
            promotions.map((p, index) => (
              <Product key={p.id} index={index} product={p} />
            ))
          )}
        </ProductsContainer>
        <SecurityContainer style={{ height: 166 }}>
          <span>
            Encomende com o App AM Frutas:&nbsp;
            <b>Notificação na Entrega</b>
          </span>
          <StoreButtonContainer>
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

        <Section>
          {sellerPoints.map(seller =>
            seller === null ? (
              <NullLocation />
            ) : (
              <Location key={seller.id}>
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
        <CategoriesCarousel categories={categories} />
        <SectionTitle>
          <strong>Blog</strong>
          <small>Dicas de receitas com frutas e verduras</small>
        </SectionTitle>
        <Section style={{ height: 332 }}>
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
        </Section>
        <Promotions>Receba promoções exclusivas</Promotions>
        <PromotionsSubTitle>
          Deixe o seu e-mail e receba promoções e descontos <br />
          exclusivos.
        </PromotionsSubTitle>
        <Section
          style={{
            height: 50,
            marginTop: 42,
            width: 915,
            justifyContent: 'flex-start',
          }}
        >
          <Input name="name" error={invalidFields[0]} placeholder="Nome" />
          <Input
            name="last_name"
            error={invalidFields[1]}
            placeholder="Apelido"
          />
          <InputMask
            name="birthday"
            error={invalidFields[2] || birthDateError}
            placeholder="Data de Nascimento"
            value={birthday}
            onChange={({ target: { value } }) => setBirthDate(value)}
          />
          <div style={{ display: 'flex', marginLeft: 20 }}>
            <Input
              name="email"
              placeholder="Email"
              style={{
                width: 274,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
              value={email}
              onChange={({ target: { value } }) => onlyValues(value, setEmail)}
              error={invalidFields[3] || emailError}
            />
            <SendButton type="submit">Enviar</SendButton>
          </div>
        </Section>
      </Container>
      <Footer />
      {deliveryModal && (
        <DeliveryModal closeModal={() => setDeliveryModal(false)} />
      )}
      {(loginModal || noFavorite) && (
        <LoginModal closeModal={() => setLoginModal(false)} />
      )}
      {toastVisible && (
        <Toast status="Bem-vindo ao AM Frutas." color="#1DC167" />
      )}
    </>
  );
}
