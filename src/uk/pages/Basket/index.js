import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { FaSpinner } from 'react-icons/fa';

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
  LoadingContainer,
} from './styles';

import lock from '~/assets/lock.svg';

import Footer from '~/uk/components/Footer';
import CheckoutHeader from '~/uk/components/CheckoutHeader';
import CheckoutHeaderMobile from '~/uk/components/CheckoutHeaderMobile';
import BasketItem from '~/uk/components/BasketItem';
import Item from '~/uk/components/Item';
import ItemsList from '~/uk/components/ItemsList';
import EmptyCartContainer from '~/uk/components/EmptyCartContainer';
import Toast from '~/uk/components/Toast';
import LoginModal from '~/uk/pages/LoginModal';

import { processOrder, fixOrderFinished } from '~/store/modules/cart/actions';

import { calculateCashback, formatPrice } from '~/utils/calculatePrice';

import { Button, SecureLogin } from '~/uk/components/LoginModal';

import backend from '~/services/api';

export default function Basket() {
  const { products, price, saved } = useSelector(state => state.cart);
  const signed = useSelector(state => state.auth.signed);
  const removingProduct = useSelector(state => state.cart.removingProduct);
  const dispatch = useDispatch();
  const history = useHistory();
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

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
      data: {
        data: {
          shipping_cost,
          min_value_shipping,
          min_value_free_shipping,
          min_value_withdrawinstore,
        },
      },
    } = await backend.get(`/configurations?keys=${keys.join()}`);

    setFixedShippingCost(shipping_cost);
    setMinValueShipping(min_value_shipping);
    setMinValueFreeShipping(min_value_free_shipping);
    setMinValueWithdrawStore(min_value_withdrawinstore);
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
    window.scrollTo(0, 0);
    dispatch(processOrder(false));
    dispatch(fixOrderFinished());
    loadData();
  }, [loadData, dispatch]);

  useEffect(() => loadShippingCost(), [loadShippingCost, price]);

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
    history.push('/delivery');
  }, [dispatch, history, signed]);

  useEffect(() => {
    setShouldntProceed(+price < +minValueWithdrawStore);
  }, [price, minValueWithdrawStore]);

  useEffect(() => {
    setCurrentContainerHeight(products.length * 167 - 20);
  }, [products, currentContainerHeight]);

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
          status="You must log in or register before proceeding."
          color="#1DC167"
        />
      )}
      <Container isDesktop={isDesktop}>
        <Content isDesktop={isDesktop}>
          <div style={isDesktop ? { width: 840 } : { width: '100%' }}>
            <Title>Shopping Basket</Title>
            {shouldntProceed && (
              <MinValueContainer isDesktop={isDesktop}>
                <MinValue isDesktop={isDesktop}>
                  At the moment, our minimum value to set a order is €&nbsp;
                  {minValueWithdrawStore}
                </MinValue>
                <Button
                  color="#1DC167"
                  shadowColor="#17A75B"
                  onClick={() => history.push('/products')}
                  style={
                    isDesktop
                      ? { width: 400, marginTop: 0 }
                      : { width: '100%', marginTop: 0 }
                  }
                >
                  <b>Back to the store</b>
                </Button>
              </MinValueContainer>
            )}

            {removingProduct ? (
              <LoadingContainer isDesktop={isDesktop}>
                <FaSpinner color="#666" size={38} />
                <strong>Removing the selected product...</strong>
              </LoadingContainer>
            ) : !loginModal && products.length !== 0 ? (
              <ItemsList length={products.length} breakpoint={8}>
                {products.map((item, index) => (
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
                message="Your shopping basket is empty."
                isDesktop={isDesktop}
              />
            )}
          </div>
          <div>
            <Title style={isDesktop ? {} : { marginTop: 30 }}>Details</Title>
            <CheckoutDetails isDesktop={isDesktop}>
              <CheckoutItem>
                <h1>Products</h1>
                <h2>{products.length !== 0 ? `€ ${price}` : '---'}</h2>
              </CheckoutItem>
              <CheckoutItem>
                <h1>Saved</h1>
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
                  Your credit from <b>previous purchases</b> <br />
                  are available in the next step.
                </h1>
              </CheckoutItem>
              <CheckoutItem
                style={isDesktop ? { height: 77 } : { height: 117 }}
              >
                <h1>
                  Do you have a <b>voucher?</b> <br />
                  You can add it in the next step.
                </h1>
              </CheckoutItem>
              <CheckoutItem>
                <h1>Shipping</h1>
                <h2 style={{ color: '#0CB68B' }}>
                  {shippingCost === 0 ? 'Free' : `€ ${shippingCost}.00`}
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
                  ? `At the moment, our minimum value to set a order is \n
                  € ${minValueWithdrawStore}`
                  : `Your order will be confirmed by a phone \n
                call by our employees on the delivery date.\n`}
              </ConfirmationText>
              {shouldntProceed ? (
                <Button
                  color="#1DC167"
                  shadowColor="#17A75B"
                  onClick={() => history.push('/products')}
                  style={isDesktop ? { width: 309 } : { width: '100%' }}
                >
                  <b>Back to Store</b>
                </Button>
              ) : (
                <Button
                  disabled={products.length === 0}
                  color="#1DC167"
                  shadowColor="#17A75B"
                  onClick={() => handleProcessOrder()}
                  style={isDesktop ? { width: 309 } : { width: '100%' }}
                >
                  <b>Process Order</b>
                </Button>
              )}
              <SecureLogin style={{ marginTop: 23.5 }}>
                Safe <img src={lock} alt="Lock" /> Access
              </SecureLogin>
            </CheckoutDetails>
            <ShippingWarning isDesktop={isDesktop}>
              Store Balance:
              <b>Free</b>
              <br /> Purchases up to € {minValueShipping}:
              <b>Delivery € {fixedShippingCost}</b>
              <br /> Purchases over € {minValueFreeShipping}:
              <b>Free Delivery</b>
            </ShippingWarning>
          </div>
        </Content>
      </Container>
      <Footer />
    </>
  );
}
