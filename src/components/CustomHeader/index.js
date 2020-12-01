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
  isInfo,
  inputValue,
  setInputValue,
  search,
}) {
  const [selectedOption, setSelectedOption] = useState('Mais Recentes');
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleSetOption = useCallback(
    option => {
      setSelectedOption(option);
      setMenuIsOpen(false);
      if (!isInfo) {
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
      } else {
        switch (option) {
          case 'Mais Antigas': {
            setOrderField('published_at');
            setOrderDirection('asc');
            break;
          }
          case 'Mais Recentes': {
            setOrderField('updated_at');
            setOrderDirection('desc');
            break;
          }

          case 'Ordem Alfabética': {
            setOrderField('title');
            setOrderDirection('asc');
            break;
          }
          default:
        }
      }
    },
    [setOrderField, isInfo, setOrderDirection]
  );

  const data = () => {
    if (!isInfo) {
      return [
        { id: 1, option: 'Mais Recentes' },
        { id: 2, option: 'Mais Vendidos' },
        { id: 3, option: 'Maior Preço' },
        { id: 4, option: 'Menor Preço' },
        { id: 5, option: 'Ordem Alfabética' },
      ];
    }

    return [
      { id: 1, option: 'Mais Antigas' },
      { id: 2, option: 'Mais Recentes' },
      { id: 3, option: 'Ordem Alfabética' },
    ];
  };

  return (
    <Container style={style}>
      <SearchInput
        value={inputValue}
        onChange={({ target: { value } }) => setInputValue(value)}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <FilterProductsContainer>
          <FilterProducts onClick={() => setMenuIsOpen(!menuIsOpen)}>
            <small>{selectedOption}</small>
            <img src={arrow} alt="" />
          </FilterProducts>

          <FilterProductsList visible={menuIsOpen}>
            {data().map(({ id, option }) => (
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
          style={{ marginLeft: 20 }}
        />
      </div>
    </Container>
  );
}
