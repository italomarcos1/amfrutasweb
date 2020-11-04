import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';

import {
  Header,
  SubHeader,
  Line,
  OptionContainer,
  OptionTitle,
  OptionNumber,
} from './styles';

import logo from '~/assets/logo.svg';

export default function CheckoutHeader({ active }) {
  const userData = useSelector(state => state.user.info);
  const history = useHistory();

  return (
    <>
      <Header>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </Header>
      <SubHeader>
        <OptionContainer onClick={() => history.push('/checkout')}>
          <OptionTitle>Informações</OptionTitle>
          <OptionNumber active>1</OptionNumber>
        </OptionContainer>
        <OptionContainer
          disabled={!userData?.phone}
          onClick={() => history.push('/delivery')}
        >
          <OptionTitle>Entrega</OptionTitle>
          <OptionNumber
            disabled={!userData?.phone}
            active={active === 2 || active === 3}
          >
            2
          </OptionNumber>
        </OptionContainer>
        <OptionContainer
          disabled={!userData?.postCode}
          onClick={() => history.push('/payment')}
        >
          <OptionTitle>Pagamento</OptionTitle>
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
