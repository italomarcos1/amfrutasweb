import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { FaSpinner } from 'react-icons/fa';

import detectBrowserLanguage from 'detect-browser-language';

import { Container, LoadingContainer } from './styles';

import Order from './components/Order';
import MobileOrder from '~/pt/components/MobileOrder';
import EmptyCartContainer from '~/pt/components/EmptyCartContainer';

import backend from '~/services/api';

export default function MyOrders() {
  const [selectedOrder, setSelectedOrder] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  const isEnglish = useMemo(() => {
    console.log(detectBrowserLanguage());
    const browserLanguage = detectBrowserLanguage();
    const isEng = browserLanguage.split('-')[0] === 'en';
    console.log('isBre-esh');
    console.log(isEng);
    // if (isEnglish) return <Redirect to="/uk" />;
    return isEng;
  }, []);

  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await backend.get('clients/transactions');

      if (response.data.meta.message === 'Não há compras recentes.') {
        setLoading(false);

        return;
      }

      const {
        data: { data },
      } = response;

      setTransactions(data);

      setLoading(false);
    } catch {
      // alert('Erro no carregamento, confira sua conexão.');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadTransactions();
  }, []);

  //  const orders = useSelector(state => state.user.orders);

  return isEnglish ? (
    <Redirect to="/orders" />
  ) : (
    <>
      <Container isDesktop={isDesktop}>
        {loading ? (
          <LoadingContainer isDesktop={isDesktop}>
            <FaSpinner color="#666" size={isDesktop ? 42 : 38} />
            <strong>Carregando suas encomendas, aguarde...</strong>
          </LoadingContainer>
        ) : transactions.length !== 0 ? (
          transactions.map((order, index) =>
            isDesktop ? (
              <Order
                order={order}
                isOpen={selectedOrder}
                setOrder={setSelectedOrder}
              />
            ) : (
              <MobileOrder
                key={order.id}
                index={index}
                order={order}
                isOpen={selectedOrder}
                setOrder={setSelectedOrder}
              />
            )
          )
        ) : (
          <EmptyCartContainer message="Você não efetuou nenhuma compra ainda" />
        )}
      </Container>
      <div style={{ width: 840, height: 820 }} />
    </>
  );
}
