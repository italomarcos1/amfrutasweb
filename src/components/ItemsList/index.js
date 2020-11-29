import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Pagination from '~/components/Pagination';
import FooterPagination from '~/components/FooterPagination';

import { Container, List } from './styles';

export default function ItemsList({
  children,
  containerHeight,
  currentPage,
  setCurrentPage,
}) {
  const lastPage = useSelector(state => state.cart.pages);

  const [paginationArray, setPaginationArray] = useState([]);

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
    <Container style={{ height: containerHeight + 76 }}>
      <List height={containerHeight}>{children}</List>
      <FooterPagination style={{ width: 840, backgroundColor: '#fcfcfc' }}>
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
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

ItemsList.defaultProps = {
  containerHeight: 455,
};
