import React from 'react';

import { Container } from './styles';

import CheckoutItem from '../MyOrders/components/Item';

import { products } from '~/data';

export default function MyFavorites() {
  return (
    <>
      <Container>
        <ul>
          {products.map(p => (
            <CheckoutItem item={p} />
          ))}
        </ul>
      </Container>
      <div style={{ width: 840, height: 320 }} />
    </>
  );
}
