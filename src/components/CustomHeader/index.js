import React, { useCallback, useState } from 'react';

import {
  Container,
  FilterProducts,
  FilterProductsContainer,
  FilterProductsOption,
  FilterProductsList,
} from './styles';

import SearchInput from '~/components/SearchInput';
import Pagination from '~/components/Pagination';

import arrow from '~/assets/icons/arrow_white.svg';

export default function CustomHeader({
  style,
  currentPage,
  lastPage,
  setCurrentPage,
  paginationArray,
  setOrderDirection,
  setOrderField,
}) {
  const [selectedOption, setSelectedOption] = useState('Mais Recentes');
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleSetOption = useCallback(
    option => {
      setSelectedOption(option);
      setMenuIsOpen(false);

      switch (option) {
        case 'Mais Recentes': {
          setOrderField('updated_at');
          setOrderDirection('desc');
          break;
        }
        case 'Mais Vendidos': {
          setOrderField('updated_at');
          setOrderDirection('desc');
          break;
        }
        case 'Maior Preço': {
          setOrderField('price');
          setOrderDirection('desc');
          break;
        }
        case 'Menor Preço': {
          setOrderField('price');
          setOrderDirection('asc');
          break;
        }
        case 'Ordem Alfabética': {
          setOrderField('title');
          setOrderDirection('asc');
          break;
        }
        default:
      }
    },
    [setOrderField, setOrderDirection]
  );

  const data = [
    { id: 1, option: 'Mais Recentes' },
    { id: 2, option: 'Mais Vendidos' },
    { id: 3, option: 'Maior Preço' },
    { id: 4, option: 'Menor Preço' },
    { id: 5, option: 'Ordem Alfabética' },
  ];

  return (
    <Container style={style}>
      <SearchInput />
      <FilterProductsContainer>
        <FilterProducts onClick={() => setMenuIsOpen(!menuIsOpen)}>
          <small>{selectedOption}</small>
          <img src={arrow} alt="" />
        </FilterProducts>

        <FilterProductsList visible={menuIsOpen}>
          {data.map(({ id, option }) => (
            <FilterProductsOption
              key={id}
              onClick={() => handleSetOption(option)}
            >
              {option}
            </FilterProductsOption>
          ))}
        </FilterProductsList>
      </FilterProductsContainer>
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        setCurrentPage={setCurrentPage}
        paginationArray={paginationArray}
      />
    </Container>
  );
}
