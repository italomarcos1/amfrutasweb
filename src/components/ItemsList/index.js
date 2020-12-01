import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Pagination from '~/components/Pagination';
import FooterPagination from '~/components/FooterPagination';

import { Container, List } from './styles';

export default function ItemsList({
  children,
  containerHeight,
  containerWidth,
  currentPage,
  setCurrentPage,
  style,
}) {
  const lastPage = useSelector(state => state.cart.pages);

  const [paginationArray, setPaginationArray] = useState([]);
  console.tron.log(lastPage);
  const generatePaginationArray = useCallback(() => {
    const items = [];

    for (let i = 0; i < lastPage; i += 1) {
      items.push(i);
    }
    // console.tron.log(items);
    setPaginationArray(items);
  }, [lastPage]);

  useEffect(() => {
    generatePaginationArray();
  }, [lastPage, generatePaginationArray]);

  return (
    <Container
      // width={containerWidth}
      style={{ ...style, height: containerHeight + 76, width: containerWidth }}
    >
      <List height={containerHeight} style={{ width: '100%' }}>
        {children}
      </List>
      <FooterPagination
        style={{ width: containerWidth, backgroundColor: '#fcfcfc' }}
      >
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          setCurrentPage={setCurrentPage}
          paginationArray={paginationArray}
        />
      </FooterPagination>
    </Container>
  );
}

ItemsList.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  containerHeight: PropTypes.number,
  containerWidth: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

ItemsList.defaultProps = {
  containerHeight: 455,
  containerWidth: 840,
};
