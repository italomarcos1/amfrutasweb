import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import {
  Container,
  Content,
  CheckoutDetails,
  CheckoutItem,
  Title,
  ConfirmationText,
  ShippingWarning,
  MinValueContainer,
  MinValue,
} from './styles';

import logo from '~/assets/amfrutas-white.svg';
import alert from '~/assets/alert-circle.svg';
import lock from '~/assets/lock.svg';

import Footer from '~/components/Footer';
import CheckoutHeader from '~/components/CheckoutHeader';
import CheckoutHeaderMobile from '~/components/CheckoutHeaderMobile';
import BasketItem from '~/components/BasketItem';
import Item from '~/components/Item';
import ItemsList from '~/components/ItemsList';
import EmptyCartContainer from '~/components/EmptyCartContainer';
import Toast from '~/components/Toast';
import LoginModal from '~/pages/LoginModal';

import { processOrder } from '~/store/modules/cart/actions';

import { calculateCashback, formatPrice } from '~/utils/calculatePrice';

import { Button, SecureLogin } from '~/components/LoginModal';

import backend from '~/services/api';

export default function Basket() {
  const { products, price, saved } = useSelector(state => state.cart);
  const signed = useSelector(state => state.auth.signed);
  const dispatch = useDispatch();
  const history = useHistory();
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loginModal, setLoginModal] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [shouldntProceed, setShouldntProceed] = useState(false);

  const [totalCashback, setTotalCashback] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [fixedShippingCost, setFixedShippingCost] = useState(0);
  const [minValueShipping, setMinValueShipping] = useState(0);
  const [minValueFreeShipping, setMinValueFreeShipping] = useState(0);
  const [minValueWithdrawStore, setMinValueWithdrawStore] = useState(0);
  const [currentContainerHeight, setCurrentContainerHeight] = useState(
    products.length * 167 - 20
  );

  const loadData = useCallback(async () => {
    const keys = [
      'min_value_shipping',
      'shipping_cost',
      'min_value_free_shipping',
      'min_value_withdrawinstore',
    ];

    const {
      data: { data },
    } = await backend.get('/configurations', { keys });

    setFixedShippingCost(data.shipping_cost);
    setMinValueShipping(data.min_value_shipping);
    setMinValueFreeShipping(data.min_value_free_shipping);
    setMinValueWithdrawStore(data.min_value_withdrawinstore);
  }, []);

  const loadShippingCost = useCallback(async () => {
    const {
      data: { data },
    } = await backend.get(`checkout/shipping-cost?subtotal=${price}`);

    setShippingCost(data);
  }, [price]);

  useEffect(() => {
    const { formattedPrice } = calculateCashback(products);

    setTotalCashback(formattedPrice);
  }, [products]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => loadShippingCost(), [loadShippingCost, price]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(processOrder(false));
  }, [dispatch]);

  const handlePagination = useCallback(() => {
    const pageIndex = 8 * (currentPage - 1);
    const newPage = products.slice(pageIndex, pageIndex + 8);

    setPaginatedProducts(newPage);
  }, [currentPage, products]);

  useEffect(() => {
    handlePagination();
  }, [products, handlePagination]);

  useEffect(() => {
    dispatch(processOrder(false));
  }, [dispatch]);

  const handleProcessOrder = useCallback(() => {
    if (!signed) {
      setLoginModal(true);
      setToastVisible(true);

      setTimeout(() => {
        setToastVisible(false);
      }, 2800);

      return;
    }

    dispatch(processOrder(true));
    history.push('/entrega');
  }, [dispatch, history, signed]);

  useEffect(() => {
    setShouldntProceed(+price < +minValueWithdrawStore);
  }, [price, minValueWithdrawStore]);

  useEffect(() => {
    setCurrentContainerHeight(paginatedProducts.length * 167 - 20);
  }, [paginatedProducts, currentContainerHeight]);

  return (
    <>
      {isDesktop ? (
        <CheckoutHeader active={1} />
      ) : (
        <CheckoutHeaderMobile active={1} />
      )}
      {loginModal && <LoginModal closeModal={() => setLoginModal(false)} />}
      {toastVisible && (
        <Toast
          status="Você deve fazer login ou se cadastrar antes de prosseguir."
          color="#1DC167"
        />
      )}
      <Container isDesktop={isDesktop}>
        <Content isDesktop={isDesktop}>
          <div style={isDesktop ? {} : { width: '100%' }}>
            <Title>Cesto de Compras</Title>
            {shouldntProceed && (
              <MinValueContainer isDesktop={isDesktop}>
                <MinValue isDesktop={isDesktop}>
                  De momento o valor mínimo para encomendas é de €&nbsp;
                  {minValueWithdrawStore}
                </MinValue>
                <Button
                  color="#1DC167"
                  shadowColor="#17A75B"
                  onClick={() => history.push('/produtos')}
                  style={
                    isDesktop
                      ? { width: 400, marginTop: 0 }
                      : { width: '100%', marginTop: 0 }
                  }
                >
                  <b>Voltar a comprar</b>
                </Button>
              </MinValueContainer>
            )}

            {!loginModal && products.length !== 0 ? (
              <ItemsList
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                containerHeight={isDesktop ? 708 : currentContainerHeight}
              >
                {paginatedProducts.map((item, index) => (
                  <Item
                    key={item.id}
                    item={item}
                    index={index}
                    isDesktop={isDesktop}
                  />
                ))}
              </ItemsList>
            ) : (
              <EmptyCartContainer
                message="Seu cesto de compras está vazio."
                isDesktop={isDesktop}
              />
            )}
          </div>
          <div>
            <Title style={isDesktop ? {} : { marginTop: 30 }}>Resumo</Title>
            <CheckoutDetails isDesktop={isDesktop}>
              <CheckoutItem>
                <h1>Produtos</h1>
                <h2>{products.length !== 0 ? `€ ${price}` : '---'}</h2>
              </CheckoutItem>
              <CheckoutItem>
                <h1>Economizou</h1>
                <h2>
                  {products.length !== 0
                    ? `€ ${
                        saved === '0.00' ? '0.00' : formatPrice(saved - price)
                      }`
                    : '---'}
                </h2>
              </CheckoutItem>
              <CheckoutItem
                style={isDesktop ? { height: 77 } : { height: 117 }}
              >
                <h1>
                  O seu crédito de <b>compras anteriores</b> <br />
                  estará disponível no passo seguinte
                </h1>
              </CheckoutItem>
              <CheckoutItem
                style={isDesktop ? { height: 77 } : { height: 117 }}
              >
                <h1>
                  Tem um <b>cupão de desconto?</b> <br />
                  Pode adicioná-lo no passo seguinte
                </h1>
              </CheckoutItem>
              <CheckoutItem>
                <h1>Porte</h1>
                <h2 style={{ color: '#0CB68B' }}>
                  {shippingCost === 0 ? 'Grátis' : `€ ${shippingCost}.00`}
                </h2>
              </CheckoutItem>
              <CheckoutItem>
                <h1>Cashback</h1>
                <h2 style={{ color: '#FF9D22' }}>
                  {totalCashback === '0.00' ? '---' : `€ ${totalCashback}`}
                </h2>
              </CheckoutItem>
              <CheckoutItem>
                <h2>Total</h2>
                <h2 style={{ fontSize: 25, color: '#0CB68B' }}>
                  {products.length !== 0 ? `€ ${price}` : '---'}
                </h2>
              </CheckoutItem>
              <ConfirmationText
                style={
                  shouldntProceed ? { color: '#f84c4c' } : { color: '#0cb68b' }
                }
              >
                {shouldntProceed
                  ? `De momento o valor mínimo para encomendas é de \n
                  € ${minValueWithdrawStore}`
                  : `A confirmação da sua encomenda será feita \n
                através de contacto telefónico pelos nossos \n
                colaboradores no dia da entrega.`}
              </ConfirmationText>
              {shouldntProceed ? (
                <Button
                  color="#1DC167"
                  shadowColor="#17A75B"
                  onClick={() => history.push('/produtos')}
                  style={isDesktop ? { width: 309 } : { width: '100%' }}
                >
                  <b>Voltar a comprar</b>
                </Button>
              ) : (
                <Button
                  disabled={products.length === 0}
                  color="#1DC167"
                  shadowColor="#17A75B"
                  onClick={() => handleProcessOrder()}
                  style={isDesktop ? { width: 309 } : { width: '100%' }}
                >
                  <b>Processar Encomenda</b>
                </Button>
              )}
              <SecureLogin style={{ marginTop: 23.5 }}>
                Acesso <img src={lock} alt="Lock" /> Seguro
              </SecureLogin>
            </CheckoutDetails>
            <ShippingWarning isDesktop={isDesktop}>
              Levantamento na loja:
              <b>Grátis</b>
              <br /> Compras até € {minValueShipping}:
              <b>Entrega € {fixedShippingCost}</b>
              <br /> Compras acima de € {minValueFreeShipping}:
              <b>Entrega Grátis</b>
            </ShippingWarning>
          </div>
        </Content>
      </Container>
      <Footer />
    </>
  );
}
