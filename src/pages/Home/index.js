import React, { useState } from 'react';

import {
  Container,
  Banner,
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
  Input,
  SendButton,
} from './styles';

import Header from '~/components/Header';
import Product from '~/components/Product';

import DeliveryModal from '~/pages/DeliveryModal';
import LoginModal from '~/pages/LoginModal';

import data from '~/data';

import banner from '~/assets/banner@2x.jpg';
import graos from '~/assets/products/nata@2x.png';

import envio from '~/assets/envio-gratuito.svg';
import cashback from '~/assets/cashback.svg';
import whatsapp from '~/assets/whatsapp.svg';
import appStore from '~/assets/appStore.svg';
import playStore from '~/assets/playStore.svg';

export default function Home() {
  const [deliveryModal, setDeliveryModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  return (
    <>
      <Header login={() => setLoginModal(true)} />
      <Container>
        <Banner onClick={() => setDeliveryModal(true)}>
          <img src={banner} alt="banner" />
        </Banner>
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
          {data.map((p, index) => (
            <Product key={p.id} index={index} product={p} />
          ))}
        </ProductsContainer>
        <SecurityContainer>
          <span>
            Segurança:&nbsp;
            <b style={{ fontFamily: 'SFProBold' }}>Pague somente na entrega!</b>
          </span>
        </SecurityContainer>
        <SectionTitle>
          <strong>Mais vendidos</strong>
          <small>Conheça os produtos mais vendidos todos os dias</small>
        </SectionTitle>
        <ProductsContainer>
          {data.map((p, index) => (
            <Product key={p.id} index={index} product={p} />
          ))}
        </ProductsContainer>
        <SecurityContainer style={{ height: 166 }}>
          <span>
            Encomende com o App AM Frutas:&nbsp;
            <b style={{ fontFamily: 'SFProBold' }}>Notificação na Entrega</b>
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
        <SectionTitle>
          <strong>Categorias</strong>
          <small>Visite todas as categorias do site</small>
        </SectionTitle>
        <Section style={{ height: 146 }}>
          <Category>
            <img src={graos} alt="" />
            <small>Maçãs e Pêras</small>
          </Category>
          <Category>
            <img src={graos} alt="" />
            <small>Tubérculos</small>
          </Category>
          <Category>
            <img src={graos} alt="" />
            <small>
              Molhos, Temperos <br />e Especiarias
            </small>
          </Category>
          <Category>
            <img src={graos} alt="" />
            <small>Legumes</small>
          </Category>
          <Category>
            <img src={graos} alt="" />
            <small>Ervas Aromáticas</small>
          </Category>
          <Category>
            <img src={graos} alt="" />
            <small>Tropicais</small>
          </Category>
          <Category>
            <img src={graos} alt="" />
            <small>Citrinos</small>
          </Category>
        </Section>
        <SectionTitle>
          <strong>Blog</strong>
          <small>Dicas de receitas com frutas e verduras</small>
        </SectionTitle>
        <Section style={{ height: 332 }}>
          <BlogPost>
            <img src={graos} alt="" />
            <strong>Os benefícios da clementina</strong>
            <small>
              Todos nós sabemos que os <br />
              sumos detox são ótimos para a <br />
              saúde e para o sistema imunitário
              <br /> … infelizmente muita gente acha
            </small>
          </BlogPost>
          <BlogPost>
            <img src={graos} alt="" />
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
            <img src={graos} alt="" />
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
            <img src={graos} alt="" />
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
        <Section style={{ height: 50, marginTop: 42, width: 1015 }}>
          <Input placeholder="Nome" />
          <Input placeholder="Apelido" />
          <Input placeholder="Data de Nascimento" />
          <div style={{ display: 'flex' }}>
            <Input
              placeholder="Email"
              style={{
                width: 274,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
            />
            <SendButton>Enviar</SendButton>
          </div>
        </Section>
      </Container>
      {deliveryModal && (
        <DeliveryModal closeModal={() => setDeliveryModal(false)} />
      )}
      {loginModal && <LoginModal closeModal={() => setLoginModal(false)} />}
    </>
  );
}
