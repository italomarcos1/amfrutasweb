import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';

import {
  Header,
  SubHeader,
  Line,
  OptionContainer,
  OptionTitle,
  OptionNumber,
} from './styles';

import logo from '~/assets/amfrutas-white.svg';

export default function CheckoutHeader({ active }) {
  const cart = useSelector(state => state.cart.products);

  const history = useHistory();

  const [
    shouldNotAccessConfirmation,
    setShouldNotAccessConfirmation,
  ] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/cesto' || pathname === '/entrega') {
      setShouldNotAccessConfirmation(true);
    }
  }, [pathname]);

  return (
    <>
      <Header>
        <Link to="/">
          <img src={logo} alt="Logo" style={{ width: 137.2, height: 30 }} />
        </Link>
      </Header>
      <SubHeader>
        <OptionContainer onClick={() => history.push('/cesto')}>
          <OptionTitle>Basket</OptionTitle>
          <OptionNumber active>1</OptionNumber>
        </OptionContainer>
        <OptionContainer
          disabled={active === 1 || active === 3}
          onClick={() => history.push('/entrega')}
        >
          <OptionTitle>Delivery</OptionTitle>
          <OptionNumber
            disabled={active === 3 || cart.length === 0}
            active={active === 2 || active === 3}
          >
            2
          </OptionNumber>
        </OptionContainer>
        <OptionContainer
          disabled={shouldNotAccessConfirmation}
          onClick={() => history.push('/confirmacao')}
        >
          <OptionTitle>Confirmation</OptionTitle>
          <OptionNumber active={active === 3}>3</OptionNumber>
        </OptionContainer>
        <Line />
      </SubHeader>
    </>
  );
}

CheckoutHeader.propTypes = {
  active: PropTypes.number,
};

CheckoutHeader.defaultProps = {
  active: 1,
};
