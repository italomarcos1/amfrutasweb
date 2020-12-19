import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { Container } from './styles';

import CheckoutItem from '../MyOrders/components/Item';
import EmptyCartContainer from '~/components/EmptyCartContainer';
import ItemsList from '~/components/ItemsList';

// import { products } from '~/data';

import { updatePages } from '~/store/modules/cart/actions';

export default function MyFavorites() {
  const favorites = useSelector(state => state.cart.favorites);
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [currentContainerHeight, setCurrentContainerHeight] = useState(
    paginatedProducts.length * 140 - 20
  );

  const handlePagination = useCallback(() => {
    const pageIndex = 8 * (currentPage - 1);
    const newPage = favorites.slice(pageIndex, pageIndex + 8);

    const totalPages = Math.ceil(favorites.length / 8);

    dispatch(updatePages(totalPages));

    setPaginatedProducts(newPage);
  }, [dispatch, currentPage, favorites]);

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    handlePagination();
  }, [favorites, handlePagination]);

  useEffect(() => {
    setCurrentContainerHeight(paginatedProducts.length * 140 - 20);
  }, [paginatedProducts, currentContainerHeight]);

  return (
    <>
      <Container isDesktop={isDesktop}>
        {favorites.length !== 0 ? (
          <ItemsList
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            containerWidth={isDesktop ? 821 : '100%'}
            containerHeight={isDesktop ? 625 : currentContainerHeight}
            style={{ backgroundColor: '#00000000' }}
          >
            {paginatedProducts.map((item, index) => (
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
