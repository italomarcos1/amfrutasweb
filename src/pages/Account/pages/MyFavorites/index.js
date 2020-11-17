import React from 'react';
import { useSelector } from 'react-redux';

import { Container } from './styles';

import CheckoutItem from '../MyOrders/components/Item';

// import { products } from '~/data';

export default function MyFavorites() {
  const favorites = useSelector(state => state.cart.favorites);

  return (
    <>
      <Container>
        {favorites.length !== 0 ? (
          <ul>
            {favorites.map((p, index) => (
              <CheckoutItem item={p} index={index} />
            ))}
          </ul>
        ) : (
          <h1>Você não favoritou nenhum produto ainda.</h1>
        )}
      </Container>
      <div style={{ width: 840, height: 320 }} />
    </>
  );
}
