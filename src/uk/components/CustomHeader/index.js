import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';
import { Translate } from 'react-auto-translate';

import {
  Container,
  FilterProducts,
  FilterProductsContainer,
  FilterProductsOption,
  FilterProductsList,
  Content,
} from './styles';

import SearchInput from '~/uk/components/SearchInput';
import Pagination from '~/uk/components/Pagination';

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
  const [selectedOption, setSelectedOption] = useState('Latest');
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const handleSetOption = useCallback(
    option => {
      setSelectedOption(option);
      setMenuIsOpen(false);
      switch (option) {
        case 'Latest': {
          setField('latest');
          break;
        }
        case 'Most Sold': {
          setField('most_selled');
          break;
        }
        case 'Higher Price': {
          setField('price_desc');
          break;
        }
        case 'Least Price': {
          setField('price_asc');
          break;
        }
        case 'Title': {
          setField('title');
          break;
        }
        default:
      }
    },
    [setField]
  );

  const data = [
    { id: 1, option: 'Latest' },
    { id: 2, option: 'Most Sold' },
    { id: 3, option: 'Higher Price' },
    { id: 4, option: 'Least Price' },
    { id: 5, option: 'Title' },
  ];

  return (
    <Container style={style} isDesktop={isDesktop}>
      <SearchInput
        value={inputValue}
        onChange={({ target: { value } }) => setInputValue(value)}
      />
      <Content
        isDesktop={isDesktop}
        style={isDesktop ? {} : { width: '100%', height: 68 }}
      >
        <FilterProductsContainer isDesktop={isDesktop}>
          <FilterProducts
            isDesktop={isDesktop}
            onClick={() => setMenuIsOpen(!menuIsOpen)}
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
          isDesktop={isDesktop}
          style={isDesktop ? { marginLeft: 20 } : { marginTop: 10 }}
        />
      </Content>
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
