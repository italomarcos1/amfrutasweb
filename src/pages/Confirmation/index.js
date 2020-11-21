import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Container,
  Content,
  CheckoutDetails,
  CheckoutItem,
  TopWarning,
  Title,
  ConfirmationText,
  Info,
  InfoContainer,
  SectionTitle,
  CustomInputContainer,
  CashbackCredit,
  PeriodicDeliveryContainer,
  PeriodicDeliveryItem,
  PeriodicDeliveryList,
  PeriodicDeliveryUnwantedProducts,
  PeriodicDeliveryWannaReceive,
  Options,
} from './styles';

import check from '~/assets/check_white.svg';
import checked from '~/assets/checked.svg';
import cashback from '~/assets/cashback.svg';
import minus from '~/assets/icons/minus.svg';
import plus from '~/assets/icons/plus.svg';

import delivery from '~/assets/entrega-periodica.svg';

import Footer from '~/components/Footer';

import { Button } from '~/components/LoginModal';

import CheckoutHeader from '~/components/CheckoutHeader';
import Item from '~/components/CheckoutItem';
import PeriodicDeliveryListItem from '~/components/PeriodicDeliveryListItem';

import { orderFinished } from '~/store/modules/cart/actions';

import { periodicProducts } from '~/data';

export default function Confirmation() {
  const [amount, setAmount] = useState(4);
  const [periodicDelivery, setPeriodicDelivery] = useState(true);

  const history = useHistory();
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  const isOrderFinished = useSelector(state => state.cart.orderFinished);
  const hasOrder = useSelector(state => state.cart.hasOrder);

  const cart = useSelector(state => state.cart.products);

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      dispatch(orderFinished());
    };
  }, []);

  if (!hasOrder) {
    return <Redirect to="/entrega" />;
  }

  if (cart.length === 0 || !isOrderFinished) {
    return <Redirect to="/cesto" />;
  }

  const { name, nickname, phone, email, dateOfBirth, nif } = profile;

  return (
    <>
      <CheckoutHeader active={3} />
      <Container>
        <Content>
          <TopWarning>
            <img src={check} alt="" />A sua encomenda está feita, os nossos
            colaboradores vão entrar em contacto no dia da entrega. Em caso de
            dúvidas não hesite em contactar nos através do 91 045 77 68.
          </TopWarning>
        </Content>

        <Content style={{ marginTop: 40 }}>
          <InfoContainer>
            <SectionTitle>
              <strong>Seu pedido está confirmado</strong>
              <small>Dados do comprador</small>
            </SectionTitle>
            <CustomInputContainer>
              <Info>
                <strong>Nome</strong>
                <small>{`${name} ${nickname}`}</small>
              </Info>
              <Info>
                <strong>Telemóvel</strong>
                <small>{phone}</small>
              </Info>
            </CustomInputContainer>
            <CustomInputContainer>
              <Info>
                <strong>Email</strong>
                <small>{email}</small>
              </Info>
              <Info>
                <strong>Data de Nascimento</strong>
                <small>{dateOfBirth}</small>
              </Info>
            </CustomInputContainer>
            <CustomInputContainer>
              <Info>
                <strong>NIF</strong>
                <small>{nif}</small>
              </Info>
            </CustomInputContainer>
          </InfoContainer>
          <InfoContainer>
            <SectionTitle>
              <strong>Dados da entrega</strong>
              <small>Morada</small>
            </SectionTitle>
            <CustomInputContainer>
              <Info>
                <strong>Morada</strong>
                <small>Rua 7 de Junho</small>
              </Info>
              <Info>
                <strong>Cidade</strong>
                <small>Oeiras</small>
              </Info>
            </CustomInputContainer>
            <CustomInputContainer>
              <Info>
                <strong>Código Postal</strong>
                <small>2740-164</small>
              </Info>
              <Info>
                <strong>Localidade</strong>
                <small>Portugal Continental</small>
              </Info>
            </CustomInputContainer>
            <CustomInputContainer>
              <Info>
                <strong>NIF</strong>
                <small>261 571 972</small>
              </Info>
              <Info>
                <strong>País</strong>
                <small>Portugal</small>
              </Info>
            </CustomInputContainer>
          </InfoContainer>
          <InfoContainer style={{ width: 360 }}>
            <SectionTitle>
              <strong>Crédito Cashback</strong>
              <small>Teu crédito para a próxima encomenda</small>
            </SectionTitle>
            <CashbackCredit>
              <img src={cashback} alt="Cashback" />
              <strong>€ 8,78</strong>
            </CashbackCredit>
          </InfoContainer>
        </Content>
        <Content style={{ marginTop: 40 }}>
          <div>
            <Title>Produtos</Title>
            <ul>
              {cart.map((item, index) => (
                <Item key={item.id} item={item} index={index} />
              ))}
            </ul>
          </div>
          <div>
            <Title>Resumo</Title>
            <CheckoutDetails>
              <CheckoutItem>
                <h1>Produtos</h1>
                <h2>€ 179,14</h2>
              </CheckoutItem>
              <CheckoutItem>
                <h1>Economizou</h1>
                <h2>€ 22,09</h2>
              </CheckoutItem>
              <CheckoutItem>
                <h1>Crédito Disponível</h1>
                <h2 style={{ color: '#0CB68B' }}>€ 5,12</h2>
              </CheckoutItem>
              <CheckoutItem>
                <h1>Desconto do CUPOM</h1>
                <h2 style={{ color: '#0CB68B' }}>€ 10,00</h2>
              </CheckoutItem>
              <CheckoutItem>
                <h1>Porte</h1>
                <h2 style={{ color: '#0CB68B' }}>Grátis</h2>
              </CheckoutItem>
              <CheckoutItem>
                <h2>Total</h2>
                <h2 style={{ fontSize: 25, color: '#0CB68B' }}>174,62</h2>
              </CheckoutItem>
              <ConfirmationText>
                A confirmação da sua encomenda será feita <br />
                através de contacto telefónico pelos nossos <br />
                colaboradores no dia da entrega.
              </ConfirmationText>
            </CheckoutDetails>
          </div>
        </Content>

        <PeriodicDeliveryContainer>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={delivery}
              alt=""
              style={{
                height: 48,
                width: 52,
              }}
            />
            <span>
              <p>
                Entrega&nbsp;
                <b>Periódica</b>
              </p>
            </span>
          </div>
          <PeriodicDeliveryItem
            onClick={() => setPeriodicDelivery(true)}
            selected={periodicDelivery}
          >
            <span>
              <img src={checked} alt="Item selecionado" />
            </span>
            <div>
              <strong>
                Sim, quero um <b>5% de desconto</b> em todas as minhas entregas
                frequentes.
              </strong>
              <br />
              <small>
                Poupe <b>5% com desconto</b> extra em entregas frequentes!
              </small>
            </div>
          </PeriodicDeliveryItem>
          <div
            style={
              periodicDelivery ? { display: 'block' } : { display: 'none' }
            }
          >
            <PeriodicDeliveryList>
              {periodicProducts.map(({ id, picture, selected }) => (
                <PeriodicDeliveryListItem
                  key={id}
                  image={picture}
                  value={selected}
                />
              ))}
            </PeriodicDeliveryList>
            <PeriodicDeliveryUnwantedProducts>
              Desmarque os produtos que você não deseja incluir na sua Entrega
              Periódica.
            </PeriodicDeliveryUnwantedProducts>
            <PeriodicDeliveryWannaReceive>
              <small>
                <b>Receber a cada</b>
              </small>
              <Options>
                <button
                  type="button"
                  disabled={amount === 0}
                  onClick={() => setAmount(amount - 1)}
                  style={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  <img src={minus} alt="icon" />
                </button>
                <strong>{amount}</strong>
                <button
                  type="button"
                  onClick={() => setAmount(amount + 1)}
                  style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                >
                  <img src={plus} alt="icon" />
                </button>
              </Options>
              <small>
                <b>semanas</b>&nbsp;(pode pausar ou cancelar a qualquer momento)
              </small>
            </PeriodicDeliveryWannaReceive>
          </div>
          <PeriodicDeliveryItem
            onClick={() => setPeriodicDelivery(false)}
            selected={!periodicDelivery}
          >
            <span>
              <img src={checked} alt="Item selecionado" />
            </span>
            <div>
              <small>
                Não, Obrigado.
                <br /> Eu só quero receber esse pedido uma vez.
              </small>
            </div>
          </PeriodicDeliveryItem>
        </PeriodicDeliveryContainer>
        <Button
          color="#2CBDD3"
          shadowColor="#26A5BB"
          style={{
            width: 217,
            marginTop: 49,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          onClick={() => history.push('/encomendas')}
        >
          Minhas&nbsp;<b>Encomendas</b>
        </Button>
      </Container>
      <Footer />
    </>
  );
}
