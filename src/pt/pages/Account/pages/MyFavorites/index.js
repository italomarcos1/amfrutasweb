import React, { useEffect, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import detectBrowserLanguage from 'detect-browser-language';

import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { Container } from './styles';

import CheckoutItem from '../MyOrders/components/Item';
import EmptyCartContainer from '~/pt/components/EmptyCartContainer';
import ItemsList from '~/pt/components/ItemsList';

// import { products } from '~/data';

export default function MyFavorites() {
  const favorites = useSelector(({ cart }) => cart.favorites);
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  useEffect(() => window.scrollTo(0, 0), []);

  const isEnglish = useMemo(() => {
    console.log(detectBrowserLanguage());
    const browserLanguage = detectBrowserLanguage();
    const isEng = browserLanguage.split('-')[0] === 'en';
    console.log('isBre-esh');
    console.log(isEng);
    // if (isEnglish) return <Redirect to="/uk" />;
    return isEng;
  }, []);

  const ptEnabled = useSelector(state => state.user.ptEnabled);

  return !ptEnabled ? (
    <Redirect to="/favorites" />
  ) : (
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
            message="Você não favoritou nenhum produto ainda."
            isDesktop={isDesktop}
          />
        )}
      </Container>
      {isDesktop && <div style={{ width: 840, height: 220 }} />}
    </>
  );
}
