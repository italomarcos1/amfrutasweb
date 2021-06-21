import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { Container } from './styles';

import CheckoutItem from '../MyOrders/components/Item';
import EmptyCartContainer from '~/components/EmptyCartContainer';
import ItemsList from '~/components/ItemsList';

// import { products } from '~/data';

export default function MyFavorites() {
  const favorites = useSelector(({ cart }) => cart.favorites);
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <>
      <Container isDesktop={isDesktop}>
        {favorites.length !== 0 ? (
          <ItemsList
            length={favorites.length}
            breakpoint={12}
            style={isDesktop ? { width: 821 } : { width: '100%' }}
          >
            {favorites.map((item, index) => (
              <CheckoutItem
                key={item.id}
                item={item}
                index={index}
                isDesktop={isDesktop}
              />
            ))}
          </ItemsList>
        ) : (
          <EmptyCartContainer
            message="You don't have any favorite products."
            isDesktop={isDesktop}
          />
        )}
      </Container>
      {isDesktop && <div style={{ width: 840, height: 220 }} />}
    </>
  );
}
