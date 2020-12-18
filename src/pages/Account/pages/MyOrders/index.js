import React, { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { FaSpinner } from 'react-icons/fa';

import { Container, LoadingContainer } from './styles';

import Order from './components/Order';
import MobileOrder from '~/components/MobileOrder';
import EmptyCartContainer from '~/components/EmptyCartContainer';

import backend from '~/services/api';

export default function MyOrders() {
  const [selectedOrder, setSelectedOrder] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

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
    loadTransactions();
  }, []);

  //  const orders = useSelector(state => state.user.orders);

  return (
    <>
      <Container isDesktop={isDesktop}>
        {loading ? (
          <LoadingContainer isDesktop={isDesktop}>
            <FaSpinner color="#666" size={isDesktop ? 42 : 38} />
            <strong>Carregando suas encomendas, aguarde...</strong>
          </LoadingContainer>
        ) : transactions.length !== 0 ? (
          transactions.map(order =>
            isDesktop ? (
              <Order
                order={order}
                isOpen={selectedOrder}
                setOrder={setSelectedOrder}
              />
            ) : (
              <MobileOrder
                key={order.id}
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
