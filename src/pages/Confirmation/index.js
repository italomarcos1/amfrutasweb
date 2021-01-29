import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

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
  // PeriodicDeliveryContainer,
  // PeriodicDeliveryItem,
  // PeriodicDeliveryList,
  // PeriodicDeliveryUnwantedProducts,
  // PeriodicDeliveryWannaReceive,
  // Options,
  WithdrawContainer,
} from './styles';

import check from '~/assets/check_white.svg';
// import checked from '~/assets/checked.svg';
import cashback from '~/assets/cashback.svg';
// import minus from '~/assets/icons/minus.svg';
// import plus from '~/assets/icons/plus.svg';

// import delivery from '~/assets/entrega-periodica.svg';

import Footer from '~/components/Footer';

import { Button } from '~/components/LoginModal';

import CheckoutHeader from '~/components/CheckoutHeader';
import CheckoutHeaderMobile from '~/components/CheckoutHeaderMobile';
import Item from '~/components/ConfirmationItem';
// import PeriodicDeliveryListItem from '~/components/PeriodicDeliveryListItem';
import ItemsList from '~/components/ItemsList';

import { updateProfileRequest, knightFall } from '~/store/modules/user/actions';

// import { periodicProducts } from '~/data';

import backend from '~/services/api';
import { customCalculatePrice, formatPrice } from '~/utils/calculatePrice';

export default function Confirmation() {
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });
  // const [qty, setQty] = useState(4);
  // const [periodicDelivery, setPeriodicDelivery] = useState(true);

  const history = useHistory();
  const dispatch = useDispatch();

  const isOrderFinished = useSelector(state => state.cart.orderFinished);
  const hasOrder = useSelector(state => state.cart.hasOrder);

  const profile = useSelector(state => state.user.profile);

  const finalProfile = useSelector(state => state.user.finalProfile);
  const finalAddress = useSelector(state => state.addresses.finalAddress);
  const order = useSelector(state => state.user.order);
  const cart = useSelector(state => state.cart.products);

  const [totalCashback, setTotalCashback] = useState(0);

  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [orderInfo, setOrderInfo] = useState(null);
  const [saved, setSaved] = useState(null);
  const [loading, setLoading] = useState(true);

  const [clientCback, setClientCback] = useState(
    !!profile
      ? !!profile.cback_credit
        ? profile.cback_credit
        : '0.00'
      : '0.00'
  );

  const [newCback, setNewCback] = useState('0.00');

  const [currentContainerHeight, setCurrentContainerHeight] = useState(
    cart.length * 102 - 20
  );

  const loadData = useCallback(async () => {
    if (!order) return;
    setLoading(true);
    const {
      data: { data },
    } = await backend.get(`clients/transactions/${order.id}`);
    const { products } = data;
    const { formattedSavedPrice, formattedPrice } = customCalculatePrice(
      products
    );
    setSaved(formatPrice(formattedSavedPrice - formattedPrice));

    setLoading(false);
    setOrderInfo(data);
  }, [order]);

  const loadCback = useCallback(async () => {
    const {
      data: { data },
    } = await backend.get('/clients/cbacks');

    setNewCback(data);
    dispatch(updateProfileRequest({ ...profile, cback_credit: data }));
  }, [dispatch, profile]);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadData();
    loadCback();
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

  useEffect(() => {
    setCurrentContainerHeight(paginatedProducts.length * 102 - 20);
  }, [paginatedProducts, currentContainerHeight]);

  if (!hasOrder) {
    return <Redirect to="/entrega" />;
  }

  if (cart.length === 0 || !isOrderFinished) {
    return <Redirect to="/cesto" />;
  }

  const { name, last_name, cellphone, email, birth, document } = finalProfile;

  return (
    <>
      {isDesktop ? (
        <CheckoutHeader active={3} />
      ) : (
        <CheckoutHeaderMobile active={3} />
      )}
      <Container>
        <Content isDesktop={isDesktop}>
          <TopWarning isDesktop={isDesktop}>
            <img src={check} alt="" />A sua encomenda está feita, os nossos
            colaboradores vão entrar em contacto no dia da entrega. Em caso de
            dúvidas não hesite em contactar nos através do 91 045 77 68.
          </TopWarning>
        </Content>

        <Content style={{ marginTop: 40 }} isDesktop={isDesktop}>
          <InfoContainer isDesktop={isDesktop}>
            <SectionTitle isDesktop={isDesktop}>
              <strong>Seu pedido está confirmado</strong>
              <small>Dados do comprador</small>
            </SectionTitle>
            <CustomInputContainer
              isDesktop={isDesktop}
              style={isDesktop ? {} : { marginTop: 20 }}
            >
              <Info>
                <strong>Nome</strong>
                <small>{`${name} ${last_name}`}</small>
              </Info>
              <Info>
                <strong>Telemóvel</strong>
                <small>{cellphone}</small>
              </Info>
            </CustomInputContainer>
            <CustomInputContainer isDesktop={isDesktop}>
              <Info>
                <strong>Email</strong>
                <small>{email}</small>
              </Info>
              <Info>
                <strong>Data de Nascimento</strong>
                <small>{birth}</small>
              </Info>
            </CustomInputContainer>
            <CustomInputContainer isDesktop={isDesktop}>
              <Info>
                <strong>NIF</strong>
                <small>{document}</small>
              </Info>
            </CustomInputContainer>
          </InfoContainer>
          {!!finalAddress ? (
            <InfoContainer
              isDesktop={isDesktop}
              style={isDesktop ? {} : { marginTop: 20, height: 434 }}
            >
              <SectionTitle isDesktop={isDesktop}>
                <strong>Dados da entrega</strong>
                <small>Morada</small>
              </SectionTitle>
              <CustomInputContainer isDesktop={isDesktop}>
                <Info>
                  <strong>Morada</strong>
                  <small>{finalAddress.address}</small>
                </Info>
                <Info>
                  <strong>Cidade</strong>
                  <small>{finalAddress.city}</small>
                </Info>
              </CustomInputContainer>
              <CustomInputContainer isDesktop={isDesktop}>
                <Info>
                  <strong>Código Postal</strong>
                  <small>{finalAddress.zipcode}</small>
                </Info>
                <Info>
                  <strong>Localidade</strong>
                  <small>{finalAddress.state}</small>
                </Info>
              </CustomInputContainer>
              <CustomInputContainer isDesktop={isDesktop}>
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
            <WithdrawContainer isDesktop={isDesktop}>
              <strong>
                A retirada na loja deve ocorrer no endereço abaixo:
                <br />
                <b>Av. da República 1058 2775-271 Parede</b>
              </strong>
            </WithdrawContainer>
          )}
          <InfoContainer
            style={
              isDesktop
                ? { width: 360 }
                : { width: '100%', marginTop: 20, height: 259 }
            }
          >
            <SectionTitle isDesktop={isDesktop}>
              <strong>Crédito Cashback</strong>
              <small>Teu crédito para a próxima encomenda</small>
            </SectionTitle>
            <CashbackCredit>
              <img src={cashback} alt="Cashback" />
              <strong>€&nbsp;{newCback}</strong>
            </CashbackCredit>
          </InfoContainer>
        </Content>
        <Content style={{ marginTop: 40 }} isDesktop={isDesktop}>
          <div style={isDesktop ? {} : { width: '100%' }}>
            <Title>Produtos</Title>
            {!loading ? (
              <ItemsList
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                containerHeight={isDesktop ? 708 : currentContainerHeight}
              >
                {paginatedProducts.length !== 0 &&
                  paginatedProducts.map((item, index) => (
                    <Item
                      key={item.id}
                      item={item}
                      index={index}
                      isDesktop={isDesktop}
                    />
                  ))}
              </ItemsList>
            ) : (
              <h1>Carregando...</h1>
            )}
          </div>
          <div style={isDesktop ? {} : { width: '100%' }}>
            <Title style={isDesktop ? {} : { marginTop: 20 }}>Resumo</Title>
            <CheckoutDetails isDesktop={isDesktop}>
              <CheckoutItem>
                <h1>Produtos</h1>
                <h2>€&nbsp;{!!orderInfo ? `${orderInfo.subtotal}` : '0.00'}</h2>
              </CheckoutItem>
              <CheckoutItem>
                <h1>Economizou</h1>
                <h2>€&nbsp;{!!orderInfo ? saved : '0.00'}</h2>
              </CheckoutItem>
              <CheckoutItem>
                <h1>Crédito Disponível</h1>
                <h2 style={{ color: '#0CB68B' }}>€&nbsp;{clientCback}</h2>
              </CheckoutItem>
              <CheckoutItem>
                <h1 style={isDesktop ? {} : { fontSize: 13.5 }}>
                  Desconto do CUPOM
                </h1>
                <h2 style={{ color: '#0CB68B' }}>
                  €&nbsp;{!!orderInfo ? `${orderInfo.discount}.00` : '0.00'}
                </h2>
              </CheckoutItem>
              <CheckoutItem>
                <h1>Porte</h1>
                <h2 style={{ color: '#0CB68B' }}>
                  {!!orderInfo
                    ? orderInfo.shipping !== 0
                      ? `€ ${orderInfo.shipping}.00`
                      : 'Grátis'
                    : 'Grátis'}
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

        {/* <PeriodicDeliveryContainer isDesktop={isDesktop}>
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
        </PeriodicDeliveryContainer> */}
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
