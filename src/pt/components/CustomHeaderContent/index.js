import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import {
  Container,
  FilterProducts,
  FilterProductsContainer,
  FilterProductsOption,
  FilterProductsList,
} from './styles';

import SearchInput from '~/pt/components/SearchInput';
import Pagination from '~/pt/components/Pagination';

import arrow from '~/assets/icons/arrow_white.svg';

export default function CustomHeader({
  style,
  currentPage,
  lastPage,
  setCurrentPage,
  paginationArray,
  setOrderDirection,
  setOrderField,
  inputValue,
  setInputValue,
}) {
  const [selectedOption, setSelectedOption] = useState('Mais Recentes');
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const handleSetOption = useCallback(
    option => {
      setSelectedOption(option);
      setMenuIsOpen(false);

      switch (option) {
        case 'Mais Antigas': {
          setOrderField('published_at');
          setOrderDirection('asc');
          break;
        }
        case 'Mais Recentes': {
          setOrderField('published_at');
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
    },
    [setOrderField, setOrderDirection]
  );

  const data = [
    { id: 1, option: 'Mais Antigas' },
    { id: 2, option: 'Mais Recentes' },
    { id: 3, option: 'Ordem Alfabética' },
  ];

  return (
    <Container style={style} isDesktop={isDesktop}>
      <SearchInput
        value={inputValue}
        onChange={({ target: { value } }) => setInputValue(value)}
      />
      <div
        style={
          isDesktop
            ? {
                display: 'flex',
                alignItems: 'center',
              }
            : {
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
              }
        }
      >
        <FilterProductsContainer isDesktop={isDesktop}>
          <FilterProducts
            onClick={() => setMenuIsOpen(!menuIsOpen)}
            isDesktop={isDesktop}
          >
            <small>{selectedOption}</small>
            <img src={arrow} alt="" />
          </FilterProducts>

          <FilterProductsList visible={menuIsOpen} isDesktop={isDesktop}>
            {data.map(({ id, option }) => (
              <FilterProductsOption
                key={id}
                onClick={() => handleSetOption(option)}
                isDesktop={isDesktop}
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
          style={isDesktop ? { marginLeft: 20 } : { marginTop: 10 }}
          isDesktop={isDesktop}
        />
      </div>
    </Container>
  );
}

CustomHeader.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object]),
  currentPage: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  paginationArray: PropTypes.oneOfType([PropTypes.array]).isRequired,
  setOrderDirection: PropTypes.func.isRequired,
  setOrderField: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
  setInputValue: PropTypes.func,
};

CustomHeader.defaultProps = {
  style: {},
  inputValue: '',
  setInputValue: () => {},
};
