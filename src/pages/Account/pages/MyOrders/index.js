import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';

import { Container } from './styles';

import Order from './components/Order';
import EmptyCartContainer from '~/components/EmptyCartContainer';

import backend from '~/services/api';

export default function MyOrders() {
  const ordersDev = [
    {
      id: 1,
      status: 'new',
      number: '003377',
      price: '204,32',
      date: '10/10/2020',
      deliveryDate: '13/10/2020',
      startHour: '10:30',
      endHour: '13:30',
      rating: 4,
    },
    {
      id: 2,
      status: 'approved',
      number: '004277',
      price: '125,78',
      date: '25/10/2020',
      deliveryDate: '02/11/2020',
      startHour: '08:30',
      endHour: '11:30',
      rating: 3,
    },
    {
      id: 3,
      status: 'onCourse',
      number: '005560',
      price: '10,67',
      date: '10/10/2020',
      deliveryDate: '13/10/2020',
      startHour: '15:30',
      endHour: '18:30',
      rating: 5,
    },
    {
      id: 4,
      status: 'completed',
      number: '005560',
      price: '10,67',
      date: '10/10/2020',
      deliveryDate: '13/10/2020',
      startHour: '15:30',
      endHour: '18:30',
      rating: 1,
    },
    {
      id: 5,
      status: 'cancelled',
      number: '005560',
      price: '10,67',
      date: '10/10/2020',
      deliveryDate: '13/10/2020',
      startHour: '15:30',
      endHour: '18:30',
      rating: 2,
    },
  ];

  const [selectedOrder, setSelectedOrder] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // const viewTransaction = useCallback(async () => {
  //   if (transactions.length === 0) return;
  //   setLoading(true);

  //   try {
  //     const response = transactions.map(async ({ id }) => {

  //       const r = await backend.get(`/clients/transactions/${id}`);
  //       return r;
  //     });
  //     console.tron.log(response);

  //     const filteredTransactions = response.map(({ data: { data } }) => data);

  //     setTransactions(filteredTransactions);
  //     setLoading(false);
  //   } catch {
  //     alert('Erro no carregamento da transação, confira sua conexão.');
  //     setLoading(false);
  //   }
  // }, [transactions]);

  // const loadTransactions = useCallback(async () => {
  //   setLoading(true);
  //   try {
  //     console.tron.log('1');
  //     const response = await backend.get('clients/transactions');

  //     if (response.data.meta === 'Não há compras recentes.') {
  //       return;
  //     }
  //     console.tron.log('3');

  //     const {
  //       data: { data },
  //     } = response;

  //     console.tron.log('4');
  //     console.tron.log(data);
  //     setTransactions(data);
  //     setLoading(false);
  //     console.tron.log('5');
  //   } catch {
  //     // alert('Erro no carregamento, confira sua conexão.');
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   loadTransactions();
  // }, []);

  // useEffect(() => {
  //   viewTransaction();
  // }, [viewTransaction, transactions]);

  // const orders = useSelector(state => state.user.orders);

  return (
    <>
      <Container>
        {loading ? (
          <FaSpinner color="#666" size={42} />
        ) : ordersDev.length !== 0 ? (
          ordersDev.map(order => (
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
