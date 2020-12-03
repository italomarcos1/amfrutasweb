import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
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
  setField,
  inputValue,
  setInputValue,
}) {
  const [selectedOption, setSelectedOption] = useState('Mais Recentes');
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleSetOption = useCallback(
    option => {
      setSelectedOption(option);
      setMenuIsOpen(false);
      switch (option) {
        case 'Mais Recentes': {
          setField('latest');
          break;
        }
        case 'Mais Vendidos': {
          setField('most_selled');
          break;
        }
        case 'Maior Preço': {
          setField('price_desc');
          break;
        }
        case 'Menor Preço': {
          setField('price_asc');
          break;
        }
        case 'Ordem Alfabética': {
          setField('title');
          break;
        }
        default:
      }
    },
    [setField]
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
          style={{ marginLeft: 20 }}
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
  setField: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
  setInputValue: PropTypes.func,
};

CustomHeader.defaultProps = {
  style: {},
  inputValue: '',
  setInputValue: () => {},
};
