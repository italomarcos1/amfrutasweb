import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

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
  const isDesktop = useMediaQuery({ query: '(min-device-width: 900px)' });

  const [paginationArray, setPaginationArray] = useState([]);
  const generatePaginationArray = useCallback(() => {
    const items = [];

    for (let i = 0; i < lastPage; i += 1) {
      items.push(i);
    }
    // console.tron.log(items);
    setPaginationArray(items);
  }, [lastPage]);

  const [containerStyle, setContainerStyle] = useState({
    ...style,
    height: containerHeight + 76,
    width: containerWidth,
  });

  useEffect(() => {
    generatePaginationArray();
  }, [lastPage, generatePaginationArray]);

  useEffect(() => {
    let width;
    if (isDesktop) width = containerWidth;
    else width = '100%';

    setContainerStyle(prevState => ({ ...prevState, width }));
  }, [isDesktop, containerWidth]);

  return (
    <Container
      // width={containerWidth}
      style={containerStyle}
    >
      <List
        isDesktop={isDesktop}
        height={containerHeight}
        style={{ width: '100%' }}
      >
        {children}
      </List>
      <FooterPagination
        style={
          isDesktop
            ? { width: containerWidth, backgroundColor: '#fcfcfc' }
            : { width: '100%', backgroundColor: '#fcfcfc' }
        }
      >
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          setCurrentPage={setCurrentPage}
          paginationArray={paginationArray}
          isDesktop={isDesktop}
        />
      </FooterPagination>
    </Container>
  );
}

ItemsList.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  containerHeight: PropTypes.number,
  containerWidth: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

ItemsList.defaultProps = {
  containerHeight: 455,
  containerWidth: 840,
  style: {},
};
