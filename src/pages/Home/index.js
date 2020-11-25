import React, { useCallback, useEffect, useState } from 'react';

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

import DeliveryModal from '~/pages/DeliveryModal';
import LoginModal from '~/pages/LoginModal';

import { api, backend } from '~/services/api';

import envio from '~/assets/envio-gratuito.svg';
import cashback from '~/assets/cashback.svg';
import whatsapp from '~/assets/whatsapp.svg';
import appStore from '~/assets/appStore.svg';
import playStore from '~/assets/playStore.svg';

export default function Home() {
  const [deliveryModal, setDeliveryModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [birthDate, setBirthDate] = useState('');
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

  const loadData = useCallback(async () => {
    const [
      categoriesResponse,
      bannersResponse,
      blogResponse,
      promotionsResponse,
    ] = await Promise.all([
      api.get('ecommerce/categories'),
      backend.get('/banner/blocks'),
      backend.get('/blog/contents/categories/5?per_page=4'),
      backend.get(
        '/ecommerce/products?page=1&only_promotional=true&per_page=6'
      ),
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
  }, []);

  useEffect(() => {
    setLoading(true);
    loadData();
    setLoading(false);
  }, []);

  const handleSubmit = useCallback(
    formData => {
      const formattedData = Object.values(formData);
      invalidFields.fill(false);
      setBirthDateError(false);
      setEmailError(false);

      const anyEmptyField = formattedData.some(field => nameIsValid(field));

      if (anyEmptyField) {
        setInvalidFields(formattedData.map(field => nameIsValid(field)));
        return;
      }

      if (!dateIsValid(birthDate)) {
        setBirthDateError(!dateIsValid(birthDate));
        return;
      }
      if (!mailIsValid(email)) {
        setEmailError(!mailIsValid(email));
        return;
      }

      console.log('done');
    },
    [email, birthDate, invalidFields]
  );

  return (
    <>
      <Header login={() => setLoginModal(true)} />
      <Container onSubmit={handleSubmit}>
        <SlideShow data={bannersURL} />
        <OptionsContainer>
          <Option>
            <img src={envio} alt="Envio Gratuito" />
            <div>
              <strong>Envio Gratuito</strong>
              <small>Para compras acima de € 50,00</small>
            </div>
          </Option>
          <Option>
            <img src={cashback} alt="Cashback" />
            <div>
              <strong>Cashback</strong>
              <small>Receba euros nas compras</small>
            </div>
          </Option>
          <Option>
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
            <StoreButton>
              <img src={appStore} alt="" />
            </StoreButton>
            <StoreButton>
              <img src={playStore} alt="" />
            </StoreButton>
          </StoreButtonContainer>
        </SecurityContainer>

        <Section>
          <Location>
            <h1>A.M. Frutas Oeiras</h1>
            <p>
              Rua A Gazeta D&apos;Oeiras 10B 2780-171 <br />
              Oeiras
            </p>
            <p>
              91 045 77 68
              <br />
              91 045 77 68 <small>Whatsapp</small>
            </p>
            <p>
              Seg-Sáb 09:30 - 20:00
              <br />
              Domingo Encerrado
            </p>
            <p>oeiras@amfrutas.pt</p>
            <button type="button">Localização</button>
          </Location>
          <Location>
            <h1>A.M. Frutas Parede</h1>
            <p>
              Rua Samuel Gonçalves Sanches
              <br />
              160-249 2765-280 Estoril
            </p>
            <p>
              91 045 77 68
              <br />
              91 045 77 68 <small>Whatsapp</small>
            </p>
            <p>
              Seg-Sáb 09:30 - 20:00
              <br />
              Domingo Encerrado
            </p>
            <p>parede@amfrutas.pt</p>
            <button type="button">Localização</button>
          </Location>
          <Location>
            <h1>A.M. Frutas Estoril</h1>
            <p>
              Rua Samuel Gonçalves Sanches
              <br />
              160-249 2765-280 Estoril
            </p>
            <p>
              91 045 77 68
              <br />
              91 045 77 68 <small>Whatsapp</small>
            </p>
            <p>
              Seg-Sáb 09:30 - 20:00
              <br />
              Domingo Encerrado
            </p>
            <p>estoril@amfrutas.pt</p>
            <button type="button">Localização</button>
          </Location>
        </Section>
        <CategoriesCarousel categories={categories} />
        <SectionTitle>
          <strong>Blog</strong>
          <small>Dicas de receitas com frutas e verduras</small>
        </SectionTitle>
        <Section style={{ height: 332 }}>
          {blogData.map(post => (
            <BlogPost>
              <img src={post.thumbs} alt="" />
              <strong>{post.title}</strong>
              {/* <small>
              Todos nós sabemos que os <br />
              sumos detox são ótimos para a <br />
              saúde e para o sistema imunitário
              <br /> … infelizmente muita gente acha
            </small> */}
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
            name="birthDate"
            error={invalidFields[2] || birthDateError}
            placeholder="Data de Nascimento"
            value={birthDate}
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
      {loginModal && <LoginModal closeModal={() => setLoginModal(false)} />}
    </>
  );
}
