import React, { useState } from 'react';

import { Container } from './styles';

import Order from './components/Order';

export default function MyOrders() {
  const orders = [
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
      status: 'completed',
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
      status: 'cancelled',
      number: '005560',
      price: '10,67',
      date: '10/10/2020',
      deliveryDate: '13/10/2020',
      startHour: '15:30',
      endHour: '18:30',
      rating: 5,
    },
  ];

  const [selectedOrder, setSelectedOrder] = useState(0);
  return (
    <>
      <Container>
        {orders.map(order => (
          <Order
            order={order}
            isOpen={selectedOrder}
            setOrder={setSelectedOrder}
          />
        ))}
      </Container>
      <div style={{ width: 840, height: 220 }} />
    </>
  );
}
