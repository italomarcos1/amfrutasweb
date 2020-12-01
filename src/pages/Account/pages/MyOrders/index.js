import React, { useCallback, useEffect, useState } from 'react';

import { FaSpinner } from 'react-icons/fa';

import { Container, LoadingContainer } from './styles';

import Order from './components/Order';
import EmptyCartContainer from '~/components/EmptyCartContainer';

import backend from '~/services/api';

export default function MyOrders() {
  const [selectedOrder, setSelectedOrder] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await backend.get('clients/transactions');

      if (response.data.meta === 'Não há compras recentes.') {
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
      <Container>
        {loading ? (
          <LoadingContainer>
            <FaSpinner color="#666" size={42} />
            <strong>Carregando suas encomendas, aguarde...</strong>
          </LoadingContainer>
        ) : transactions.length !== 0 ? (
          transactions.map(order => (
            <Order
              order={order}
              isOpen={selectedOrder}
              setOrder={setSelectedOrder}
            />
          ))
        ) : (
          <EmptyCartContainer message="Você não efetuou nenhuma compra ainda" />
        )}
      </Container>
      <div style={{ width: 840, height: 220 }} />
    </>
  );
}
