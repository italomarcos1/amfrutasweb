import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { consts } from 'react-elastic-carousel';

import { PaginationContainer, PaginationButton, ArrowButton } from './styles';

import left from '~/assets/chevron-l.svg';
import right from '~/assets/chevron-r.svg';

export default class Pagination extends Component {
  state = {
    totalItems: [],
  };

  componentDidMount() {
    const { paginationArray } = this.props;

    this.setState({ totalItems: paginationArray });
  }

  componentDidUpdate(prevProps, prevState) {
    const { paginationArray } = this.props;
    if (prevState.totalItems !== paginationArray) {
      this.setState({ totalItems: paginationArray });
    }
  }

  myArrow({ type, onClick, isEdge }) {
    const pointer = type === consts.PREV ? left : right;

    return (
      <ArrowButton onClick={onClick} disabled={isEdge}>
        <img src={pointer} alt="" />
      </ArrowButton>
    );
  }

  render() {
    const { totalItems } = this.state;
    const { currentPage, setCurrentPage, style, isDesktop } = this.props;

    return (
      <PaginationContainer
        itemsToShow={5}
        ref={ref => (this.carousel = ref)}
        pagination={false}
        renderArrow={this.myArrow}
        style={style}
        showArrows={totalItems.length !== 0}
        isDesktop={isDesktop}
        totalItems={totalItems.length > 5 ? 5 : totalItems.length}
      >
        {totalItems.map(item => (
          <PaginationButton
            active={currentPage === item + 1}
            onClick={() => setCurrentPage(item + 1)}
          >
            {item + 1}
          </PaginationButton>
        ))}
      </PaginationContainer>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isDesktop: PropTypes.bool,
};

Pagination.defaultProps = {
  style: {},
  isDesktop: false,
};
