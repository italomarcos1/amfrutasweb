import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { Container } from './styles';

import Order from './components/Order';
import EmptyCartContainer from '~/components/EmptyCartContainer';

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

  const orders = useSelector(state => state.user.orders);

  return (
    <>
      <Container>
        {orders.length !== 0 ? (
          orders.map(order => (
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
