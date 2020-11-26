import React from 'react';

import { Container, FilterProducts } from './styles';

import SearchInput from '~/components/SearchInput';
import Pagination from '~/components/Pagination';

import arrow from '~/assets/icons/arrow_white.svg';

export default function CustomHeader({
  style,
  currentPage,
  lastPage,
  setCurrentPage,
  paginationArray,
}) {
  return (
    <Container style={style}>
      <SearchInput />
      <FilterProducts>
        <small>Mais Produtos</small>
        <img src={arrow} alt="" />
      </FilterProducts>
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        setCurrentPage={setCurrentPage}
        paginationArray={paginationArray}
      />
    </Container>
  );
}
