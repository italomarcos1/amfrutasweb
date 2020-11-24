import React from 'react';
import PropTypes from 'prop-types';
import { PaginationContainer, PaginationButton } from './styles';

import left from '~/assets/chevron-l.svg';
import right from '~/assets/chevron-r.svg';

export default function Pagination({ currentPage, setCurrentPage }) {
  return (
    <PaginationContainer>
      <button type="button">
        <img src={left} alt="Página Anterior" />
      </button>
      <div>
        <PaginationButton
          active={currentPage === 1}
          onClick={() => setCurrentPage(1)}
        >
          1
        </PaginationButton>
        <PaginationButton
          active={currentPage === 2}
          onClick={() => setCurrentPage(2)}
        >
          2
        </PaginationButton>
        <PaginationButton
          active={currentPage === 3}
          onClick={() => setCurrentPage(3)}
        >
          3
        </PaginationButton>
        <PaginationButton
          active={currentPage === 4}
          onClick={() => setCurrentPage(4)}
        >
          4
        </PaginationButton>
        <PaginationButton
          active={currentPage === 5}
          onClick={() => setCurrentPage(5)}
        >
          5
        </PaginationButton>
      </div>
      <button type="button">
        <img src={right} alt="Próxima Página" />
      </button>
    </PaginationContainer>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.bool.isRequired,
  setCurrentPage: PropTypes.bool.isRequired,
};
