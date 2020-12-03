import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from './styles';

import CheckoutItem from '../MyOrders/components/Item';
import EmptyCartContainer from '~/components/EmptyCartContainer';
import ItemsList from '~/components/ItemsList';

// import { products } from '~/data';

import { updatePages } from '~/store/modules/cart/actions';

export default function MyFavorites() {
  const favorites = useSelector(state => state.cart.favorites);
  const dispatch = useDispatch();

  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePagination = useCallback(() => {
    const pageIndex = 8 * (currentPage - 1);
    const newPage = favorites.slice(pageIndex, pageIndex + 8);

    const totalPages = Math.ceil(favorites.length / 8);

    dispatch(updatePages(totalPages));

    setPaginatedProducts(newPage);
  }, [dispatch, currentPage, favorites]);

  useEffect(() => {
    handlePagination();
  }, [favorites, handlePagination]);

  return (
    <>
      <Container>
        {favorites.length !== 0 ? (
          <ItemsList
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            containerWidth={821}
            containerHeight={625}
            style={{ backgroundColor: '#00000000' }}
          >
            {paginatedProducts.map((item, index) => (
              <CheckoutItem key={item.id} item={item} index={index} />
            ))}
          </ItemsList>
        ) : (
          <EmptyCartContainer message="Você não favoritou nenhum produto ainda." />
        )}
      </Container>
      <div style={{ width: 840, height: 220 }} />
    </>
  );
}
