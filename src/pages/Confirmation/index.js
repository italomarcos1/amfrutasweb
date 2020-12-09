import React, { useCallback, useEffect, useState } from 'react';
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
  WithdrawContainer,
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
import Item from '~/components/ConfirmationItem';
import PeriodicDeliveryListItem from '~/components/PeriodicDeliveryListItem';
import ItemsList from '~/components/ItemsList';

import { knightFall } from '~/store/modules/user/actions';

import { periodicProducts } from '~/data';

import backend from '~/services/api';
import { calculatePrice, formatPrice } from '~/utils/calculatePrice';

export default function Confirmation() {
  const [qty, setQty] = useState(4);
  const [periodicDelivery, setPeriodicDelivery] = useState(true);

  const history = useHistory();
  const dispatch = useDispatch();

  const isOrderFinished = useSelector(state => state.cart.orderFinished);
  const hasOrder = useSelector(state => state.cart.hasOrder);

  const profile = useSelector(state => state.user.profile);

  const finalProfile = useSelector(state => state.user.finalProfile);
  const finalAddress = useSelector(state => state.addresses.finalAddress);
  const order = useSelector(state => state.user.order);
  const cart = useSelector(state => state.cart.products);

  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [orderInfo, setOrderInfo] = useState(null);
  const [saved, setSaved] = useState(null);

  const loadData = useCallback(async () => {
    if (!order) return;
    const {
      data: { data },
    } = await backend.get(`clients/transactions/${order.id}`);

    const { products } = data;
    const { formattedSavedPrice, formattedPrice } = calculatePrice(products);
    setSaved(formatPrice(formattedSavedPrice - formattedPrice));

    setOrderInfo(data);
  }, [order]);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadData();
  }, [loadData]);

  useEffect(() => {
    return () => {
      dispatch(knightFall());
    };
  }, []);

  const handlePagination = useCallback(() => {
    if (!orderInfo) return;
    const { products } = orderInfo;
    const pageIndex = 8 * (currentPage - 1);
    const newPage = products.slice(pageIndex, pageIndex + 8);

    setPaginatedProducts(newPage);
  }, [currentPage, orderInfo]);

  useEffect(() => {
    handlePagination();
  }, [cart, handlePagination]);

  if (!hasOrder) {
    return <Redirect to="/entrega" />;
  }

  if (cart.length === 0 || !isOrderFinished) {
    return <Redirect to="/cesto" />;
  }

  const { name, last_name, phone, email, birth, document } = finalProfile;

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
                <small>{`${name} ${last_name}`}</small>
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
                <small>{birth}</small>
              </Info>
            </CustomInputContainer>
            <CustomInputContainer>
              <Info>
                <strong>NIF</strong>
                <small>{document}</small>
              </Info>
            </CustomInputContainer>
          </InfoContainer>
          {!!finalAddress ? (
            <InfoContainer>
              <SectionTitle>
                <strong>Dados da entrega</strong>
                <small>Morada</small>
              </SectionTitle>
              <CustomInputContainer>
                <Info>
                  <strong>Morada</strong>
                  <small>{finalAddress.address}</small>
                </Info>
                <Info>
                  <strong>Cidade</strong>
                  <small>{finalAddress.city}</small>
                </Info>
              </CustomInputContainer>
              <CustomInputContainer>
                <Info>
                  <strong>Código Postal</strong>
                  <small>{finalAddress.zipcode}</small>
                </Info>
                <Info>
                  <strong>Localidade</strong>
                  <small>{finalAddress.state}</small>
                </Info>
              </CustomInputContainer>
              <CustomInputContainer>
                <Info>
                  <strong>NIF</strong>
                  <small>{document}</small>
                </Info>
                <Info>
                  <strong>País</strong>
                  <small>Portugal</small>
                </Info>
              </CustomInputContainer>
            </InfoContainer>
          ) : (
            <WithdrawContainer>
              <strong>
                A retirada na loja deve ocorrer no endereço abaixo:
                <br />
                <b>Av. da República 1058 2775-271 Parede</b>
              </strong>
            </WithdrawContainer>
          )}
          <InfoContainer style={{ width: 360 }}>
            <SectionTitle>
              <strong>Crédito Cashback</strong>
              <small>Teu crédito para a próxima encomenda</small>
            </SectionTitle>
            <CashbackCredit>
              <img src={cashback} alt="Cashback" />
              <strong>
                €&nbsp;
                {!!profile
                  ? !!profile.cback_credit
                    ? profile.cback_credit
                    : '0.00'
                  : '0.00'}
              </strong>
            </CashbackCredit>
          </InfoContainer>
        </Content>
        <Content style={{ marginTop: 40 }}>
          <div>
            <Title>Produtos</Title>
            <ItemsList
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            >
              {paginatedProducts.length !== 0 ? (
                paginatedProducts.map((item, index) => (
                  <Item key={item.id} item={item} index={index} />
                ))
              ) : (
                <h1>Carregando...</h1>
              )}
            </ItemsList>
          </div>
          <div>
            <Title>Resumo</Title>
            <CheckoutDetails>
              <CheckoutItem>
                <h1>Produtos</h1>
                <h2>{!!orderInfo ? `${orderInfo.total}` : '0.00'}</h2>
              </CheckoutItem>
              <CheckoutItem>
                <h1>Economizou</h1>
                <h2>€&nbsp;{!!orderInfo ? saved : '0.00'}</h2>
              </CheckoutItem>
              <CheckoutItem>
                <h1>Crédito Disponível</h1>
                <h2 style={{ color: '#0CB68B' }}>
                  €&nbsp;
                  {!!profile
                    ? !!profile.cback_credit
                      ? profile.cback_credit
                      : '0.00'
                    : '0.00'}
                </h2>
              </CheckoutItem>
              <CheckoutItem>
                <h1>Desconto do CUPOM</h1>
                <h2 style={{ color: '#0CB68B' }}>
                  €&nbsp;{!!orderInfo ? `${orderInfo.discount}.00` : '0.00'}
                </h2>
              </CheckoutItem>
              <CheckoutItem>
                <h1>Porte</h1>
                <h2 style={{ color: '#0CB68B' }}>
                  €&nbsp;{!!orderInfo ? `${orderInfo.shipping}.00` : '0.00'}
                </h2>
              </CheckoutItem>
              <CheckoutItem>
                <h2>Total</h2>
                <h2 style={{ fontSize: 25, color: '#0CB68B' }}>
                  €&nbsp;
                  {!!orderInfo
                    ? formatPrice(
                        orderInfo.total -
                          orderInfo.discount +
                          orderInfo.shipping
                      )
                    : '0.00'}
                </h2>
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
                  disabled={qty === 0}
                  onClick={() => setQty(qty - 1)}
                  style={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  <img src={minus} alt="icon" />
                </button>
                <strong>{qty}</strong>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
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
          onClick={() => {
            dispatch(knightFall());
            history.push('/encomendas');
          }}
        >
          Minhas&nbsp;<b>Encomendas</b>
        </Button>
      </Container>
      <Footer />
    </>
  );
}
