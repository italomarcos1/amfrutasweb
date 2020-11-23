import React, { useCallback, useEffect, useRef, useState } from 'react';

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
  Category,
  Promotions,
  PromotionsSubTitle,
  SendButton,
  SectionTitleMenu,
  MenuButtons,
  Categories,
} from './styles';

import { nameIsValid, mailIsValid, dateIsValid } from '~/utils/validation';
import { onlyValues } from '~/utils/onlyValues';

import Header from '~/components/Header';
import Product from '~/components/Product';
import Footer from '~/components/Footer';
import Input from '~/components/HomeInput';
import InputMask from '~/components/HomeInputMask';
import SlideShow from '~/components/SlideShow';
import CategoriesCarousel from '~/components/Categories';

import DeliveryModal from '~/pages/DeliveryModal';
import LoginModal from '~/pages/LoginModal';

import productsData from '~/data';

import { api, backend } from '~/services/api';

import fallbackBanner from '~/assets/banner@2x.jpg';
import graos from '~/assets/products/nata@2x.png';

import envio from '~/assets/envio-gratuito.svg';
import cashback from '~/assets/cashback.svg';
import whatsapp from '~/assets/whatsapp.svg';
import appStore from '~/assets/appStore.svg';
import playStore from '~/assets/playStore.svg';

import chevronL from '~/assets/chevron-l.svg';
import chevronR from '~/assets/chevron-r.svg';

import macas from '~/assets/categories/macas.jpeg';
import tuberculos from '~/assets/categories/tuberculos.jpeg';
import molhos from '~/assets/categories/molhos.jpg';
import legumes from '~/assets/categories/legumes.jpeg';
import ervas from '~/assets/categories/ervas.png';
import tropicais from '~/assets/categories/tropicais.jpeg';
import citrinos from '~/assets/categories/citrinos.jpeg';

import clementina from '~/assets/blog/clementina.jpg';
import frutas from '~/assets/blog/frutas.jpeg';
import limao from '~/assets/blog/limao.jpg';
import receitas from '~/assets/blog/receitas.jpg';

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

  const carouselRef = useRef();

  const loadBanners = useCallback(async () => {
    const response = await backend.get('/banner/blocks');

    const {
      data: {
        meta: { message },
      },
    } = response;

    message.forEach(({ hash }) =>
      backend.get(`/banner/${hash}`).then(({ data: { data: { banners } } }) =>
        setBannersURL(banners)
      )
    );
  }, []);

  const loadCategories = useCallback(async () => {
    const {
      data: {
        data: { data },
      },
    } = await api.get('ecommerce/categories');

    setCategories(data);

    console.tron.log(data);
  }, []);

  useEffect(() => {
    loadBanners();
    loadCategories();
  }, []);

  console.tron.log(bannersURL);

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
          {productsData.map((p, index) => (
            <Product key={p.id} index={index} product={p} />
          ))}
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
          {productsData.map((p, index) => (
            <Product key={p.id} index={index} product={p} />
          ))}
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
          <BlogPost>
            <img src={clementina} alt="" />
            <strong>Os benefícios da clementina</strong>
            <small>
              Todos nós sabemos que os <br />
              sumos detox são ótimos para a <br />
              saúde e para o sistema imunitário
              <br /> … infelizmente muita gente acha
            </small>
          </BlogPost>
          <BlogPost>
            <img src={limao} alt="" />
            <strong>
              DIETA DO LIMÃO, PERCA PESO <br />
              JÁ
            </strong>
            <small>
              Com a dieta do limão, pode-se <br />
              emagrecer de 1 a 4 kg por mês, <br />
              principalmente quando associada
              <br /> a uma dieta …
            </small>
          </BlogPost>
          <BlogPost>
            <img src={receitas} alt="" />
            <strong>
              RECEITAS DE PRATOS VEGAN <br />
              DELICIOSAS
            </strong>
            <small>
              A base de uma alimentação
              <br /> saudável é tentar utilizar o <br />
              máximo de alimentos naturais e <br />
              pouco processados …
            </small>
          </BlogPost>
          <BlogPost>
            <img src={frutas} alt="" />
            <strong>
              Como conservar as frutas <br />
              por mais tempo
            </strong>
            <small>
              Uma das principais dificuldades
              <br /> que as pessoas enfrentam no dia <br />a dia é não ter tempo
              de ir mais <br />
              vezes à feira ou ao super … mercado para comprar frutas e verduras
            </small>
          </BlogPost>
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
            name="nickname"
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
